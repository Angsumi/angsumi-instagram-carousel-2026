# ANGSUMI Instagram Carousel Queue

Prepared JPEG carousel cards and a publishing manifest for the Instagram account @angsumi.online. Images are public so Instagram can fetch them during publishing.

- 30 carousels, 181 cards
- Planned: one carousel daily, 7:00 pm Asia/Kolkata, 9 October–7 November 2026
- `queue.json` contains captions, card order, alt text, and direct raw image URLs
- Card images are 1080 × 1350 JPEGs; original source images are not included

## Independent publisher

The workflow in `.github/workflows/publish-instagram.yml` runs on GitHub Actions at 19:00 IST and retries during the following hour. It checks the date, publishes the due carousel, and writes a `published/YYYY-MM-DD.json` marker after Instagram confirms publication. It also checks recent Instagram captions before retrying, to avoid duplicate posts if a marker write fails. GitHub Actions scheduling can be delayed, so 19:00 is the target rather than a guaranteed exact second.

### Direct Instagram Graph API

For direct publishing, create a Meta app with **Instagram API with Instagram Login**, authorize the professional account `@angsumi.online` with `instagram_business_basic` and `instagram_business_content_publish`, and generate a long-lived Instagram User access token. See [Meta's Instagram API guide](https://www.postman.com/meta/instagram/folder/1z5vxzu/instagram-api-with-instagram-login). Store the token as the repository Actions secret `INSTAGRAM_ACCESS_TOKEN` (never commit it). The workflow automatically uses `scripts/publish_graph.py` when this secret exists. Run `Publish ANGSUMI Instagram carousel` manually with `mode: preflight` before the first scheduled post. The preflight must confirm the token belongs to `@angsumi.online`.

The direct publisher uses `graph.instagram.com`, checks each container's processing status, and records the published media ID. Keep the token valid through 7 November 2026; if it expires, update the secret with a refreshed token.

### Composio fallback

Until `INSTAGRAM_ACCESS_TOKEN` is set, the workflow uses the existing Composio API key. Its preflight passed on 8 October 2026 for `@angsumi.online`. Do not put either secret in this public repository or in an issue. The scheduled job needs no ChatGPT subscription or open computer.

The queue only publishes between 9 October and 7 November 2026. Outside that range, scheduled runs exit without posting. To stop earlier, disable the workflow in the Actions tab.

## 7:15 pm test post

`test/test-post.json` defines a separate one-image brand post for 8 October 2026 at 19:15 IST. The `Publish 7:15 PM Instagram test post` workflow first runs at 13:45 UTC, with later retry slots. It checks for an existing post and uses `published/2026-10-08.json` to avoid publishing twice. The test image is a JPEG derivative of an existing ANGSUMI brand card and is separate from the 30-carousel queue. It uses the direct Graph API when `INSTAGRAM_ACCESS_TOKEN` is set, otherwise the Composio fallback.
