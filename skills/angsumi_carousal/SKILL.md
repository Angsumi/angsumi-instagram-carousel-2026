---
name: angsumi_carousal
description: Create ANGSUMI bioinformatics Instagram carousels with creative editorial visuals, source-checked teaching content, captions, hashtags, search phrases, and card alt text. Use for a new carousel, the next numbered carousel, or a requested batch.
---

# ANGSUMI carousel

## Context and sequence

Read the current project `AGENTS.md`. Resolve “next” from the content plan and existing `outputs/` folders; distinguish planned, created, and published posts. Continue requested numbering and preserve earlier carousels unless the user asks to edit them.

ANGSUMI teaches Indian life-science students and early-career researchers through “The Researcher Who Builds.” Use clear, practical English, with light natural Hinglish when useful. The persona is fictional: never imply verified credentials, original experiments, or demonstrated social performance.

## Content and science

Follow the plan's topic and card count when supplied. Otherwise use enough cards for one focused lesson, usually 5–7: a recognizable research problem, explanations that build on each other, and a saveable takeaway with one CTA. Draft exact headline, supporting copy, and visual direction for each card before rendering. Aim for curiosity and usefulness; do not promise virality.

Check niche and changing claims against primary sources such as official Bioconductor, QIIME 2, Galaxy Training Network documentation, or original papers. Explain what the method establishes and its limits. Label invented examples as illustrative. Concept sketches must not pretend to be computed from one dataset. Keep sample labels and colors consistent across cards.

## Design and generation

Default palette: ivory `#F7F2E8`, maroon `#6F2437`, forest `#304939`, sage `#94A58B`, charcoal. Use expressive serif headlines, selective italics, readable sans-serif copy, generous spacing, and restrained tactile paper or botanical details. Choose a distinct visual metaphor for each topic. Prioritize phone readability over decoration.

Generate one finished portrait card per image with the available image-generation tool. Request 1080×1350, full bleed, safe margins, ANGSUMI header, `@angsumi.online` footer, and card numbering. Include only approved copy and necessary labels. Explicitly forbid extra equations, p-values, accession IDs, plotted results, and decorative numerical claims. For a batch, use manageable concurrency and track saved paths by carousel and card. Retry only failed or concretely defective cards.

## Review and delivery

Inspect every card using contact sheets for batch review and full-size views where needed. Check spelling, clipping, contrast, order, sample counts, axis direction, arithmetic, matrix symmetry, plotted geometry, and whether edits cross out correct wording. Repair defects with the image-editing tool after inspecting the target. Preserve generated originals.

Read actual dimensions; requested size is not verified size. For publishing, make destination-appropriate derivatives and verify uniform framing without clipped text. When delivering native images, disclose dimension variation and crop limitations.

Save ordered `card-01.png`, `card-02.png`, etc. in `outputs/carousel-NN-topic/`. Put only publishable caption and hashtags in `captions.txt`: hook, concise explanation, one CTA, and about five relevant hashtags. Store suggested search phrases, per-card alt text, scientific sources, prompts, and dimensions separately. Include a manifest, ZIP, and preview gallery when useful for the requested batch.

Report completed numbers and artifact links. Creation does not mean publication. Schedule only when requested, using a connected provider, resolved destination accounts, confirmed cadence and timezone. Check remote status before retrying and retain returned post IDs to prevent duplicates.
