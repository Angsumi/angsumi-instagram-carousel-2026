# Carousel Nov 01 Generation Prompts

Mode: Built-in image generation tool (`generate_image`).
Style reference: `outputs/carousel-01-question-before-code/card-01.png` and `outputs/carousel-nov-01-counts-vs-tpm/card-01.png`.

---

## Card 1 (Cover)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 1 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork, not a mockup or contact sheet. Match the exact visual style of input image: warm ivory #F7F2E8 paper texture, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant high-contrast serif headline, clean sans-serif body, generous 90px safe margins, thin rules. Small running header at top 'ANGSUMI' with 'BIOINFORMATICS, SIMPLIFIED' beneath. Large headline in upper half: 'Stop feeding TPM into DESeq2.' in maroon and charcoal. Subline: 'Why raw counts are irreplaceable for differential expression.' Lower half: tasteful editorial scientific illustration of an integer read count matrix feeding cleanly into a variance model, with a subtle maroon caution tag on normalized TPM. Clean minimal line art, vintage botanical/laboratory paper texture. Bottom footer: 'Swipe for the explanation →' at left, '01 / 07' at right. Render text clearly and legibly.
```

## Card 2 (Context)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 2 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 2 of 7. Headline: 'The Illusion of TPM.' in maroon and charcoal. Body text: 'TPM and FPKM normalize for gene length and sequencing depth within one sample. They are built for comparing Gene A vs Gene B.' Visual: an elegant editorial scientific bar chart card showing expression of Gene A vs Gene B within 'Sample 1', with clean labels and subtle botanical pencil line art. No people, no cartoon elements. Bottom footer: 'COUNTS VS TPM' at left, '02 / 07' at right. Render text clearly and legibly.
```

## Card 3 (Core Mechanism)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 3 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 3 of 7. Headline: 'Why DESeq2 Needs Counts.' in maroon and charcoal. Body text: 'Differential expression models statistical uncertainty. 1,000 reads gives vastly higher confidence than 10 reads. TPM erases this sampling depth!' Visual: an elegant editorial scientific curve plot comparing a wide uncertainty curve (low counts: 10 reads) vs a sharp, precise confidence peak (high counts: 1,000 reads) on a grid. Minimalist line art, subtle paper grain. Bottom footer: 'COUNTS VS TPM' at left, '03 / 07' at right. Render text clearly and legibly.
```

## Card 4 (Distinction)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 4 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 4 of 7. Headline: 'FPKM is Outdated.' in maroon and charcoal. Body text: 'FPKM lacks total-transcript comparability between samples. The genomics field transitioned to TPM and raw count modeling years ago.' Visual: an editorial card with FPKM marked with a neat maroon caution tag, pointing with a clean directional arrow towards two green validated cards labeled 'TPM (Visualization)' and 'Counts (Differential Expression)'. Clean minimal line art, paper texture. Bottom footer: 'COUNTS VS TPM' at left, '04 / 07' at right. Render text clearly and legibly.
```

## Card 5 (Rule of Thumb)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 5 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 5 of 7. Headline: 'The Decision Rule.' in maroon and charcoal. Body text: 'Differential expression across conditions? Use Raw Counts. Within-sample relative abundance or heatmaps? Use TPM.' Visual: an elegant editorial scientific 2x2 comparison table card with clean ruled lines, maroon header bar, and green checkmark badges highlighting 'Raw Counts -> DESeq2 / edgeR' and 'TPM -> Visual Plots'. Minimalist line art, paper texture. Bottom footer: 'COUNTS VS TPM' at left, '05 / 07' at right. Render text clearly and legibly.
```

## Card 6 (Workflow)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 6 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 6 of 7. Headline: 'Where to Get Counts.' in maroon and charcoal. Body text: 'Salmon or Kallisto? Use tximport in R. STAR alignment? Use featureCounts or HTSeq. Keep gene-level integer tables intact.' Visual: an elegant editorial scientific workflow diagram showing two pathways: Top: 'Salmon / Kallisto' -> arrow -> 'tximport'. Bottom: 'STAR alignment' -> arrow -> 'featureCounts'. Both converging with neat arrows into a central green card labeled 'DESeq2 (Raw Integer Counts)'. Clean minimal line art, paper texture. Bottom footer: 'COUNTS VS TPM' at left, '06 / 07' at right. Render text clearly and legibly.
```

## Card 7 (Saveable Recap)
```text
Use case: scientific-educational. Create exactly ONE finished Instagram carousel card, card 7 of 7, portrait 3:4 aspect ratio. Full-bleed card artwork. Input image 1 is a STYLE REFERENCE only. Match its warm ivory #F7F2E8 textured paper background, deep maroon #6F2437, charcoal #282828, muted green #728674, large elegant serif headlines, clean sans-serif body, generous 90px safe margins, thin rules. Small running header 'ANGSUMI' and 'BIOINFORMATICS, SIMPLIFIED'. Card 7 of 7. Headline: 'Save this RNA-seq rule.' in maroon and charcoal. Body text: 'Never normalize before DESeq2. Let the model handle dispersion and library depth from raw integers.' Subline below: 'Save this guide for your next analysis.' Visual: an open research notebook card with a clean 3-bullet recap: '1. DE Analysis → Raw Counts', '2. Visualization → TPM', '3. FPKM → Outdated'. Small elegant bookmark ribbon, delicate botanical pencil drawing at corner, lots of breathing room. Bottom footer: 'BIOINFORMATICS, SIMPLIFIED' at left, '07 / 07' at right. Render text clearly and legibly.
```
