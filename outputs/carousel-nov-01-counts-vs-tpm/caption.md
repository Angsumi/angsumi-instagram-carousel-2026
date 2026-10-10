# Carousel Nov 01: Stop Feeding TPM into DESeq2

Upload `card-01.png` through `card-07.png` in order.

---

## Instagram / LinkedIn Caption

Ek common mistake jo har computational biology beginner karta hai:
Kallisto ya Salmon run kiya, TPM table generate hui, aur seedha `DESeq2` mein import kar diya. 🚫

Par kya aapko pata hai DESeq2 normalized TPM tables reject kyu karta hai (aur error kyu fekta hai)?

Yahan aati hai statistical sampling theory:
1. **TPM (Transcripts Per Million)** within-sample gene length aur sequencing depth ko normalize karta hai. Yeh Gene A vs Gene B ki relative abundance dekhne ke liye best hai.
2. Lekin differential expression across conditions ko chahiye **Statistical Confidence**. 1,000 raw counts give vastly higher statistical certainty than 10 counts. TPM dono ko flat fraction bana deta hai, completely wiping out sampling depth!
3. **FPKM is officially deprecated**: Cross-sample comparison mein total-transcripts-per-cell comparability maintain nahi rehti. The genomics community transitioned to TPM and raw count modeling years ago.

### The Golden Rule to Remember:
- **Between-condition Differential Expression?** → Raw Integer Counts (`DESeq2`, `edgeR`)
- **Within-sample Visualization, Heatmaps, Barplots?** → TPM (`tximport`, Salmon)
- **Aligner Pipeline?** STAR → `featureCounts`. Pseudoaligner? Salmon → `tximport`.

Save this map before your next RNA-seq run. 🧬

#Bioinformatics #RNAseq #DESeq2 #Genomics #ComputationalBiology #Biostatistics #ResearchData #DataScience #PhDLife #ANGSUMI

---

## Alt Text per Card

1. **Card 1 (Cover)**: Ivory and maroon editorial card reading "Stop feeding TPM into DESeq2. Why raw counts are irreplaceable for differential expression." Shows an integer read count matrix feeding into a statistical variance model with a caution tag on normalized TPM.
2. **Card 2**: Editorial bar chart card explaining "The Illusion of TPM." Compares Gene A vs Gene B within Sample 1, showing within-sample relative expression.
3. **Card 3**: Mathematical curve plot titled "Why DESeq2 Needs Counts." Contrasts a wide uncertainty curve (low counts: 10 reads) with a sharp, high-confidence peak (high counts: 1,000 reads) to illustrate sampling variance.
4. **Card 4**: Caution card declaring "FPKM is Outdated." Points with a directional arrow to TPM for visualization and Raw Counts for differential expression.
5. **Card 5**: A clean 2x2 decision table establishing the core rule: Raw Counts for between-condition differential expression with DESeq2/edgeR; TPM for within-sample visual plots.
6. **Card 6**: Scientific workflow diagram "Where to Get Counts." Shows Salmon/Kallisto feeding into tximport, and STAR alignment feeding into featureCounts, both converging into DESeq2 raw integer matrices.
7. **Card 7 (Saveable Recap)**: Open research notebook summary recapping the three golden takeaways with an elegant bookmark ribbon: 1. DE Analysis → Raw Counts; 2. Visualization → TPM; 3. FPKM → Outdated.

---

## Production Details

- **Aspect Ratio**: Portrait 3:4 / 4:5 optimized (1080 × 1350 / 1122 × 1402 px)
- **Palette**: Warm ivory (`#F7F2E8`), deep maroon (`#6F2437`), charcoal (`#282828`), and muted sage green (`#728674`).
- **Typography**: Editorial serif headlines with clean geometric sans-serif body text and monospace computational highlights.
- **Scientific References**:
  - Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. *Genome Biology*, 15(12), 550.
  - Soneson, C., Love, M. I., & Robinson, M. D. (2015). Differential analyses for RNA-seq: transcript-level estimates improve gene-level inferences. *F1000Research*, 4, 1521.
  - Zhao, S., Ye, Z., & Stanton, R. (2020). Misuse of RPKM or TPM normalization when comparing across conditions and its solution. *RNA*, 26(8), 903-909.
