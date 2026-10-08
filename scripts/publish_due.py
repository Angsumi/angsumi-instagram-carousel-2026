"""Publish one due ANGSUMI carousel using a connected Composio account."""

import base64
import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from zoneinfo import ZoneInfo

OWNER = "Angsumi"
REPO = "angsumi-instagram-carousel-2026"
ACCOUNT = os.environ.get("COMPOSIO_INSTAGRAM_ACCOUNT_ID") or "instagram_feeder-marvel"
IG_USER = "29453876600881732"
COMPOSIO_VERSION = "20261006_00"
COMPOSIO_USER_ID = None
ZONE = ZoneInfo("Asia/Kolkata")
FIRST_DAY = dt.date(2026, 10, 9)
LAST_DAY = dt.date(2026, 11, 7)


def request_json(url, *, method="GET", headers=None, payload=None, allow_404=False):
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            if method == "HEAD":
                return {"status": response.status, "type": response.headers.get("Content-Type"),
                        "length": int(response.headers.get("Content-Length") or 0)}
            return json.load(response)
    except urllib.error.HTTPError as exc:
        if allow_404 and exc.code == 404:
            return None
        detail = exc.read(1000).decode("utf-8", "replace")
        raise RuntimeError(f"HTTP {exc.code} from {url.split('?')[0]}: {detail}") from exc


def composio(slug, arguments):
    global ACCOUNT, COMPOSIO_USER_ID
    key = os.environ.get("COMPOSIO_API_KEY")
    if not key:
        raise RuntimeError("Set COMPOSIO_API_KEY as a GitHub Actions repository secret.")
    if COMPOSIO_USER_ID is None:
        account = request_json(
            f"https://backend.composio.dev/api/v3.1/connected_accounts/{ACCOUNT}",
            headers={"x-api-key": key},
            allow_404=True,
        )
        if account is None:
            connections = request_json(
                "https://backend.composio.dev/api/v3.1/connected_accounts?limit=100",
                headers={"x-api-key": key},
            )
            candidates = [item for item in connections.get("items", [])
                          if item.get("toolkit", {}).get("slug") == "instagram"
                          and item.get("status") == "ACTIVE"]
            if len(candidates) != 1:
                raise RuntimeError(
                    f"Composio API key cannot access {ACCOUNT}; found "
                    f"{len(candidates)} active Instagram accounts in its project."
                )
            account = candidates[0]
            print(f"Using Instagram connection {account['id']} from API key project.")
            ACCOUNT = account["id"]
        if account.get("id") != ACCOUNT or account.get("status") != "ACTIVE":
            raise RuntimeError("The selected Composio Instagram connection is not active.")
        COMPOSIO_USER_ID = account.get("user_id")
        if not COMPOSIO_USER_ID:
            raise RuntimeError("Composio did not return a user ID for the Instagram connection.")
    result = request_json(
        f"https://backend.composio.dev/api/v3.1/tools/execute/{slug}",
        method="POST",
        headers={"Content-Type": "application/json", "x-api-key": key},
        payload={"connected_account_id": ACCOUNT, "user_id": COMPOSIO_USER_ID,
                 "version": COMPOSIO_VERSION,
                 "arguments": arguments},
    )
    if not result.get("successful"):
        raise RuntimeError(f"Composio {slug} failed: {result.get('error') or result.get('data')}")
    return result.get("data") or {}


def find_id(data):
    if isinstance(data, dict):
        for key in ("id", "creation_id"):
            if isinstance(data.get(key), str) and data[key].isdigit():
                return data[key]
        for key in ("data", "response", "result"):
            if key in data:
                found = find_id(data[key])
                if found:
                    return found
    raise RuntimeError(f"Composio returned no media ID: {str(data)[:500]}")


def marker_path(day):
    return f"published/{day.isoformat()}.json"


def github_headers():
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GitHub Actions did not provide GITHUB_TOKEN.")
    return {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
            "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28"}


def get_marker(day):
    result = request_json(
        f"https://api.github.com/repos/{OWNER}/{REPO}/contents/{marker_path(day)}",
        headers=github_headers(), allow_404=True,
    )
    if result is None:
        return None
    return json.loads(base64.b64decode(result["content"]).decode("utf-8"))


def write_marker(day, post, media_id, source):
    marker = {"date": day.isoformat(), "carousel": post["carousel"],
              "instagram_media_id": media_id, "source": source,
              "recorded_at": dt.datetime.now(dt.timezone.utc).isoformat()}
    content = base64.b64encode((json.dumps(marker, indent=2) + "\n").encode()).decode()
    request_json(
        f"https://api.github.com/repos/{OWNER}/{REPO}/contents/{marker_path(day)}",
        method="PUT", headers=github_headers(),
        payload={"message": f"Record Instagram carousel {post['carousel']} publication",
                 "content": content, "branch": "main"},
    )


