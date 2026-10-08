"""Publish the ANGSUMI queue directly through Meta's Instagram Graph API.

Requires INSTAGRAM_ACCESS_TOKEN, obtained for @angsumi.online with Instagram Login
and instagram_business_basic + instagram_business_content_publish permissions.
"""

import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from publish_due import (
    FIRST_DAY, IG_USER, LAST_DAY, ZONE, check_images, get_marker, media_items,
    write_marker,
)

BASE = "https://graph.instagram.com/" + os.environ.get("GRAPH_API_VERSION", "v26.0")
TOKEN = os.environ.get("INSTAGRAM_ACCESS_TOKEN")
USERNAME = "angsumi.online"


def graph(path, fields=None, method="GET"):
    if not TOKEN:
        raise RuntimeError("Set INSTAGRAM_ACCESS_TOKEN as a GitHub Actions repository secret.")
    data = urllib.parse.urlencode(fields or {}).encode() if method == "POST" else None
    query = "?" + urllib.parse.urlencode(fields) if method == "GET" and fields else ""
    url = f"{BASE}/{path.lstrip('/')}{query}"
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={"Authorization": f"Bearer {TOKEN}",
                 "Content-Type": "application/x-www-form-urlencoded"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        detail = exc.read(1200).decode("utf-8", "replace")
        raise RuntimeError(f"Instagram Graph API HTTP {exc.code} on {path}: {detail}") from exc


def verify_identity():
    profile = graph("me", {"fields": "id,username,account_type"})
    if str(profile.get("id")) != IG_USER or profile.get("username") != USERNAME:
        raise RuntimeError("Instagram access token does not belong to @angsumi.online.")
    if profile.get("account_type") not in ("BUSINESS", "MEDIA_CREATOR", "CREATOR"):
        raise RuntimeError("Instagram account is not a professional account.")
    return profile


def recent_match(caption):
    page = graph(f"{IG_USER}/media", {"fields": "id,caption,timestamp", "limit": 100})
    items = media_items(page)
    if items is None:
        raise RuntimeError("Could not list Instagram media for duplicate check.")
    return next((str(item["id"]) for item in items
                 if (item.get("caption") or "").strip() == caption.strip()), None)


def wait_finished(container_id):
    for attempt in range(30):
        result = graph(str(container_id), {"fields": "status_code"})
        status = result.get("status_code")
        if status == "FINISHED":
            return
        if status in ("ERROR", "EXPIRED"):
            raise RuntimeError(f"Instagram container {container_id} status: {status}")
        time.sleep(min(3 + attempt // 6, 6))
    raise RuntimeError(f"Instagram container {container_id} did not finish processing")


def create(fields):
    result = graph(f"{IG_USER}/media", fields, method="POST")
    container_id = str(result.get("id") or "")
    if not container_id.isdigit():
        raise RuntimeError("Instagram did not return a numeric container ID")
    wait_finished(container_id)
    return container_id


def publish(container_id):
    result = graph(f"{IG_USER}/media_publish", {"creation_id": container_id}, method="POST")
    media_id = str(result.get("id") or "")
    if not media_id.isdigit():
        raise RuntimeError("Instagram did not return a numeric published media ID")
    return media_id


def preflight():
    profile = verify_identity()
    graph(f"{IG_USER}/media", {"fields": "id,caption", "limit": 1})
    queue = json.loads(Path("queue.json").read_text())
    if len(queue.get("posts", [])) != 30:
        raise RuntimeError("Expected 30 queued posts")
    check_images(queue["posts"][0])
    print(f"Direct Graph API preflight passed for @{profile['username']}.")


def test_post():
    now = dt.datetime.now(ZONE)
    test = json.loads(Path("test/test-post.json").read_text())
    due_at = dt.datetime.fromisoformat(test["scheduled_at_local"])
    if now < due_at or now.date() != due_at.date():
        print("Test post is not due; exiting without publishing.")
        return
    verify_identity()
    if get_marker(now.date()):
        print("Test post already recorded as published.")
        return
    existing = recent_match(test["caption"])
    marker = {"carousel": "test"}
    if existing:
        write_marker(now.date(), marker, existing, "Instagram duplicate check")
        print("Test post already exists on Instagram; recorded its ID.")
        return
    check_images({"cards": [{"order": 1, "hosted_media_url": test["image_url"]}]})
    container = create({"image_url": test["image_url"], "caption": test["caption"],
                        "alt_text": test["alt_text"]})
    media_id = publish(container)
    write_marker(now.date(), marker, media_id, "direct Graph API test")
    print(f"Published test post as Instagram media {media_id}.")


def due_carousel():
    now = dt.datetime.now(ZONE)
    day = now.date()
    if not FIRST_DAY <= day <= LAST_DAY or now.hour < 19:
        print("No carousel due yet.")
        return
    queue = json.loads(Path("queue.json").read_text())
    due = [post for post in queue["posts"] if post["planned_for_local"][:10] == day.isoformat()]
    if len(due) != 1:
        raise RuntimeError(f"Expected one due carousel on {day}; found {len(due)}")
    post = due[0]
    verify_identity()
    if get_marker(day):
        print(f"Carousel {post['carousel']} already recorded as published.")
        return
    existing = recent_match(post["instagram_caption"])
    if existing:
        write_marker(day, post, existing, "Instagram duplicate check")
        print("Carousel already exists on Instagram; recorded its ID.")
        return
    check_images(post)
    children = [create({"image_url": card["hosted_media_url"],
                        "is_carousel_item": "true", "alt_text": card["alt_text"]})
                for card in sorted(post["cards"], key=lambda card: card["order"])]
    parent = create({"media_type": "CAROUSEL", "children": ",".join(children),
                     "caption": post["instagram_caption"]})
    media_id = publish(parent)
    write_marker(day, post, media_id, "direct Graph API scheduled run")
    print(f"Published carousel {post['carousel']} as Instagram media {media_id}.")


if __name__ == "__main__":
    try:
        mode = os.environ.get("RUN_MODE", "publish_due")
        if mode == "preflight":
            preflight()
        elif mode == "test":
            test_post()
        elif mode == "publish_due":
            due_carousel()
        else:
            raise RuntimeError(f"Unknown RUN_MODE: {mode}")
    except Exception as exc:
        print(f"Direct Instagram publishing failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
