"""One-time public brand post to check the independent publishing route."""

import datetime as dt
import json
import sys
from pathlib import Path

from publish_due import (
    IG_USER, ZONE, check_images, composio, find_id, get_marker,
    published_media_for_caption, write_marker,
)

TEST_DAY = dt.date(2026, 10, 8)
TEST_TIME = dt.time(19, 15)


def main():
    now = dt.datetime.now(ZONE)
    if now.date() != TEST_DAY or now.time() < TEST_TIME:
        print("Test post is not due; exiting without publishing.")
        return
    if get_marker(TEST_DAY):
        print("Test post already recorded as published.")
        return
    test = json.loads(Path("test/test-post.json").read_text())
    existing = published_media_for_caption(TEST_DAY, test["caption"])
    marker = {"carousel": "test"}
    if existing:
        write_marker(TEST_DAY, marker, existing, "Instagram duplicate check")
        print("Test post already exists on Instagram; recorded its ID.")
        return
    card = {"order": 1, "hosted_media_url": test["image_url"]}
    check_images({"cards": [card]})
    created = composio("INSTAGRAM_POST_IG_USER_MEDIA", {
        "ig_user_id": IG_USER, "image_url": test["image_url"],
        "alt_text": test["alt_text"], "caption": test["caption"],
    })
    published = composio("INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH", {
        "ig_user_id": IG_USER, "creation_id": find_id(created),
        "max_wait_seconds": 120,
    })
    media_id = find_id(published)
    write_marker(TEST_DAY, marker, media_id, "7:15 PM test run")
    print(f"Published test post as Instagram media {media_id}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Test publication failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
