# ANGSUMI Instagram Carousel Queue

Prepared JPEG carousel cards and a publishing manifest for the Instagram account @angsumi.online. Images are public so Instagram can fetch them during publishing.

- 30 carousels, 181 cards
- Planned: one carousel daily, 7:00 pm Asia/Kolkata, 9 October–7 November 2026
- `queue.json` contains captions, card order, alt text, and direct raw image URLs
- Card images are 1080 × 1350 JPEGs; original source images are not included

## Independent publisher

The workflow in `.github/workflows/publish-instagram.yml` runs on GitHub Actions at 19:00 IST and retries during the following hour. It checks the date, creates the due carousel through Composio, and writes a `published/YYYY-MM-DD.json` marker after Instagram confirms publication. It also checks recent Instagram captions before retrying, to avoid duplicate posts if a marker write fails. GitHub Actions scheduling can be delayed, so 19:00 is the target rather than a guaranteed exact second.

To activate it, add a repository Actions secret named `COMPOSIO_API_KEY` containing a project API key **from the same Composio project that owns the connected `@angsumi.online` account** (`instagram_feeder-marvel`). If the connection in your own Composio project has a different ID, also add a secret named `COMPOSIO_INSTAGRAM_ACCOUNT_ID` with that ID. Do not put either secret in this public repository or in an issue. Then run the workflow manually with `mode: preflight` to check that the key can reach the account and the image URLs. The scheduled job needs no ChatGPT subscription or open computer.

The queue only publishes between 9 October and 7 November 2026. Outside that range, scheduled runs exit without posting. To stop earlier, disable the workflow in the Actions tab.

## 7:10 pm test post

`test/test-post.json` defines a separate one-image brand post for 8 October 2026 at 19:10 IST. The `Publish 7:10 PM Instagram test post` workflow first runs at 13:40 UTC, with later retry slots. It checks for an existing post and uses `published/2026-10-08.json` to avoid publishing twice. The test image is a JPEG derivative of an existing ANGSUMI brand card and is separate from the 30-carousels queue. The Composio secret above must be set for this test to publish.