def media_items(data):
    if isinstance(data, dict):
        if isinstance(data.get("data"), list):
            return data["data"]
        for key in ("data", "response", "result"):
            if key in data:
                found = media_items(data[key])
                if found is not None:
                    return found
    return None


def published_media_for_caption(day, caption):
    since = int(dt.datetime.combine(day, dt.time.min, ZONE).timestamp())
    result = composio("INSTAGRAM_GET_IG_USER_MEDIA", {
        "ig_user_id": IG_USER, "fields": "id,caption,permalink,timestamp,media_type",
        "limit": 100, "since": since,
    })
    items = media_items(result)
    if items is None:
        raise RuntimeError("Could not read recent Instagram media for duplicate check.")
    for item in items:
        if isinstance(item, dict) and (item.get("caption") or "").strip() == caption.strip():
            return str(item["id"])
    return None


def wait_for_container(container_id):
    for attempt in range(24):
        result = composio("INSTAGRAM_GET_POST_STATUS", {"creation_id": container_id})
        data = result.get("data", result) if isinstance(result, dict) else result
        status = data.get("status_code") if isinstance(data, dict) else None
        if status == "FINISHED":
            return
        if status in ("ERROR", "EXPIRED"):
            raise RuntimeError(f"Instagram container {container_id} status: {status}")
        time.sleep(min(3 + attempt // 6, 6))
    raise RuntimeError(f"Instagram container {container_id} did not finish processing.")


def check_images(post):
    for card in sorted(post["cards"], key=lambda c: c["order"]):
        url = card["hosted_media_url"]
        if not url.startswith("https://raw.githubusercontent.com/"):
            raise RuntimeError(f"Unexpected image host for card {card['order']}")
        info = request_json(url, method="HEAD")
        if info["status"] != 200 or not (info["type"] or "").startswith("image/jpeg"):
            raise RuntimeError(f"Card {card['order']} is not a public JPEG")
        if info["length"] > 8_000_000:
            raise RuntimeError(f"Card {card['order']} exceeds 8 MB")


def main():
    now = dt.datetime.now(ZONE)
    day = now.date()
    queue = json.loads(Path("queue.json").read_text())
    mode = os.environ.get("RUN_MODE", "publish_due")
    if mode == "preflight":
        info = composio("INSTAGRAM_GET_USER_INFO", {"ig_user_id": "me",
                           "fields": "id,username,account_type"})
        if info.get("id") != IG_USER or info.get("username") != "angsumi.online":
            raise RuntimeError(f"Connected Instagram identity mismatch: {info}")
        recent = composio("INSTAGRAM_GET_IG_USER_MEDIA", {
            "ig_user_id": IG_USER, "fields": "id,caption,timestamp", "limit": 1,
        })
        if media_items(recent) is None:
            raise RuntimeError("Cannot list recent Instagram media for duplicate protection.")
        for post in queue["posts"]:
            if len(post["cards"]) < 2 or len(post["cards"]) > 10:
                raise RuntimeError(f"Invalid carousel length: {post['carousel']}")
        check_images(queue["posts"][0])
        print(f"Preflight passed for @{info['username']}; 30 queue entries are present.")
        return
    if mode != "publish_due":
        raise RuntimeError(f"Unknown RUN_MODE: {mode}")
    if not FIRST_DAY <= day <= LAST_DAY:
        print(f"No queue item due on {day}.")
        return
    if now.hour < 19:
        print("Waiting until 19:00 IST.")
        return
    due = [p for p in queue["posts"] if p["planned_for_local"][:10] == day.isoformat()]
    if len(due) != 1:
        raise RuntimeError(f"Expected one due carousel on {day}; found {len(due)}")
    post = due[0]
    if get_marker(day):
        print(f"Carousel {post['carousel']} already recorded as published.")
        return
    existing = published_media_for_caption(day, post["instagram_caption"])
    if existing:
        write_marker(day, post, existing, "Instagram duplicate check")
        print(f"Carousel {post['carousel']} was already on Instagram; recorded its ID.")
        return
    check_images(post)
    children = []
    for card in sorted(post["cards"], key=lambda c: c["order"]):
        result = composio("INSTAGRAM_POST_IG_USER_MEDIA", {
            "ig_user_id": IG_USER, "image_url": card["hosted_media_url"],
            "is_carousel_item": True, "alt_text": card["alt_text"],
        })
        child_id = find_id(result)
        wait_for_container(child_id)
        children.append(child_id)
    parent = composio("INSTAGRAM_CREATE_CAROUSEL_CONTAINER", {
        "ig_user_id": IG_USER, "children": children,
        "caption": post["instagram_caption"], "share_to_feed": True,
    })
    parent_id = find_id(parent)
    published = composio("INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH", {
        "ig_user_id": IG_USER, "creation_id": parent_id, "max_wait_seconds": 120,
    })
    media_id = find_id(published)
    write_marker(day, post, media_id, "scheduled GitHub Actions run")
    print(f"Published carousel {post['carousel']} as Instagram media {media_id}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Publishing failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
