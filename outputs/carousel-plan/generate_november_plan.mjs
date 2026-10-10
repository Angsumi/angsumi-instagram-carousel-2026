import ExcelJS from '../../motion-engine/node_modules/exceljs/excel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateNovemberPlan() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ANGSUMI Content Studio';
  workbook.lastModifiedBy = 'ANGSUMI Content Studio';
  workbook.created = new Date('2026-10-08');
  workbook.modified = new Date('2026-10-08');

  // ==========================================
  // SHEET 1: OVERVIEW & BRAND GUIDELINES
  // ==========================================
  const overviewSheet = workbook.addWorksheet('Overview & Strategy', {
    views: [{ showGridLines: true }]
  });

  overviewSheet.columns = [
    { header: 'Section', key: 'section', width: 25 },
    { header: 'Detail', key: 'detail', width: 85 }
  ];

  overviewSheet.addRows([
    ['Project', 'ANGSUMI Content Ecosystem — November 2026 Daily Carousel Curriculum'],
    ['Target Audience', 'Indian MSc/MTech biotechnology students, PhD scholars, research assistants, and early-career computational biologists'],
    ['Creator Persona', 'ANGSUMI — Fictional Northeast Indian PhD scholar in life sciences at Mizoram University (Assamese roots). "The Researcher Who Builds."'],
    ['Cadence', '30 Days in November (Nov 1 to Nov 30, 2026) — 1 Comprehensive Educational Carousel per Day'],
    ['Content Pillar Split', '50% Bioinformatics & Research Data (15 days) | 30% Coding for Researchers (9 days) | 20% Real PhD Life (6 days)'],
    ['Visual Aesthetic', 'Editorial scientific notebook, warm ivory (#F7F2E8), deep maroon (#6F2437), charcoal (#282828), muted green (#728674)'],
    ['Aspect Ratio & Safe Zones', 'Portrait 4:5 (1080 × 1350 px). Safe padding: 80–90 px margins. Clean left-aligned hierarchy, subtle running header/footer.'],
    ['Typography Guidance', 'Headlines: Elegant editorial serif (Playfair Display / Fraunces / Merriweather). Body/Code: Sans-serif (Inter / Plus Jakarta Sans) and monospace (Fira Code).'],
    ['Voice & Tone', 'Curious, grounded, clear, intellectually honest, supportive. Precise scientific terms with natural English-dominant Hinglish.'],
    ['Ethical Guardrails', 'Never invent fabricated experimental outcomes, fake p-values, or unverified claims. All plots and workflows are illustrative pedagogical frameworks.']
  ]);

  // Style overview sheet
  overviewSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
  overviewSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B1E31' } };
  overviewSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  for (let r = 2; r <= 12; r++) {
    const row = overviewSheet.getRow(r);
    row.getCell(1).font = { bold: true, color: { argb: 'FF5B1E31' } };
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF9F3' } };
    row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
    row.height = 28;
  }

  // ==========================================
  // SHEET 2: NOVEMBER 30-DAY CAROUSEL PLAN
  // ==========================================
  const planSheet = workbook.addWorksheet('November Carousel Plan', {
    views: [{ state: 'frozen', ySplit: 1, showGridLines: true }]
  });

  planSheet.columns = [
    { header: 'Day', key: 'day', width: 6 },
    { header: 'Date', key: 'date', width: 12 },
    { header: 'Weekday', key: 'weekday', width: 12 },
    { header: 'Pillar', key: 'pillar', width: 28 },
    { header: 'Carousel Title & Topic', key: 'title', width: 32 },
    { header: 'Core Hook', key: 'hook', width: 36 },
    { header: 'Content Angle', key: 'angle', width: 22 },
    { header: 'Cards', key: 'cards', width: 8 },
    { header: 'Card 1 (Hook Cover)', key: 'card1', width: 42 },
    { header: 'Card 2 (Context / Problem)', key: 'card2', width: 42 },
    { header: 'Card 3 (Core Mechanism)', key: 'card3', width: 42 },
    { header: 'Card 4 (Distinction / Rule)', key: 'card4', width: 42 },
    { header: 'Card 5 (Research Practice)', key: 'card5', width: 42 },
    { header: 'Card 6 (Framework / Synthesis)', key: 'card6', width: 42 },
    { header: 'Card 7 (Recap & CTA)', key: 'card7', width: 42 },
    { header: 'Design Direction', key: 'design', width: 34 },
    { header: 'Caption & Hook Copy', key: 'caption', width: 45 },
    { header: 'CTA', key: 'cta', width: 28 },
    { header: 'Hashtags', key: 'hashtags', width: 30 },
    { header: 'Scientific Reference', key: 'ref', width: 35 },
    { header: 'Accuracy Guardrail', key: 'guardrail', width: 35 }
  ];

  const planData = [
    {
      day: 1,
      date: '2026-11-01',
      weekday: 'Sunday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Counts vs TPM vs FPKM',
      hook: 'Why DESeq2 hates your TPM and FPKM tables',
      angle: 'Foundational Trap',
      cards: 7,
      card1: 'HEADING: Stop feeding TPM into DESeq2.\nCONTENT: Swipe to see why raw counts are irreplaceable for differential expression.\nVISUAL: Split card showing normalized TPM rejected by an analytical pipeline.',
      card2: 'HEADING: The Illusion of TPM\nCONTENT: TPM and FPKM normalize for gene length and library size within a sample. They are built for comparing Gene A vs Gene B.\nVISUAL: Two bar charts of expression within one sample.',
      card3: 'HEADING: Why DESeq2 Needs Raw Counts\nCONTENT: Differential expression models statistical uncertainty. 100 reads gives higher confidence than 10 reads. TPM erases this count depth!\nVISUAL: Statistical binomial confidence curve flattening as counts rise.',
      card4: 'HEADING: FPKM is Officially Outdated\nCONTENT: FPKM lacks total-transcripts-per-cell comparability between samples. Bioinformatics literature moved to TPM or raw count modeling a decade ago.\nVISUAL: Red caution tag on FPKM formula with arrow pointing to TPM.',
      card5: 'HEADING: The Rule to Remember\nCONTENT: Between-condition DE analysis? -> Use Raw Counts. Within-sample relative abundance or visualization? -> Use TPM.\nVISUAL: High-contrast 2x2 decision matrix card in maroon and muted green.',
      card6: 'HEADING: Where to Get Raw Counts\nCONTENT: Salmon / Kallisto -> tximport package. STAR -> featureCounts / HTSeq. Keep gene-level integer matrices intact.\nVISUAL: Workflow arrows feeding fast pseudo-aligners into tximport and DESeq2.',
      card7: 'HEADING: Save This Rule\nCONTENT: Never normalize before DESeq2. Let the algorithm model variance from raw integers.\nSave this before your next RNA-seq run.\nVISUAL: Ivory recap card summarizing Raw Counts vs TPM with bookmark icon.',
      design: 'Ivory background, deep maroon headers, clean mathematical formula cards, high-contrast decision table.',
      caption: 'Ek common mistake jo har beginner karta hai: Salmon ya Kallisto run karke seedha TPM table DESeq2 mein daal dena. Statistical modeling demands raw read counts because precision depends on sampling depth! Save this reference.',
      cta: 'Save this RNA-seq decision rule.',
      hashtags: '#Bioinformatics #RNAseq #DESeq2 #Genomics #ResearchData #ANGSUMI',
      ref: 'Love et al., Genome Biology (2014) DESeq2; Soneson et al., F1000Research (2015) tximport.',
      guardrail: 'Pedagogical comparison of normalization mathematics. No specific biological sample outcomes claimed.'
    },
    {
      day: 2,
      date: '2026-11-02',
      weekday: 'Monday',
      pillar: 'Coding for Researchers',
      title: 'Gene Name Excel Corruption',
      hook: 'Why Excel turned SEPT2 into 02-Sep (and how to fix it)',
      angle: 'Data Hygiene Teardown',
      cards: 6,
      card1: 'HEADING: Excel quietly changed your gene names.\nCONTENT: How auto-formatting corrupted 20% of published genetics papers.\nVISUAL: Excel cell converting "SEPT2" into date "02-Sep-2026" in glowing red alert.',
      card2: 'HEADING: The Gene Name Trap\nCONTENT: Open a TSV in Excel, and genes like SEPT4, MARCH1, and OCT4 become September 4, March 1, and October 4. Once saved, the original symbols are lost forever.\nVISUAL: Table comparing intended symbol vs Excel output.',
      card3: 'HEADING: The HUGO Nomenclature Fix\nCONTENT: In 2020, HGNC renamed dozens of human genes specifically to stop Excel errors (MARCH1 became MARCHF1, SEPT2 became SEPTIN2).\nVISUAL: HGNC guideline stamp with before/after symbol table.',
      card4: 'HEADING: The Python / R Solution\nCONTENT: Never open raw genomic tables directly in spreadsheet GUIs. In R: readr::read_tsv(col_types = cols(.default = "c")). In Python: pd.read_csv(dtype=str).\nVISUAL: Clean code snippet card with highlighted string casting.',
      card5: 'HEADING: Data Hygiene Checklist\nCONTENT: 1. Keep raw files read-only. 2. Use command-line inspections (head, cut, grep). 3. Always inspect character columns post-import.\nVISUAL: Three-point checklist on vintage notebook background.',
      card6: 'HEADING: Keep Your Genes Safe\nCONTENT: Code protects your data from spreadsheet auto-format disasters.\nShare this with a lab mate who still opens TSVs in Excel!\nVISUAL: Summary card with code syntax and share CTA.',
      card7: 'N/A (6-card carousel)',
      design: 'Spreadsheet cell aesthetics contrasting with clean terminal code blocks. Caution amber and maroon accents.',
      caption: 'Did you know over a fifth of published supplementary genomics files had date conversion errors? Excel thinks it is helping you by guessing data types. Here is how you protect your gene symbols forever.',
      cta: 'Send this to your wet-lab bench mate.',
      hashtags: '#DataHygiene #PythonBio #RStats #Genomics #PhDLife #ANGSUMI',
      ref: 'Ziemann et al., Genome Biology (2016); HGNC 2020 Guidelines on Gene Symbol Formatting.',
      guardrail: 'Historical factual context of scientific spreadsheet errors. Educational script examples.'
    },
    {
      day: 3,
      date: '2026-11-03',
      weekday: 'Tuesday',
      pillar: 'Real PhD Life',
      title: 'Deconstructing Reviewer 2',
      hook: 'How to respond to harsh reviewer comments without crying',
      angle: 'Scholar Resilience',
      cards: 6,
      card1: 'HEADING: "The analysis lacks novelty."\nCONTENT: How to decode brutal peer review feedback and write a calm, persuasive rebuttal.\nVISUAL: Typed manuscript proof page marked up with sharp editorial red pen.',
      card2: 'HEADING: The First Rule of Peer Review\nCONTENT: Step away for 48 hours. Your immediate emotional reaction is defense; your published paper needs objective clarity.\nVISUAL: 48-Hour cool-off clock graphic with scholar desk elements.',
      card3: 'HEADING: Separate Emotion from Substance\nCONTENT: Reviewers are tired volunteers who skimmed your paper in 30 minutes. If they misunderstood, you did not write clearly enough.\nVISUAL: Venn diagram of "What Reviewer Said" vs "What Needs Clarification".',
      card4: 'HEADING: The 3-Part Rebuttal Structure\nCONTENT: 1. Polite agreement/gratitude. 2. Direct explanation of revision with line numbers. 3. Quoted excerpt of new text or new validation plot.\nVISUAL: Three structured boxes showcasing model response phrasing.',
      card5: 'HEADING: Phrases That Never Fail\nCONTENT: Replace "The reviewer is wrong" with "We appreciate this insightful point and have added clarifying discussion on Page 8 (Lines 142-156)."\nVISUAL: Comparative table: Emotional Draft vs Diplomatic Final.',
      card6: 'HEADING: Save This Scholar Guide\nCONTENT: Peer review is a negotiation of clarity, not a personal trial.\nBookmark this for your next major revision round.\nVISUAL: Lived-in scholar notebook recap with warm bookmark ribbon.',
      card7: 'N/A (6-card carousel)',
      design: 'Academic manuscript paper aesthetic, typewriter serif font highlights, warm amber and maroon tones.',
      caption: 'Reviewer comments dekh ke heart rate 140 ho jata hai? It happens to every single scholar. The key to revision is emotional detachment and precise textual evidence. Bookmark this template for your next revision!',
      cta: 'Save this rebuttal framework.',
      hashtags: '#PhDLife #PeerReview #AcademicTwitter #ScholarMindset #AcademicWriting #ANGSUMI',
      ref: 'Noble, PLoS Computational Biology (2017) Ten simple rules for writing a response to reviewers.',
      guardrail: 'Educational advice on professional scientific communication. No actual review confidentiality breached.'
    },
    {
      day: 4,
      date: '2026-11-04',
      weekday: 'Wednesday',
      pillar: 'Bioinformatics & Research Data',
      title: 'De-mystifying the Volcano Plot',
      hook: 'Your Volcano Plot is lying to you: What log2FC and p-adj really mean',
      angle: 'Visual Diagnostics',
      cards: 7,
      card1: 'HEADING: Why your Volcano Plot is misleading you.\nCONTENT: A dot in the top-right corner is not automatically a biological discovery.\nVISUAL: Stylized volcano plot with glowing outliers in maroon and green.',
      card2: 'HEADING: The Two Axes of Evidence\nCONTENT: X-axis: Effect size (log2 Fold Change) — how much expression changed. Y-axis: Statistical significance (-log10 p-value) — how confident we are.\nVISUAL: Clean annotated plot with X and Y axes labeled in plain English.',
      card3: 'HEADING: The Trap of Tiny Variance\nCONTENT: A gene with 0.1% change can have p < 0.0001 if sample variance is near zero. High significance does not equal biological importance!\nVISUAL: Callout on top-center genes with huge -log10(p) but trivial fold change.',
      card4: 'HEADING: The Trap of Noisy Expression\nCONTENT: A gene with an 8-fold increase can have p = 0.40 if samples are erratic. High fold change without statistical power is just noise.\nVISUAL: Callout on bottom-right genes with huge fold-change but abysmal p-values.',
      card5: 'HEADING: Never Use Raw P-values\nCONTENT: Testing 20,000 genes at alpha = 0.05 guarantees 1,000 false positives by pure chance. Always threshold on FDR / Benjamini-Hochberg adjusted p-values.\nVISUAL: Visual calculation card illustrating the multiple testing problem.',
      card6: 'HEADING: The Ideal Threshold Filter\nCONTENT: Genuine candidates require BOTH: |log2FC| > 1 (at least 2-fold change) AND p.adj < 0.05. Always label biologically verified markers.\nVISUAL: Quadrant shading diagram highlighting true candidate genes in green.',
      card7: 'HEADING: Volcano Plot Rulebook\nCONTENT: Effect size tells you magnitude; adjusted p-value tells you certainty. You need both to tell a scientific story.\nSave this for your next figures meeting.\nVISUAL: Summary card with 3 key takeaway bullet points and ANGSUMI footer.',
      design: 'Precision scatter plot geometry, dark background card accents with ivory frames, clean maroon labels.',
      caption: 'Log2 fold change tells you "how much". Adjusted p-value tells you "how certain". Jab tak dono satisfied nahi hain, do not jump to biological conclusions in your lab meeting. Save this guide!',
      cta: 'Save this volcano plot diagnostic.',
      hashtags: '#Bioinformatics #DataViz #RNAseq #Biostatistics #Genomics #ANGSUMI',
      ref: 'Benjamini & Hochberg, JRSS (1995); Bioconductor EnhancedVolcano package documentation.',
      guardrail: 'Pedagogical demonstration of biostatistical interpretation. Simulated illustrative data points only.'
    },
    {
      day: 5,
      date: '2026-11-05',
      weekday: 'Thursday',
      pillar: 'Coding for Researchers',
      title: 'Tidy Data & Pivot Longer in R',
      hook: 'Stop wrestling with multi-well plate data in messy tables',
      angle: 'Code Utility Blueprint',
      cards: 6,
      card1: 'HEADING: Your 96-well plate data is shaped all wrong.\nCONTENT: How 1 line of R code transforms hours of painful copy-pasting.\nVISUAL: 8x12 multi-well plate matrix transforming into a neat 3-column tidy dataframe.',
      card2: 'HEADING: Wide vs Long Data\nCONTENT: Wide format: Columns named Well_A1, Well_A2, etc. (human-readable for data entry, nightmare for automated plotting and modeling).\nVISUAL: Wide table with too many horizontal columns trailing off the slide.',
      card3: 'HEADING: The Tidy Data Principle\nCONTENT: 1. Each variable forms a column. 2. Each observation forms a row. 3. Each cell contains a single measurement.\nVISUAL: Three tidy data rules illustrated with color-coded rows and columns.',
      card4: 'HEADING: Enter `pivot_longer()`\nCONTENT: `df %>% pivot_longer(cols = starts_with("Well"), names_to = "Well_ID", values_to = "Absorbance")`. That is it!\nVISUAL: Syntax card with highlighted keywords and callouts on argument functions.',
      card5: 'HEADING: The Payoff: 1-Line Plotting\nCONTENT: Once in long format, ggplot2 makes instant grouped boxplots, time curves, and dose-response curves without manual splitting.\nVISUAL: Tidy table connecting seamlessly into a beautiful ggplot facet boxplot.',
      card6: 'HEADING: Save the Code Snippet\nCONTENT: Convert plate data once. Automate your whole lab pipeline forever.\nSave this tidyverse workflow for your next assay.\nVISUAL: Clean reference card with complete R script snippet.',
      card7: 'N/A (6-card carousel)',
      design: 'Editorial code aesthetic, pastel syntax highlighting, crisp multi-well diagram.',
      caption: 'Wet lab assays produce wide tables: 96 wells across dozens of columns. Par ggplot2 aur statistical models ko chahiye "Tidy Long Data". One tidyverse function saves hours of manual Excel cleaning.',
      cta: 'Save this R tidyverse snippet.',
      hashtags: '#RStats #Tidyverse #CodingForScientists #DataCleaning #PhDLife #ANGSUMI',
      ref: 'Wickham, Journal of Statistical Software (2014) Tidy Data; tidyr documentation.',
      guardrail: 'Generic absorbance assay simulation. Illustrative teaching code only.'
    },
    {
      day: 6,
      date: '2026-11-06',
      weekday: 'Friday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Batch Effect Diagnostics',
      hook: 'Is that a treatment effect, or did you sequence on a Friday?',
      angle: 'Experimental Pitfall',
      cards: 7,
      card1: 'HEADING: Did your drug work, or is it a batch effect?\nCONTENT: Why technical variation ruins more high-throughput studies than bad biology.\nVISUAL: PCA plot where samples split exactly by laboratory sequencing date.',
      card2: 'HEADING: What is a Batch Effect?\nCONTENT: Non-biological variation caused by different sequencing days, reagent lots, technicians, or PCR cycles across sample groups.\nVISUAL: Two reagent bottles labeled "Batch 1 (Monday)" and "Batch 2 (Friday)".',
      card3: 'HEADING: The Deadly Confounded Design\nCONTENT: If all Controls are prepped on Day 1 and all Treated on Day 2, batch and biology are 100% confounded. No algorithm can separate them!\nVISUAL: Red warning diagram showing overlapping batch and treatment variables.',
      card4: 'HEADING: Detecting It with PCA\nCONTENT: Color your PCA dots by biological condition. Now color the EXACT same dots by processing date. If date clusters tighter, you have a batch effect.\nVISUAL: Side-by-side comparison PCA cards with clear cluster highlights.',
      card5: 'HEADING: How to Design Against It\nCONTENT: Balance your batches: Process half the controls and half the treated samples together in every single library preparation run.\nVISUAL: Balanced 2x2 randomized block experimental design grid in green.',
      card6: 'HEADING: Modeling the Batch Variable\nCONTENT: If batch is balanced, include it in your linear model formula: `design = ~ batch + condition`. DESeq2 / limma will estimate and adjust for it.\nVISUAL: Model formula card with highlighted batch term and adjustment explanation.',
      card7: 'HEADING: Batch Effect Checklist\nCONTENT: 1. Record metadata diligently. 2. Balance groups across runs. 3. Model technical covariates in design formulas.\nSave this before starting your next wet-lab prep.\nVISUAL: Summary checklist card with ANGSUMI footer.',
      design: 'Ivory background, muted green for balanced designs, deep maroon for confounded warnings.',
      caption: 'Batch effect is the silent killer of RNA-seq and metabolomics data. Agar Control aur Treated alag alag din pe process hue hain, you might be measuring reagent lot variation, not your drug! Here is how to diagnose and prevent it.',
      cta: 'Save this batch diagnostic checklist.',
      hashtags: '#Bioinformatics #BatchEffects #RNAseq #ExperimentalDesign #Biostatistics #ANGSUMI',
      ref: 'Leek et al., Nature Reviews Genetics (2010) Tackling the widespread and critical impact of batch effects.',
      guardrail: 'Conceptual design methodology. Illustrative PCA clustering representations.'
    },
    {
      day: 7,
      date: '2026-11-07',
      weekday: 'Saturday',
      pillar: 'Real PhD Life',
      title: 'Reading Science Papers in 45 Mins',
      hook: 'How to read a 40-page genomics paper without falling asleep',
      angle: 'Scholar Workflow',
      cards: 6,
      card1: 'HEADING: Stop reading science papers from page 1.\nCONTENT: A 3-pass framework to extract key insights, methods, and limitations in 45 minutes.\nVISUAL: Dense paper PDF with selective highlighter marks and a stopwatch graphic.',
      card2: 'HEADING: The Mistake: The Linear Trap\nCONTENT: Reading title to conclusion linearly is exhausting. 80% of background introduction is already known to you; details drown out main findings.\nVISUAL: Tired researcher cartoon icon crossed out beside sequential page arrows.',
      card3: 'HEADING: Pass 1: The 5-Minute Survey\nCONTENT: Read Title, Abstract, Figure Headings, and Final Paragraph of Introduction. Ask: What specific question are they trying to solve?\nVISUAL: Highlighted paper roadmap focusing strictly on Abstract and Figures.',
      card4: 'HEADING: Pass 2: The Figure Autopsy (20 Min)\nCONTENT: Skip the text! Inspect the plots, sample sizes (N), and axes. Do the figures actually prove their abstract claim, or is it correlative?\nVISUAL: Annotated figure card inspecting error bars, N-numbers, and controls.',
      card5: 'HEADING: Pass 3: The Methods Deep-Dive (20 Min)\nCONTENT: Read only the exact analytical pipeline: What reference genome? What thresholds? Did they publish reproducible code and raw GEO data?\nVISUAL: Method checklist focusing on pipeline reproducibility and repositories.',
      card6: 'HEADING: The Paper Note Template\nCONTENT: Capture: 1. Core claim. 2. Critical limitation. 3. One method idea to steal for your own thesis.\nSave this reading roadmap for your next journal club.\nVISUAL: Clean notebook summary template with bookmark icon.',
      card7: 'N/A (6-card carousel)',
      design: 'Clean editorial notebook aesthetic, pastel highlighter accents (yellow/green), timer cues.',
      caption: 'Journal club ke pehle panic mein 50 pages padhne baithe ho? Linear reading is inefficient. Figures and methods tell the real story; text is just author marketing. Use this 3-pass roadmap!',
      cta: 'Save this 3-pass reading framework.',
      hashtags: '#PhDLife #JournalClub #AcademicHacks #ScienceReading #ScholarMindset #ANGSUMI',
      ref: 'Keshav, ACM SIGCOMM CCR (2007) How to Read a Paper.',
      guardrail: 'Academic productivity methodology. No copyrighted journal content reproduced.'
    },
    {
      day: 8,
      date: '2026-11-08',
      weekday: 'Sunday',
      pillar: 'Bioinformatics & Research Data',
      title: 'FASTQ Phred Score Decoding',
      hook: 'What do those cryptic symbols "@, #, I, J" at the bottom of your FASTQ mean?',
      angle: 'Deep Mechanics',
      cards: 7,
      card1: 'HEADING: What is this FASTQ gibberish?\nCONTENT: Line 4 of every FASTQ record looks like broken keyboard keys. Here is the elegant math behind it.\nVISUAL: Four-line FASTQ file snippet with glowing emphasis on the bottom ASCII line.',
      card2: 'HEADING: The Anatomy of FASTQ\nCONTENT: Line 1: @Read_ID. Line 2: Sequence letters (AGCT). Line 3: + separator. Line 4: Phred quality scores.\nVISUAL: Color-coded breakdown of the four canonical FASTQ lines.',
      card3: 'HEADING: The Probability Formula\nCONTENT: Quality score Q = -10 * log10(P), where P is probability of an incorrect base call. Q10 = 1 in 10 error (90% accuracy). Q20 = 1 in 100 (99%). Q30 = 1 in 1000 (99.9%).\nVISUAL: High-contrast table connecting Q score, error probability, and percentage.',
      card4: 'HEADING: The 2-Digit Problem\nCONTENT: If a score is 35, storing "35" takes two characters. To keep sequence and quality exactly 1-to-1 matched, bioinformaticians encoded scores as single ASCII characters!\nVISUAL: Diagram aligning base letters directly with single character quality symbols.',
      card5: 'HEADING: Phred+33 ASCII Offset\nCONTENT: Printable ASCII starts at 33 (!). Add 33 to your Q-score: Q=0 is "!" (ASCII 33), Q=30 is "?" (ASCII 63), Q=40 is "I" (ASCII 73).\nVISUAL: ASCII conversion ruler mapping numeric scores to keyboard symbols.',
      card6: 'HEADING: The FastQC Benchmark\nCONTENT: When FastQC shows green bars above Q30, it means base call confidence is over 99.9%. Yellow is acceptable; red below Q20 needs trimming.\nVISUAL: Annotated FastQC per-base sequence quality boxplot with green/red zones.',
      card7: 'HEADING: FASTQ Takeaway Map\nCONTENT: ASCII quality encoding keeps sequence files compact and aligned.\nSave this decoder for your next sequencing run.\nVISUAL: Visual summary reference sheet with ASCII cheat formula and ANGSUMI badge.',
      design: 'Monospace code typography, cyber-academic ivory/charcoal styling, ASCII ruler graphic.',
      caption: 'Ever wondered why FASTQ quality lines look like someone smashed their keyboard? It is an ingenious ASCII offset system to keep 1 character per base pair! Here is how to decode Phred+33 scores in seconds.',
      cta: 'Save this Phred score decoder.',
      hashtags: '#Bioinformatics #FASTQ #NextGenSequencing #Genomics #ComputationalBiology #ANGSUMI',
      ref: 'Cock et al., Nucleic Acids Research (2010) The Sanger FASTQ file format; FastQC documentation.',
      guardrail: 'Standard mathematical and computational definitions of ASCII-33 Phred encoding.'
    },
    {
      day: 9,
      date: '2026-11-09',
      weekday: 'Monday',
      pillar: 'Coding for Researchers',
      title: 'Python Pandas Vectorization vs Loops',
      hook: 'Stop using `for` loops in Pandas: Make your genomic scripts 300x faster',
      angle: 'Performance Fix',
      cards: 6,
      card1: 'HEADING: Why your Python script takes 40 minutes.\nCONTENT: If you are using `for index, row in df.iterrows():`, you are killing your CPU.\nVISUAL: Turtle icon beside Python `for` loop vs Rocket icon beside vectorized Pandas expression.',
      card2: 'HEADING: What Loops Do Wrong\nCONTENT: Python loops iterate item-by-item in interpreted memory. Converting rows to Pandas Series in every loop carries massive overhead.\nVISUAL: Memory overhead visualization showing slow step-by-step object creation.',
      card3: 'HEADING: The Vectorized Alternative\nCONTENT: Vectorization executes operations on whole memory buffers at C-speed using SIMD CPU instructions.\nVISUAL: Parallel processing diagram illustrating vectorized array computation.',
      card4: 'HEADING: The Code Transformation\nCONTENT: BAD: `for i, r in df.iterrows(): df.loc[i, "GC"] = (r["G"]+r["C"])/r["Len"]`. GOOD: `df["GC"] = (df["G"] + df["C"]) / df["Len"]`. 1 line, 300x faster!\nVISUAL: Side-by-side comparative code syntax cards with execution runtime benchmarks.',
      card5: 'HEADING: Filtering the Smart Way\nCONTENT: Use boolean masks: `high_exp = df[df["TPM"] > 10]`. Combine conditions with `&` and `|`. Never append filtered rows inside loops!\nVISUAL: Clean Pandas filtering recipe card with key syntax highlights.',
      card6: 'HEADING: Save This Python Cheat Sheet\nCONTENT: Vectorize arithmetic. Use boolean masks. Let C/NumPy do the heavy lifting.\nSave this for your next big genomic table.\nVISUAL: Summary card with vectorization best practices and bookmark icon.',
      card7: 'N/A (6-card carousel)',
      design: 'Minimalist dark terminal code snippets on textured ivory card, electric cyan highlights on fast code.',
      caption: 'Big genomic tables with millions of rows freezing your laptop? 90% of the time, it is because of an accidental `.iterrows()` loop. Vectorized Pandas does the same calculation in milliseconds. Save this snippet!',
      cta: 'Save this Python speedup recipe.',
      hashtags: '#Python #Pandas #Bioinformatics #PythonForScientists #DataScience #ANGSUMI',
      ref: 'McKinney, Python for Data Analysis (3rd Ed); NumPy array vectorized operations docs.',
      guardrail: 'Pedagogical demonstration of computational complexity. Benchmarks reflect typical array acceleration.'
    },
    {
      day: 10,
      date: '2026-11-10',
      weekday: 'Tuesday',
      pillar: 'Bioinformatics & Research Data',
      title: 'GO Enrichment vs GSEA Explained',
      hook: 'Over-Representation Analysis (ORA) vs Gene Set Enrichment Analysis (GSEA)',
      angle: 'Method Comparison',
      cards: 7,
      card1: 'HEADING: Stop picking the wrong enrichment test.\nCONTENT: When to use classic Gene Ontology (GO) vs GSEA for your gene lists.\nVISUAL: Split card comparing a strict cut-off gene list with a continuous ranked distribution.',
      card2: 'HEADING: The Problem with Strict Cutoffs\nCONTENT: Classic GO (Over-Representation Analysis) forces you to pick arbitrary thresholds (e.g., p.adj < 0.05 and |log2FC| > 1). Genes ranked at #51 are discarded!\nVISUAL: Threshold cutoff line dropping subtle candidate genes into darkness.',
      card3: 'HEADING: How ORA Works\nCONTENT: Uses hypergeometric or Fisher’s exact test. Asks: Are genes in my significant list found in Pathway X more often than expected by chance?\nVISUAL: 2x2 contingency table illustration with shaded overlap quadrant.',
      card4: 'HEADING: The GSEA Revolution\nCONTENT: Gene Set Enrichment Analysis does NOT use a cutoff. It ranks ALL 20,000 genes by correlation or fold-change and tests if pathway genes cluster at the top or bottom.\nVISUAL: Classic GSEA mountain running sum plot with bar-code gene ticks below.',
      card5: 'HEADING: When to Choose Which?\nCONTENT: Use ORA when you have a small, well-defined gene list from an experiment. Use GSEA when changes are subtle, coordinated, and spread across many pathway genes.\nVISUAL: High-contrast decision guide card with green recommendations.',
      card6: 'HEADING: Common Trap: Redundancy\nCONTENT: GO terms share overlapping gene sets. A list of 50 enriched terms often represents just 2 biological processes. Always cluster terms or use REVIGO!\nVISUAL: Network tree collapsing redundant child GO terms into parent biological themes.',
      card7: 'HEADING: Enrichment Blueprint\nCONTENT: ORA tests discrete lists; GSEA tests continuous ranks. Choose based on your biological hypothesis.\nSave this guide before writing your results section.\nVISUAL: Visual summary reference with decision flowchart and ANGSUMI footer.',
      design: 'Clean diagrammatic pathways, running-sum curve art, deep maroon and ivory editorial styling.',
      caption: 'Har paper mein log GO enrichment kar dete hain, par kya aapko pata hai GSEA kab zaroori hota hai? When biological signals are subtle and coordinated, GSEA captures what rigid thresholding misses. Save this guide!',
      cta: 'Save this pathway analysis guide.',
      hashtags: '#Bioinformatics #GSEA #GeneOntology #Pathways #Transcriptomics #ANGSUMI',
      ref: 'Subramanian et al., PNAS (2005) Gene set enrichment analysis; clusterProfiler R package docs.',
      guardrail: 'Theoretical comparison of statistical enrichment formulations. Illustrative pathway profiles.'
    },
    {
      day: 11,
      date: '2026-11-11',
      weekday: 'Wednesday',
      pillar: 'Real PhD Life',
      title: 'Lab Notebook Digital Hygiene',
      hook: 'If you vanished tomorrow, could someone reproduce your experiment?',
      angle: 'Reproducibility Culture',
      cards: 6,
      card1: 'HEADING: Your lab notebook is a legal record.\nCONTENT: Why messy notes cost scholars months of work (and how to build a bulletproof research vault).\nVISUAL: Messy paper notebook with coffee stains fading into an organized digital research system.',
      card2: 'HEADING: The 6-Month Test\nCONTENT: Look at your notes from 6 months ago. Can you find the exact primer sequence, antibody dilution lot, and script filename? If not, you have technical debt.\nVISUAL: Calendar flipping back 6 months with question marks over blank dates.',
      card3: 'HEADING: The 4 Non-Negotiable Pillars\nCONTENT: Every entry must record: 1. Date & Objective. 2. Raw File Location (exact path/hash). 3. Parameters / Reagent Lots. 4. Immediate Observations & Next Steps.\nVISUAL: Four structured ledger blocks with clear iconography.',
      card4: 'HEADING: Digital vs Paper: The Hybrid Model\nCONTENT: Paper at the wet bench for speed, transcribed daily to searchable digital vaults (Obsidian / Notion / Benchling / Electronic Lab Notebooks).\nVISUAL: Bench clipboard syncing seamlessly with a laptop Markdown folder.',
      card5: 'HEADING: File Naming Discipline\nCONTENT: NEVER use `final_v2_really_final.xlsx`. USE: `YYYY-MM-DD_[Project]_[Experiment]_[Descriptor]_[Author].ext`. Predictable, sortable, machine-readable.\nVISUAL: Comparative naming cards: Bad naming crossed out in red vs Clean standard in green.',
      card6: 'HEADING: Save the Research Standard\nCONTENT: Organized notes are not bureaucracy; they are the foundation of your PhD sanity.\nBookmark this protocol for your research group.\nVISUAL: Summary card with naming convention cheat sheet and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Architectural ledger aesthetic, warm ivory paper with grid rule lines, crisp typography.',
      caption: 'Six months baad jab paper likhne baithoge, you will not remember whether you used 1:500 or 1:1000 antibody dilution. Clean lab notes are a gift to your future self. Here is the hybrid digital system I follow.',
      cta: 'Save this lab notebook protocol.',
      hashtags: '#PhDLife #LabNotes #ReproducibleScience #ResearchMethods #OpenScience #ANGSUMI',
      ref: 'Barker, At the Bench: A Laboratory Navigator; NIH Rigor & Reproducibility Guidelines.',
      guardrail: 'Pedagogical best practices in laboratory record-keeping. General academic workflow advice.'
    },
    {
      day: 12,
      date: '2026-11-12',
      weekday: 'Thursday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Heatmap Clustering Traps',
      hook: 'Why hierarchical clustering in heatmaps is easy to fake (and misread)',
      angle: 'Data Visualization Pitfall',
      cards: 7,
      card1: 'HEADING: Don’t trust every heatmap dendrogram.\nCONTENT: How arbitrary clustering distance metrics create beautiful patterns out of pure noise.\nVISUAL: Dramatic genomic heatmap with complex branching tree branches at the top.',
      card2: 'HEADING: The Power and Danger of Dendrograms\nCONTENT: Hierarchical clustering will ALWAYS group your data into trees, even if the data was generated from random numbers!\nVISUAL: Side-by-side: Simulated random noise clustered into convincing fake patterns.',
      card3: 'HEADING: Distance Metric Matters\nCONTENT: Euclidean distance measures absolute expression magnitude. Pearson correlation measures profile shape regardless of height. They give totally different trees!\nVISUAL: Two contrasting cluster trees showing how the same samples regroup under different metrics.',
      card4: 'HEADING: Linkage Method Trap\nCONTENT: "Complete" linkage creates compact spheres. "Single" linkage creates long chain artifacts. "Ward.D2" minimizes variance. Always state your linkage method!\nVISUAL: Graphical depiction of single vs complete vs average linkage calculations.',
      card5: 'HEADING: The Z-Score Row Scaling Dilemma\nCONTENT: Heatmaps almost always scale rows by Z-score (`(x - mean)/sd`). This reveals patterns across genes with very different basal expression levels, but erases absolute differences.\nVISUAL: Gene row before and after Z-score transformation, highlighting color range expansion.',
      card6: 'HEADING: Best Practices for Publication\nCONTENT: 1. Always specify distance metric and linkage. 2. Annotate sample metadata bars clearly. 3. Validate clusters with bootstrapping (e.g. pvclust).\nVISUAL: Anatomical breakdown of a fully annotated publication-grade heatmap.',
      card7: 'HEADING: Heatmap Rule of Thumb\nCONTENT: Clustering is exploratory, not hypothesis confirmation. Never claim clinical subtypes solely from unvalidated dendrograms.\nSave this for your figure polish.\nVISUAL: Visual checklist with essential heatmap reporting parameters and ANGSUMI footer.',
      design: 'Rich maroon-to-ivory heatmap color scales, precision dendrogram vector lines, clean annotations.',
      caption: 'Heatmaps look gorgeous in presentations, but did you know distance metrics can completely reshuffle your clusters? Understanding Euclidean vs Correlation distance is crucial before interpreting your dendrogram. Save this!',
      cta: 'Save this heatmap guide.',
      hashtags: '#Bioinformatics #DataViz #Heatmaps #Genomics #RStats #ANGSUMI',
      ref: 'ComplexHeatmap package documentation (Gu et al., Bioinformatics 2016); pvclust R package.',
      guardrail: 'Pedagogical examination of clustering mathematics. Illustrative simulated expression patterns.'
    },
    {
      day: 13,
      date: '2026-11-13',
      weekday: 'Friday',
      pillar: 'Coding for Researchers',
      title: 'Reproducible Conda Environments',
      hook: 'Stop breaking your bioinformatics pipelines with `pip install` conflicts',
      angle: 'Software Engineering for Science',
      cards: 6,
      card1: 'HEADING: "It worked yesterday, now it throws an error."\nCONTENT: The conda environment blueprint that prevents package dependency nightmares.\nVISUAL: Tangled yarn ball labeled "Default Base Env" vs clean isolated container boxes.',
      card2: 'HEADING: Never Install in `base`\nCONTENT: The `base` environment is your system lifeline. Installing conflicting packages in `base` leads to irreversible dependency bricking.\nVISUAL: Red warning skull over `(base)` command prompt.',
      card3: 'HEADING: Isolated Envs per Project\nCONTENT: Rule 1: Every project gets its own isolated environment: `conda create -n rna_seq_2026 python=3.11 bioconductor-deseq2 -c bioconda -c conda-forge`.\nVISUAL: Step-by-step terminal command with channel flags explained.',
      card4: 'HEADING: The Power of `environment.yml`\nCONTENT: Export exact versions: `conda env export --no-builds > environment.yml`. Anyone in the world can replicate your exact environment in 1 command.\nVISUAL: Clean YAML file layout showing channels and explicit package versions.',
      card5: 'HEADING: Speed Up with Mamba / Pixi\nCONTENT: Classic Conda dependency solving is notoriously slow. Use Mamba (C++ engine) or modern Pixi for 10x faster environment creation.\nVISUAL: Comparative speed gauge comparing Conda solver vs Mamba solver.',
      card6: 'HEADING: Environment Discipline\nCONTENT: 1. Keep base clean. 2. Export environment.yml with your paper. 3. Recreate easily anywhere.\nSave this for your next workstation setup.\nVISUAL: Summary reference card with essential terminal commands.',
      card7: 'N/A (6-card carousel)',
      design: 'Dark code terminal theme with ivory border frame, vibrant syntax highlights, clean typography.',
      caption: 'Base conda environment mein sab kuch install kar diya aur ab kuch bhi run nahi ho raha? We have all been there. Isolated project environments are the secret to reproducible bioinformatics. Save this workflow!',
      cta: 'Save this Conda environment guide.',
      hashtags: '#Bioinformatics #Conda #Python #Reproducibility #LinuxForBiologists #ANGSUMI',
      ref: 'Grüning et al., Nature Methods (2018) Bioconda: sustainable package management for life sciences.',
      guardrail: 'Software configuration tutorial. Standard open-source package management commands.'
    },
    {
      day: 14,
      date: '2026-11-14',
      weekday: 'Saturday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Human Genome Builds: GRCh38 vs hg19',
      hook: 'Mixing GRCh38 and hg19 coordinates: The fastest way to corrupt your research',
      angle: 'Critical Pitfall',
      cards: 7,
      card1: 'HEADING: Are your genomic coordinates from 2009 or 2013?\nCONTENT: Why mixing hg19 and GRCh38 ruins variant discovery and gene annotations.\nVISUAL: Chromosome diagram with mismatched pointer markers falling into different gene bodies.',
      card2: 'HEADING: The Reference Genome Reality\nCONTENT: A reference genome is not a static holy book; it is a continuously updated consensus assembly. hg19 (GRCh37) was released in 2009; GRCh38 in 2013.\nVISUAL: Timeline of human genome assembly releases showing major structural fixes.',
      card3: 'HEADING: What Changed in GRCh38?\nCONTENT: Corrected thousands of misassembled sequences, added centromeric models, and introduced alternate locus scaffolds (ALT contigs) for diverse populations.\nVISUAL: Anatomical chromosome comparison showing gap closures and alternate contigs.',
      card4: 'HEADING: The Catastrophic Coordinate Shift\nCONTENT: Coordinate Chr1:1,000,000 in hg19 does NOT point to Chr1:1,000,000 in GRCh38. An SNP in an exon can shift into an intron or non-coding desert!\nVISUAL: Split view of coordinate 1M pointing to Exon 2 in hg19 but an intergenic desert in GRCh38.',
      card5: 'HEADING: The "chr" Prefix Trap\nCONTENT: UCSC uses "chr1", "chr2", "chrM". Ensembl / NCBI uses "1", "2", "MT". Combining these crashes BAM tools and BEDtools instantly.\nVISUAL: Side-by-side chromosome notation comparison with simple regex fix.',
      card6: 'HEADING: How to Convert: Liftover\nCONTENT: If you MUST convert older data, use UCSC LiftOver or CrossMap with official chain files. But re-aligning to GRCh38 is always preferred.\nVISUAL: Workflow showing coordinate translation via chain file with failure alert notes.',
      card7: 'HEADING: Reference Checklist\nCONTENT: 1. Know your build version. 2. Never mix GTF and FASTA builds. 3. Check chromosome naming prefix.\nSave this before downloading public GEO datasets.\nVISUAL: Visual summary reference with genome coordinate checklist and ANGSUMI footer.',
      design: 'Genomic chromosome map aesthetics, muted green and maroon contrasts, precision coordinate markers.',
      caption: 'Public GEO dataset download kiya aur apne data ke saath merge kar diya bina build check kiye? Coordinate shift will assign your variants to completely wrong genes! Always verify GRCh38 vs hg19. Save this guide.',
      cta: 'Save this reference genome checklist.',
      hashtags: '#Genomics #Bioinformatics #UCSC #Ensembl #DNA #ANGSUMI',
      ref: 'Schneider et al., Genome Biology (2017) Evaluation of GRCh38 and de novo haploid assemblies.',
      guardrail: 'Pedagogical comparison of public genomic assembly versions. Standard NCBI/UCSC conventions.'
    },
    {
      day: 15,
      date: '2026-11-15',
      weekday: 'Sunday',
      pillar: 'Real PhD Life',
      title: 'Designing Conference Posters That Don’t Sucker',
      hook: 'Why 90% of academic conference posters look like dense textbooks',
      angle: 'Visual Communication',
      cards: 6,
      card1: 'HEADING: Nobody is going to read your 800-word poster.\nCONTENT: How to design an academic poster people will actually stop and discuss.\nVISUAL: Crowded conference hall with an overcrowded, wall-of-text poster versus a clean, billboard-style poster.',
      card2: 'HEADING: The Poster is a Billboard, Not a Paper\nCONTENT: Attendees walk past in 3 seconds while holding coffee. Your goal is not to prove everything; it is to spark a 2-minute conversation.\nVISUAL: 3-second walking glance countdown graphic.',
      card3: 'HEADING: The "Better Poster" Architecture\nCONTENT: Middle: Giant takeaway finding in plain English (sentence case, 60pt font). Left: Brief context & methodology. Right: Key data figures and QR code to preprint.\nVISUAL: Three-column architectural blueprint of a modern high-impact poster.',
      card4: 'HEADING: Typography & Distance Rules\nCONTENT: If your text cannot be read from 5 feet away, it is too small. Headings: 60-80pt. Body: 28-36pt. Captions: 20-24pt. Cut 50% of your words.\nVISUAL: Distance viewing scale ruler with font size recommendations.',
      card5: 'HEADING: The QR Code Best Practice\nCONTENT: Link your QR code directly to: 1. Your preprint or paper. 2. Interactive code / repository. 3. Downloadable PDF of the poster itself.\nVISUAL: Clean QR code layout card with callout labels.',
      card6: 'HEADING: Save the Poster Blueprint\nCONTENT: High contrast. Generous whitespace. One clear message.\nSave this design layout for your next international conference.\nVISUAL: Completed poster schematic with annotations and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Exhibition poster architecture, generous whitespace, charcoal and ivory with maroon hero callouts.',
      caption: 'Conference poster session mein log aapke poster ke paas aake rukte hi nahi? Wall-of-text posters repel people. Use the billboard design framework to get genuine discussions and collaborator contacts.',
      cta: 'Save this poster layout blueprint.',
      hashtags: '#AcademicTwitter #ConferenceLife #SciComm #PhDLife #DataViz #ANGSUMI',
      ref: 'Morrison, YouTube/OSF (2019) Generation 1 & 2 Better Poster Design Movement.',
      guardrail: 'Design communication principles for scientific presentations. No specific research data presented.'
    },
    {
      day: 16,
      date: '2026-11-16',
      weekday: 'Monday',
      pillar: 'Bioinformatics & Research Data',
      title: 'SAM/BAM Bitwise Flags Decoded',
      hook: 'What does `FLAG: 163` in your alignment file actually mean?',
      angle: 'Deep Mechanics',
      cards: 7,
      card1: 'HEADING: Decoding the cryptic BAM flag: 163.\nCONTENT: How binary arithmetic inside SAM/BAM files encodes 12 read properties in a single number.\nVISUAL: Raw SAM alignment line highlighting Column 2 (Flag value 163) in glowing amber.',
      card2: 'HEADING: What is a Bitwise Flag?\nCONTENT: Storing text like "paired, mapped, proper pair, reverse strand" takes huge disk space. Bioinformaticians use powers of 2 (binary bits) instead!\nVISUAL: Powers of 2 chart (1, 2, 4, 8, 16, 32, 64, 128, etc.) aligned with boolean properties.',
      card3: 'HEADING: Deconstructing the Number 163\nCONTENT: 163 = 1 + 2 + 32 + 128. That simple sum tells you FOUR distinct physical facts about that sequencing read!\nVISUAL: Visual addition breakdown formula card in high-contrast ivory and maroon.',
      card4: 'HEADING: Translating the Bits\nCONTENT: 1: Read paired. 2: Read mapped in proper pair. 32: Mate reverse strand. 128: Second read in pair. All from 163!\nVISUAL: Four translated checkboxes with green checkmarks beside each property.',
      card5: 'HEADING: Common Flags You Must Know\nCONTENT: 0: Unpaired forward map. 4: Unmapped read. 16: Reverse strand map. 77 / 141: Paired unmapped mates. 256: Secondary alignment.\nVISUAL: Reference table of common alignment flags and their meanings.',
      card6: 'HEADING: The Samtools Filter Trick\nCONTENT: Extract only properly paired reads: `samtools view -f 2 in.bam`. Discard unmapped reads: `samtools view -F 4 in.bam`. Capital -F means EXCLUDE!\nVISUAL: Terminal command syntax card with `-f` (include) and `-F` (exclude) highlighted.',
      card7: 'HEADING: Flag Decoder Cheat Sheet\nCONTENT: Bitwise flags save storage and allow lightning-fast filtering.\nSave this decoder for your next BAM processing script.\nVISUAL: Cheat sheet summarizing binary flag values with Broad Institute Explain tool URL.',
      design: 'Monospace computational terminal layout, ivory cards with charcoal binary code inlays.',
      caption: 'BAM file ka column 2 hamesha confusing lagta hai na? 163, 99, 83... Yeh random numbers nahi hain, binary bitwise additions hain! Here is how to decode them in seconds with samtools.',
      cta: 'Save this BAM flag cheat sheet.',
      hashtags: '#Bioinformatics #Samtools #Genomics #NextGenSequencing #BAM #ANGSUMI',
      ref: 'Li et al., Bioinformatics (2009) The Sequence Alignment/Map format; Broad Institute SAM Flag Explaining Tool.',
      guardrail: 'Official SAM/BAM specification standards. Purely mathematical and computational explanation.'
    },
    {
      day: 17,
      date: '2026-11-17',
      weekday: 'Tuesday',
      pillar: 'Coding for Researchers',
      title: 'Automating Lab Spreadsheets with Python',
      hook: 'How to calculate 96-well master mixes without spreadsheet errors',
      angle: 'Utility Code',
      cards: 6,
      card1: 'HEADING: Automate your PCR master mix.\nCONTENT: Stop recalculating pipetting volumes by hand on sticky notes.\nVISUAL: Pipette dispensing into multi-well plate beside an elegant 10-line Python calculation script.',
      card2: 'HEADING: The Manual Calculation Risk\nCONTENT: Scaling a reaction from 1 sample to 48 samples with 10% pipetting excess on a calculator leads to typos, running out of master mix, and wasted reagents.\nVISUAL: Sticky note covered in crossed-out numbers and calculations with a red question mark.',
      card3: 'HEADING: The Python Function\nCONTENT: Define a reusable function: inputs for number of reactions, excess percentage, and component stock concentrations.\nVISUAL: Clean Python function signature `def pcr_mastermix(n_samples, excess=0.10):` with highlighted parameters.',
      card4: 'HEADING: Formatted Console Output\nCONTENT: Script prints a formatted pipetting guide: Buffer, dNTPs, Primers, Taq Polymerase, and Water with exact microliter volumes ready for your bench.\nVISUAL: Terminal table showing neat pipetting checklist for 48 reactions + excess.',
      card5: 'HEADING: Extend to Excel Export\nCONTENT: Use `pandas.DataFrame.to_excel()` to automatically generate a dated bench-sheet with sample IDs and plate maps.\nVISUAL: Python output feeding directly into a clean printable bench PDF / spreadsheet.',
      card6: 'HEADING: Save the PCR Script\nCONTENT: Turn repetitive wet-lab math into verified, reusable code.\nSave this script for your next cDNA or qPCR run.\nVISUAL: Clean reference card with full reusable script snippet and ANGSUMI badge.',
      card7: 'N/A (6-card carousel)',
      design: 'Modern clean scientific utility theme, warm ivory, deep maroon function headers, readable monospace code.',
      caption: 'PCR master mix calculate karte waqt 10% pipetting error add karna bhool gaye aur aakhri well ke liye mix khatam? Write a 10-line Python script once, and never do manual pipetting math again.',
      cta: 'Save this Python PCR script.',
      hashtags: '#Python #LabAutomation #PCR #MolecularBiology #WetLab #ANGSUMI',
      ref: 'Python Standard Library math & pandas documentation.',
      guardrail: 'General pipetting calculation arithmetic. Standard molecular biology reaction proportions.'
    },
    {
      day: 18,
      date: '2026-11-18',
      weekday: 'Wednesday',
      pillar: 'Bioinformatics & Research Data',
      title: 'VCF Anatomy & Variant Calling',
      hook: 'How to read a Variant Call Format (VCF) file without fear',
      angle: 'Foundational File Format',
      cards: 7,
      card1: 'HEADING: Inside a Variant Call Format file.\nCONTENT: How whole-genome mutations are recorded across 8 standardized columns.\nVISUAL: DNA helix with a single nucleotide mutation glowing beside a crisp tabular VCF file layout.',
      card2: 'HEADING: The VCF Header (# Lines)\nCONTENT: Metadata lines start with `##`. They define reference genomes, contigs, and explain every abbreviation used in INFO and FORMAT fields.\nVISUAL: Highlighted VCF header lines explaining `##INFO=<ID=DP,Number=1,Type=Integer...`.',
      card3: 'HEADING: The 8 Fixed Columns\nCONTENT: CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO. POS is 1-based (unlike BED files which are 0-based!).\nVISUAL: The 8 column headers clearly aligned with sample values below.',
      card4: 'HEADING: Decoding the INFO Field\nCONTENT: Semicolon-separated tags describing the variant site: `DP=45` (read depth), `AF=0.50` (allele frequency), `AN=2` (total alleles).\nVISUAL: Callouts breaking down each semicolon-delimited tag in plain English.',
      card5: 'HEADING: FORMAT vs Sample Genotypes\nCONTENT: FORMAT specifies the order of values for each sample column: `GT:DP:GQ`. A genotype `0/1` means heterozygous mutation; `1/1` means homozygous mutant.\nVISUAL: Clear table showing how `0/0` (reference), `0/1` (heterozygous), and `1/1` (homozygous) decode.',
      card6: 'HEADING: Critical Quality Filtering\nCONTENT: Never use raw variants without filtering! Check: 1. Depth (DP > 10). 2. Genotype Quality (GQ > 20). 3. Strand bias (FS/SOR).\nVISUAL: Filtering decision workflow discarding noisy calls into a filtered VCF file.',
      card7: 'HEADING: VCF Quick Reference\nCONTENT: POS is 1-based. GT gives zygosity. INFO gives site data; FORMAT gives sample data.\nSave this for your next variant calling analysis.\nVISUAL: Cheat sheet card summarizing VCF structure with ANGSUMI footer.',
      design: 'Precision genomic coordinate styling, ivory background, crisp charcoal fonts with maroon field tags.',
      caption: 'Genomic variant discovery sounds complicated until you realize VCF is just an 8-column table with a smart genotype format. Here is how to decode POS, REF/ALT, and GT:DP:GQ in 2 minutes.',
      cta: 'Save this VCF reference guide.',
      hashtags: '#Genomics #Bioinformatics #VCF #VariantCalling #DNA #ANGSUMI',
      ref: 'Danecek et al., Bioinformatics (2011) The variant call format and VCFtools; GATK Best Practices.',
      guardrail: 'Standard specifications from the Global Alliance for Genomics and Health (GA4GH).'
    },
    {
      day: 19,
      date: '2026-11-19',
      weekday: 'Thursday',
      pillar: 'Real PhD Life',
      title: 'Managing Scholar Imposter Syndrome',
      hook: 'When your code errors for the 50th time and you think you don’t belong',
      angle: 'Mental Resilience & Truth',
      cards: 6,
      card1: 'HEADING: "Everyone in my lab knows more than me."\nCONTENT: Why imposter syndrome hits computational life-science researchers the hardest.\nVISUAL: Scholar looking at terminal errors beside a crowded lab, subtle warm reflective lighting.',
      card2: 'HEADING: The Hybrid Identity Crisis\nCONTENT: Wet-lab peers think you are a computer scientist; computer scientists think you are a biologist. You feel like a master of neither.\nVISUAL: Two overlapping circles ("Pure Wet Lab" vs "Pure Computer Science") leaving the researcher in the middle.',
      card3: 'HEADING: The Truth About Programming Errors\nCONTENT: Senior staff bioinformaticians spend 40% of their day debugging syntax errors, reading StackOverflow, and Googling error messages. It never stops!\nVISUAL: Reality comparison: Junior assumption (smooth typing) vs Senior reality (constant error reading).',
      card4: 'HEADING: You Are a Scientific Bridge\nCONTENT: The power of a computational biologist is not memorizing algorithms; it is knowing WHICH biological question matters and how to test it.\nVISUAL: Bridge illustration connecting raw biological samples to computational models.',
      card5: 'HEADING: The Daily Progress Rule\nCONTENT: Stop measuring yourself by finished papers. Measure yourself by: Did I understand one error message today? Did I test one hypothesis?\nVISUAL: Daily growth checklist card with calm green markers.',
      card6: 'HEADING: A Scholar Reminder\nCONTENT: Confusion is not a sign of inability. It is the literal sensation of learning something complex.\nSave this for days when the script refuses to run.\nVISUAL: Inspiring scholar quote card with lived-in study notebook texture and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Warm documentary aesthetic, soothing ivory and earthy green tones, intimate reflective typography.',
      caption: 'Bioinformatics mein jab error aata hai, toh lagta hai hum hi galat career choose kar liye. But debugging IS the job. Even principal investigators Google syntax daily. You are not an imposter; you are learning.',
      cta: 'Save this reminder for tough lab days.',
      hashtags: '#PhDLife #ImposterSyndrome #MentalHealthInAcademia #WomenInSTEM #ScholarMindset #ANGSUMI',
      ref: 'Langin, Science (2020) Fake it till you make it? Overcoming imposter feelings in graduate school.',
      guardrail: 'Empathic academic mentoring and resilience guidance. Authentic lived scholar perspective.'
    },
    {
      day: 20,
      date: '2026-11-20',
      weekday: 'Friday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Microbiome Alpha vs Beta Diversity',
      hook: 'Alpha Diversity vs Beta Diversity: Don’t mix up your ecology metrics',
      angle: 'Concept Clarification',
      cards: 7,
      card1: 'HEADING: Alpha vs Beta Diversity.\nCONTENT: How to measure microbial communities within a single gut vs across treatment groups.\nVISUAL: Petri dish showing rich diverse microbial colonies beside a PCoA ordination plot.',
      card2: 'HEADING: The Fundamental Distinction\nCONTENT: Alpha Diversity = Diversity WITHIN a single sample (richness & evenness). Beta Diversity = Diversity BETWEEN different samples (compositional similarity).\nVISUAL: Simple graphic: One sample box (Alpha) vs Two arrows comparing two boxes (Beta).',
      card3: 'HEADING: Key Alpha Metrics\nCONTENT: Shannon Index: Measures both richness and evenness. Simpson Index: Emphasizes dominant species. Chao1: Estimates rare species richness.\nVISUAL: Comparative table of Shannon, Simpson, and Chao1 with when to use each.',
      card4: 'HEADING: Key Beta Metrics\nCONTENT: Bray-Curtis: Based on abundance dissimilarity (0 to 1). Jaccard: Presence/absence only. UniFrac: Incorporates evolutionary branch lengths on phylogenetic trees!\nVISUAL: Three cards illustrating ecological distance concepts.',
      card5: 'HEADING: Visualizing Beta: PCoA / NMDS\nCONTENT: Beta diversity produces a distance matrix. Ordination plots (PCoA) project this high-dimensional distance into 2D space so you can spot clusters.\nVISUAL: Annotated PCoA plot showing separation of Healthy vs Diseased microbiomes.',
      card6: 'HEADING: Statistical Testing Trap\nCONTENT: Looking at a PCoA plot is not enough! Use PERMANOVA (`vegan::adonis2`) to prove if community centroids are statistically different.\nVISUAL: PERMANOVA formula card with p-value and R2 variance explained metrics.',
      card7: 'HEADING: Microbiome Diversity Cheat Sheet\nCONTENT: Alpha tells you internal richness; Beta tells you group differences. Always pair PCoA with PERMANOVA.\nSave this for your 16S analysis.\nVISUAL: Summary card with decision roadmap and ANGSUMI footer.',
      design: 'Earthy greens, muted ivory, botanical and microbial line illustrations, clean ordination curves.',
      caption: '16S sequencing kar liya aur ab Shannon, Bray-Curtis, aur UniFrac mein confuse ho rahe ho? Alpha diversity looks inside one sample; Beta diversity compares between samples. Here is the complete breakdown.',
      cta: 'Save this microbiome diversity guide.',
      hashtags: '#Microbiome #Bioinformatics #16S #Metagenomics #Ecology #ANGSUMI',
      ref: 'Lozupone & Knight, AEM (2005) UniFrac; Oksanen et al., vegan R package documentation.',
      guardrail: 'Ecological biostatistical concepts. Illustrative non-experimental ordination graphics.'
    },
    {
      day: 21,
      date: '2026-11-21',
      weekday: 'Saturday',
      pillar: 'Coding for Researchers',
      title: 'Git Version Control for Thesis Scripts',
      hook: 'Stop naming files `analysis_final_revised_v3_really_done.R`',
      angle: 'Software Engineering for Science',
      cards: 6,
      card1: 'HEADING: Your folder contains 14 "final" files.\nCONTENT: How 3 simple Git commands give you an automatic time machine for your research code.\nVISUAL: Directory listing full of messy "final_v2_final" files crossing out into a single clean repository.',
      card2: 'HEADING: The Pain of Manual Versions\nCONTENT: Saving multiple file copies clutters your disk, makes diffing impossible, and leaves you wondering which script produced Figure 3 in your thesis.\nVISUAL: Frustrated scholar comparing two files trying to spot what changed.',
      card3: 'HEADING: The Git Time Machine Concept\nCONTENT: Git tracks snapshots of your entire project over time. You can revert mistakes, test bold ideas on branches, and see exact line diffs.\nVISUAL: Linear timeline diagram showing commits as verifiable historical milestones.',
      card4: 'HEADING: The Only 4 Commands You Need\nCONTENT: 1. `git init` (once). 2. `git add .` (stage changes). 3. `git commit -m "Add DESeq2 filtering"` (save snapshot). 4. `git log --oneline` (view history).\nVISUAL: Terminal card with 4 foundational Git commands and clear plain-English translations.',
      card5: 'HEADING: What Goes in `.gitignore`\nCONTENT: NEVER commit large FASTQ, BAM, or CSV files to Git! Track only code, configs, and documentation. Add `*.bam`, `*.fastq`, and `data/` to `.gitignore`.\nVISUAL: `.gitignore` file snippet highlighting data exclusions.',
      card6: 'HEADING: Save the Git Starter Guide\nCONTENT: Keep your repository clean. Commit logical chunks. Never lose working code again.\nSave this for your next project initialization.\nVISUAL: Summary reference card with essential terminal workflow.',
      card7: 'N/A (6-card carousel)',
      design: 'Clean git branch visual timeline, dark terminal text inlays on ivory paper, subtle green commit dots.',
      caption: 'Thesis analysis likhte waqt code toot gaya aur ab yaad nahi kal kya change kiya tha? Git is a free time-machine for your research scripts. You only need 4 simple commands to get started.',
      cta: 'Save this Git beginner workflow.',
      hashtags: '#Git #CodingForScientists #Bioinformatics #OpenScience #Reproducibility #ANGSUMI',
      ref: 'Perez-Riverol et al., PLoS Computational Biology (2016) Ten simple rules for taking advantage of Git.',
      guardrail: 'Foundational version control education. Standard open-source Git commands.'
    },
    {
      day: 22,
      date: '2026-11-22',
      weekday: 'Sunday',
      pillar: 'Real PhD Life',
      title: 'Presenting Data to Non-Computational Advisors',
      hook: 'How to explain your bioinformatic results to a traditional wet-lab supervisor',
      angle: 'Academic Communication',
      cards: 6,
      card1: 'HEADING: "Just tell me which gene to PCR."\nCONTENT: How to bridge the communication gap between bioinformaticians and wet-lab advisors.\nVISUAL: Split conference room: Laptop terminal screen on one side, pipette and agarose gel on the other.',
      card2: 'HEADING: Understand Their Language\nCONTENT: Traditional advisors think in mechanisms, bands on a gel, and phenotype rescue. They do not care about PCA eigenvalues or Kallisto k-mer indexes!\nVISUAL: Translation table: Computational Metric -> Biological Meaning.',
      card3: 'HEADING: Rule 1: Lead with the Biology, Not the Pipeline\nCONTENT: BAD: "I ran TrimGalore, aligned with STAR, and ran DESeq2 with Wald test." GOOD: "We identified 3 kinase genes that drop 4-fold after 24h drug treatment."\nVISUAL: Side-by-side comparative speech bubbles: Technical Jargon vs Biological Impact.',
      card4: 'HEADING: Rule 2: Anchor with Positive Controls\nCONTENT: Before showing novel candidate genes, show that known marker genes behaved as expected. This instantly builds advisor trust in your computation.\nVISUAL: Validation bar chart showing expected positive control gene lighting up in green.',
      card5: 'HEADING: Rule 3: Provide Testable Wet-Lab Next Steps\nCONTENT: End your presentation with: "Here are the top 3 genes, their primer designs, and expected fold-changes ready for qPCR validation."\nVISUAL: Actionable handoff card bridging computation directly into wet-lab validation assays.',
      card6: 'HEADING: Save the Translation Playbook\nCONTENT: Bridge computation and experiment. Speak the language of biological validation.\nSave this before your next committee meeting.\nVISUAL: Summary card with presentation guidelines and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Scholarly presentation aesthetics, warm ivory paper, maroon header cards, clear translation tables.',
      caption: 'Wet lab PI ko bioinformatics results samjhana difficult lagta hai? If you lead with algorithms, they lose interest. Lead with positive controls and testable PCR targets to win their confidence. Save this!',
      cta: 'Save this presentation guide.',
      hashtags: '#PhDLife #SciComm #Bioinformatics #AcademicAdvising #WetLab #ANGSUMI',
      ref: 'Noble, Nature Biotechnology (2009) A quick guide to organizing computational biology projects.',
      guardrail: 'Professional communication methodology in academia. No proprietary lab discussions disclosed.'
    },
    {
      day: 23,
      date: '2026-11-23',
      weekday: 'Monday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Single-Cell RNA-seq: QC Metrics That Matter',
      hook: 'Mitochondrial reads & doublets: Why raw scRNA-seq cells are often trash',
      angle: 'Cutting-Edge Diagnostic',
      cards: 7,
      card1: 'HEADING: Stop clustering dying cells.\nCONTENT: The three non-negotiable QC filters every single-cell RNA-seq analysis must apply.\nVISUAL: Stylized single-cell UMAP projection with low-quality outlier droplets circled in alert red.',
      card2: 'HEADING: The Droplet Reality\nCONTENT: Droplet-based microfluidics (10x Genomics) traps empty droplets with ambient RNA, dying cells, and doublets alongside healthy cells.\nVISUAL: Microfluidic droplet channel diagram showing healthy single cell vs empty vs dying cell.',
      card3: 'HEADING: Metric 1: Mitochondrial Percentage\nCONTENT: When cell membranes rupture during dissociation, cytoplasmic mRNA leaks out while mitochondria remain trapped inside. High mito percentage (>10-15%) = dying cell!\nVISUAL: Rupturing cell diagram showing mRNA leakage and mitochondrial accumulation.',
      card4: 'HEADING: Metric 2: UMI Counts vs Gene Number\nCONTENT: Low counts = empty ambient droplets. Extremely high counts = potential doublets (two cells trapped in one droplet). Filter on both thresholds!\nVISUAL: Scatter plot of total UMIs vs detected genes (nFeature_RNA vs nCount_RNA).',
      card5: 'HEADING: Metric 3: Doublet Detection Algorithms\nCONTENT: Beyond manual thresholds, run computational doublet predictors like DoubletFinder or Scrublet to remove artificial hybrid profiles.\nVISUAL: UMAP plot showing simulated artificial doublets highlighted and filtered out.',
      card6: 'HEADING: Standard Seurat Filtering Template\nCONTENT: `subset(obj, subset = nFeature_RNA > 500 & nFeature_RNA < 5000 & percent.mt < 10)`. Always inspect violin plots before hard-coding cutoffs!\nVISUAL: Clean R Seurat syntax snippet with violin plot callout diagrams.',
      card7: 'HEADING: Single-Cell QC Blueprint\nCONTENT: Filter dying cells (mito%), empty droplets (low UMIs), and doublets before running PCA or UMAP.\nSave this for your single-cell analysis.\nVISUAL: Visual summary reference with 3-step QC filtering checklist and ANGSUMI footer.',
      design: 'Modern cellular microfluidic aesthetics, clean UMAP cluster styling, ivory cards with turquoise accents.',
      caption: 'Single cell data mil gaya aur seedha Seurat run karke UMAP bana diya? If you do not filter high mitochondrial reads and doublets, your unique "new cell cluster" might just be dying debris! Save this QC workflow.',
      cta: 'Save this scRNA-seq QC checklist.',
      hashtags: '#SingleCell #scRNAseq #Seurat #Bioinformatics #Genomics #ANGSUMI',
      ref: 'Luecken & Theis, Molecular Systems Biology (2019) Current best practices in single-cell RNA-seq analysis.',
      guardrail: 'Pedagogical single-cell quality control standards. Illustrative non-experimental UMAP coordinates.'
    },
    {
      day: 24,
      date: '2026-11-24',
      weekday: 'Tuesday',
      pillar: 'Coding for Researchers',
      title: 'Publication-Ready Boxplots with ggplot2',
      hook: 'Turn ugly default R plots into Nature-worthy publication figures',
      angle: 'Data Visualization Polish',
      cards: 6,
      card1: 'HEADING: Stop using default gray `theme_grey()`.\nCONTENT: How 6 design adjustments make your scientific figures instantly publication-grade.\nVISUAL: Side-by-side: Ugly default R plot with harsh gray background vs elegant publication figure.',
      card2: 'HEADING: The Sins of Default ggplot2\nCONTENT: Harsh gray background grid, tiny unreadable axis fonts, poor color contrast, and raw variable column names like `df_norm_tpm_v1` on axes.\nVISUAL: Annotated bad plot marking 4 visual errors in red arrows.',
      card3: 'HEADING: Fix 1: The Clean Baseline\nCONTENT: Add `theme_classic(base_size = 14)` or `theme_minimal()`. Strip away heavy distracting grids and expand font sizes for phone/paper legibility.\nVISUAL: Code snippet showing `theme_classic()` instantly cleaning up the plot canvas.',
      card4: 'HEADING: Fix 2: Jittered Points Over Boxplots\nCONTENT: Never show boxplots alone! Layer raw data points: `geom_boxplot(outlier.shape = NA) + geom_jitter(width = 0.2, alpha = 0.6)`. Shows true sample distribution.\nVISUAL: Clean boxplot showing underlying sample dots and interquartile ranges.',
      card5: 'HEADING: Fix 3: Scientific Color Palettes\nCONTENT: Ditch default neon rainbow colors! Use colorblind-friendly, accessible palettes: `scale_fill_viridis_d()` or curated academic palettes from `ggsci`.\nVISUAL: Color swatch comparison: Inaccessible rainbow palette vs Viridis / Nature publishing palette.',
      card6: 'HEADING: Save the ggplot2 Recipe\nCONTENT: Clear fonts. Jittered points. Accessible colors. Meaningful axis labels.\nSave this code template for your thesis figures.\nVISUAL: Complete copy-pasteable R ggplot2 code card with output plot graphic.',
      card7: 'N/A (6-card carousel)',
      design: 'Editorial data visualization styling, warm ivory background, refined serif headlines, clean R syntax.',
      caption: 'Default ggplot2 plots are great for exploratory analysis, but journals and thesis committees demand clarity. Jittered points, clean themes, and colorblind-safe palettes transform your figures. Save this snippet!',
      cta: 'Save this ggplot2 figure recipe.',
      hashtags: '#DataViz #ggplot2 #RStats #SciComm #ScientificFigures #ANGSUMI',
      ref: 'Wickham, ggplot2: Elegant Graphics for Data Analysis; Nature Methods Points of Significance.',
      guardrail: 'Data visualization best practice guidelines. Synthetic illustrative data values.'
    },
    {
      day: 25,
      date: '2026-11-25',
      weekday: 'Wednesday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Why You Must Set Seeds in Code',
      hook: 'Why your PCA, UMAP, and machine learning models change every time you run them',
      angle: 'Reproducibility Trap',
      cards: 6,
      card1: 'HEADING: Why did your clusters move overnight?\nCONTENT: The one-line command that stops non-deterministic chaos in computational biology.\nVISUAL: Two UMAP plots of identical data rotated and mirrored differently, creating confusion.',
      card2: 'HEADING: The Illusion of Randomness\nCONTENT: Computers cannot generate true random numbers; they use pseudo-random number generators (PRNG) starting from an initial number called a "seed".\nVISUAL: PRNG mathematical clock diagram taking an initial seed number to generate sequences.',
      card3: 'HEADING: What Happens Without a Seed?\nCONTENT: If you do not set a seed, the computer uses system clock time as the seed. Every run produces slightly different UMAP layouts, k-means clusters, and random forests!\nVISUAL: Timeline showing different clock seconds generating different cluster positions.',
      card4: 'HEADING: The Universal 1-Line Fix\nCONTENT: In R: `set.seed(42)`. In Python: `import random; random.seed(42); np.random.seed(42); torch.manual_seed(42)`.\nVISUAL: Dual language code snippet cards with seed commands prominently framed.',
      card5: 'HEADING: What Seed Setting CANNOT Fix\nCONTENT: Setting a seed ensures mathematical reproducibility, but it does NOT fix bad experimental design or underpowered sample sizes. Valid biology replicates across different seeds!\nVISUAL: Caution card distinguishing reproducible computation from biological robustness.',
      card6: 'HEADING: Seed Discipline Rulebook\nCONTENT: Set seeds at the top of every analysis script. Record seeds in paper methods. Keep science reproducible.\nSave this for your script templates.\nVISUAL: Summary reference card with best practices and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Algorithmic mathematical styling, clean ivory cards with charcoal monospace commands, subtle green checkmarks.',
      caption: 'Thesis script rerun kiya aur cluster plots rotate ho gaye? Random number generators need an explicit starting seed. Without `set.seed()`, you cannot replicate your exact figure layout next week. Save this!',
      cta: 'Save this seed setting guide.',
      hashtags: '#Reproducibility #Bioinformatics #RStats #Python #DataScience #ANGSUMI',
      ref: 'Nature Methods (2018) Enhancing reproducibility in computational science.',
      guardrail: 'Standard mathematical properties of pseudo-random generators across Python and R.'
    },
    {
      day: 26,
      date: '2026-11-26',
      weekday: 'Thursday',
      pillar: 'Coding for Researchers',
      title: 'Bash Scripting for Big Sequencing Jobs',
      hook: 'Stop running sequencing commands one by one in the terminal',
      angle: 'Workflow Automation',
      cards: 6,
      card1: 'HEADING: Sitting at your terminal for 6 hours?\nCONTENT: How to write a robust Bash loop that processes 40 FASTQ files while you sleep.\nVISUAL: Tired researcher typing commands repeatedly beside an automated terminal shell script running cleanly in background.',
      card2: 'HEADING: The Manual Command Anti-Pattern\nCONTENT: Typing `fastqc sample1.fastq`, waiting 10 minutes, then typing `fastqc sample2.fastq` wastes hours and introduces human typos in file paths.\nVISUAL: History terminal showing repetitive manual commands with typos highlighted.',
      card3: 'HEADING: The Foundational For-Loop\nCONTENT: `for file in raw_data/*.fastq.gz; do sample=$(basename "$file" .fastq.gz); echo "Processing $sample..."; fastqc "$file" -o qc_out/; done`.\nVISUAL: Code card dissecting the loop variables: `$file`, `basename`, and output directories.',
      card4: 'HEADING: Always Add `set -euo pipefail`\nCONTENT: Put `set -euo pipefail` at the top of every Bash script! It forces the script to stop immediately if any command fails or an unset variable is referenced.\nVISUAL: Guardrail shield icon over bash script header explaining the 4 flags.',
      card5: 'HEADING: Logging Output and Errors\nCONTENT: Redirect both output and errors to a dated log file: `./run_pipeline.sh > pipeline_$(date +%F).log 2>&1 &`. Keep terminal closed and monitor with `tail -f`.\nVISUAL: Diagram showing background execution with logging redirection.',
      card6: 'HEADING: Save the Bash Pipeline Template\nCONTENT: Automate repetitive tasks. Add strict error handling. Log everything.\nSave this template for your next sequencing batch.\nVISUAL: Complete production-ready bash template card with ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Terminal console aesthetic, dark charcoal code windows against ivory cards, neon green shell prompts.',
      caption: 'Har sample ke liye manually fastqc aur alignment commands type kar rahe ho? A simple 5-line Bash loop with `set -euo pipefail` runs your entire cohort automatically overnight. Save this template!',
      cta: 'Save this Bash automation script.',
      hashtags: '#Bash #Bioinformatics #Linux #HighPerformanceComputing #Automation #ANGSUMI',
      ref: 'The Linux Command Line (Shotts); Software Carpentry Shell for Scientists.',
      guardrail: 'Standard POSIX shell scripting guidelines. Educational syntax examples.'
    },
    {
      day: 27,
      date: '2026-11-27',
      weekday: 'Friday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Normalization: TMM vs DESeq2 Median of Ratios',
      hook: 'Why sequencing depth normalization is not just dividing by total reads',
      angle: 'Mathematical Mechanics',
      cards: 7,
      card1: 'HEADING: Total count normalization is mathematically broken.\nCONTENT: Why dividing by total library size fails when a few genes dominate your sample.\nVISUAL: Balance scale tipped wildly by one giant gene expression block.',
      card2: 'HEADING: The Highly Expressed Gene Trap\nCONTENT: Imagine a liver sample where Albumin consumes 50% of all sequenced reads. Other genes appear artificially suppressed just because Albumin took all the slots!\nVISUAL: Pie chart of sequencing library: Giant slice squeezing out 20 small slices.',
      card3: 'HEADING: Why Simple RPM / CPM Fails\nCONTENT: Reads Per Million (RPM) divides by total counts. But if total counts are distorted by a single massive transcript, every other gene gets false fold changes!\nVISUAL: Comparative calculation card demonstrating the mathematical distortion of RPM.',
      card4: 'HEADING: DESeq2: Median of Ratios\nCONTENT: 1. Create pseudo-reference across samples (geometric mean per gene). 2. Calculate ratio of each gene to reference. 3. Size factor = median of those ratios!\nVISUAL: Step-by-step visual calculation flow illustrating how the median ignores outliers.',
      card5: 'HEADING: edgeR: Trimmed Mean of M-values (TMM)\nCONTENT: TMM calculates log fold-changes relative to a reference sample, trims away the top/bottom 30% of extremes, and averages the remainder.\nVISUAL: Bell curve distribution showing trimmed tails and central mean calculation.',
      card6: 'HEADING: Which One Should You Use?\nCONTENT: Both DESeq2 (median of ratios) and edgeR (TMM) are robust and handle compositional bias exceptionally well. Just NEVER use raw total read scaling!\nVISUAL: High-contrast summary recommendation card in muted green.',
      card7: 'HEADING: Normalization Rulebook\nCONTENT: Effective library size must account for compositional bias, not just sequencing depth.\nSave this for your RNA-seq methods write-up.\nVISUAL: Visual summary reference with normalization comparison table and ANGSUMI footer.',
      design: 'Mathematical clarity, geometric balance graphics, warm ivory and maroon tones with precision formulas.',
      caption: 'Dividing counts by total read depth seems intuitive, but what if one single gene consumed half your sequencer? Compositional bias requires robust normalization like TMM or Median of Ratios. Here is the math.',
      cta: 'Save this normalization guide.',
      hashtags: '#Bioinformatics #Biostatistics #RNAseq #DESeq2 #edgeR #ANGSUMI',
      ref: 'Robinson & Oshlack, Genome Biology (2010) TMM; Anders & Huber, Genome Biology (2010) DESeq.',
      guardrail: 'Pedagogical comparison of Bioconductor statistical models. Illustrative numerical examples.'
    },
    {
      day: 28,
      date: '2026-11-28',
      weekday: 'Saturday',
      pillar: 'Real PhD Life',
      title: 'Defending Your PhD Proposal Without Panic',
      hook: 'What your doctoral committee is actually testing in your proposal defense',
      angle: 'Academic Milestone',
      cards: 6,
      card1: 'HEADING: Your proposal defense is not an exam.\nCONTENT: What doctoral committees look for (and the exact questions you must prepare for).\nVISUAL: Scholar standing calmly before a committee table, warm academic lighting, confidence stance.',
      card2: 'HEADING: The Real Purpose of the Defense\nCONTENT: The committee is NOT testing if you already know everything. They are testing: 1. Is this hypothesis feasible? 2. Do you have a contingency plan when experiments fail?\nVISUAL: Two question pillars: Feasibility vs Contingency Planning.',
      card3: 'HEADING: The Golden "What If" Question\nCONTENT: 90% of defense questions sound like: "What if your primary antibody doesn’t work?" or "What if sequencing depth is insufficient?" Always prepare Aim B alternatives!\nVISUAL: Decision tree branching from "Primary Plan Fails" into "Verified Alternative Protocol".',
      card4: 'HEADING: The Three Magic Words\nCONTENT: Never guess or fabricate an answer! Saying calmly: "I do not know the answer to that, but here is how I would test it..." earns committee respect instantly.\nVISUAL: Diplomatic response card with highlighted phrases for handling tough questions.',
      card5: 'HEADING: Slide Design Discipline\nCONTENT: Max 20 slides for a 30-minute talk. 1 minute per slide. Clean diagrams. Emphasize experimental controls and statistical power calculations.\nVISUAL: Slide deck counter card with timing rules and layout tips.',
      card6: 'HEADING: Save the Defense Checklist\nCONTENT: Own your hypothesis. Prepare contingency plans. Stand grounded in your science.\nSave this for your upcoming proposal defense.\nVISUAL: Summary checklist card with milestone roadmap and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Dignified academic presentation theme, warm ivory, deep maroon accents, structured checklist blocks.',
      caption: 'PhD proposal defense ke naam se darr lagta hai? Committee wants to see your thinking process and contingency plans, not perfection. Saying "I don’t know, but here is how I would test it" is completely valid. Save this guide!',
      cta: 'Save this defense preparation guide.',
      hashtags: '#PhDDefense #PhDLife #AcademicAdvice #GraduateSchool #ScholarMindset #ANGSUMI',
      ref: 'Mawson, Nature (2020) How to survive your PhD viva or defense.',
      guardrail: 'Academic mentorship and presentation strategy. General institutional milestone guidance.'
    },
    {
      day: 29,
      date: '2026-11-29',
      weekday: 'Sunday',
      pillar: 'Bioinformatics & Research Data',
      title: 'Phylogenetic Tree Rooting & Traps',
      hook: 'Why an unrooted tree is not telling you who evolved from whom',
      angle: 'Evolutionary Data Pitfall',
      cards: 7,
      card1: 'HEADING: Stop reading unrooted trees like family lineages.\nCONTENT: The critical difference between evolutionary distance and evolutionary direction.\nVISUAL: Radial unrooted phylogenetic starburst tree contrasting with a clean bifurcating rooted tree.',
      card2: 'HEADING: Distance vs Ancestry\nCONTENT: An unrooted tree specifies relationships and genetic distances between species, but CANNOT tell you which node is the common ancestor or the direction of time!\nVISUAL: Unrooted radial network with arrows showing lack of directional time arrow.',
      card3: 'HEADING: What Happens When You Root a Tree\nCONTENT: Rooting introduces a time axis (past -> present). Choosing where to place the root completely changes which organisms are classified as "sister groups"!\nVISUAL: Single unrooted tree shown with two different root placements producing opposing topologies.',
      card4: 'HEADING: Outgroup Rooting (The Standard)\nCONTENT: Add a known distant relative (outgroup) to your alignment. The root attaches naturally between the outgroup and all other taxa (ingroup).\nVISUAL: Tree diagram highlighting a distinct outgroup taxon branching off at the base.',
      card5: 'HEADING: Midpoint Rooting Trap\nCONTENT: Midpoint rooting places the root halfway between the two most distant leaves. It assumes an exact molecular clock across all lineages—often an invalid assumption!\nVISUAL: Warning callout on molecular clock rate variation among distinct clades.',
      card6: 'HEADING: Bootstrap Support Values\nCONTENT: Node numbers like "85" or "100" are bootstrap percentages. They indicate statistical support from resampling, NOT the probability that the tree is true!\nVISUAL: Annotated tree branch showing bootstrap percentages and standard interpretation.',
      card7: 'HEADING: Phylogenetics Cheat Sheet\nCONTENT: Unrooted = distance only. Rooted = evolutionary direction. Use appropriate outgroups.\nSave this for your sequence alignment analysis.\nVISUAL: Summary reference card with key tree interpretation rules and ANGSUMI footer.',
      design: 'Clean evolutionary cladogram geometry, deep maroon tree branches, warm ivory card background.',
      caption: 'Unrooted phylogenetic tree dekh ke "A evolved into B" bolna is a major rookie mistake. Unrooted trees show distance, not evolutionary direction! Here is why outgroup rooting matters before drawing conclusions.',
      cta: 'Save this phylogenetics guide.',
      hashtags: '#Evolution #Bioinformatics #Phylogenetics #Genomics #ComputationalBiology #ANGSUMI',
      ref: 'Felsenstein, Inferring Phylogenies (2004); Hall, Phylogenetic Trees Made Easy.',
      guardrail: 'Evolutionary biostatistics and phylogenetic theory. Pedagogical cladogram diagrams.'
    },
    {
      day: 30,
      date: '2026-11-30',
      weekday: 'Monday',
      pillar: 'Coding for Researchers',
      title: 'The Clean Multi-Sample Project Directory',
      hook: 'How to structure your computational thesis folder so it never becomes a messy graveyard',
      angle: 'Engineering Standard',
      cards: 6,
      card1: 'HEADING: Where did you save that filtered table?\nCONTENT: The standard directory architecture that keeps 50GB of research data clean and reproducible.\nVISUAL: Cluttered desktop folder with random files transforming into a crisp, standardized directory tree.',
      card2: 'HEADING: The "Messy Graveyard" Problem\nCONTENT: When raw sequencing data, intermediate scripts, random test plots, and final figures live in one folder, nobody can reproduce your work—including you.\nVISUAL: Warning graphic showing mixed file types overwriting each other.',
      card3: 'HEADING: The Standard 5-Folder Architecture\nCONTENT: `data/raw/` (read-only!), `data/processed/`, `src/` (scripts), `results/` (tables, logs), `docs/` (protocols, figures).\nVISUAL: Clean ASCII / graphical folder tree with color-coded directory roles.',
      card4: 'HEADING: Rule 1: Raw Data is Immutable\nCONTENT: Never edit files in `data/raw/` directly. Change permissions to read-only (`chmod -w data/raw/*`). Every intermediate table must be generated by code.\nVISUAL: Padlock icon on raw data folder with bash permission command callout.',
      card5: 'HEADING: Rule 2: Numbered Execution Scripts\nCONTENT: Prefix scripts in `src/` with execution order: `01_quality_control.sh`, `02_alignment.sh`, `03_deseq2_analysis.R`, `04_plot_figures.R`. Never guess what ran first!\nVISUAL: Ordered execution pipeline list in clean monospace font with green checkmarks.',
      card6: 'HEADING: Save the Research Directory Map\nCONTENT: Clean structure today prevents thesis panic tomorrow.\nSave this folder blueprint for your next research project.\nVISUAL: Summary reference card with complete folder tree template and ANGSUMI footer.',
      card7: 'N/A (6-card carousel)',
      design: 'Architectural filesystem blueprint styling, warm ivory background, crisp monospace directory tree.',
      caption: 'PhD research folder mein raw FASTQ, R scripts, aur PowerPoint screenshots sab ek hi jagah pade hain? A clean 5-folder architecture keeps your computation organized and publication-ready. Save this blueprint!',
      cta: 'Save this directory structure blueprint.',
      hashtags: '#Bioinformatics #DataManagement #ReproducibleResearch #Linux #PhDLife #ANGSUMI',
      ref: 'Noble, PLoS Computational Biology (2009) A quick guide to organizing computational biology projects.',
      guardrail: 'Software engineering standards for scientific research workflows.'
    }
  ];

  // Add rows to planSheet
  planData.forEach((item) => {
    planSheet.addRow(item);
  });

  // ==========================================
  // STYLING PLAN SHEET
  // ==========================================
  // Style Header Row
  const headerRow = planSheet.getRow(1);
  headerRow.height = 32;
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B1E31' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

  // Style Data Rows
  for (let r = 2; r <= planData.length + 1; r++) {
    const row = planSheet.getRow(r);
    row.height = 110; // Generous height for multi-line card descriptions
    row.alignment = { vertical: 'top', wrapText: true };

    // Zebra striping
    const isEven = r % 2 === 0;
    const bgColor = isEven ? 'FFFFFFFF' : 'FFFDF9F3';

    for (let c = 1; c <= planSheet.columns.length; c++) {
      const cell = row.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5DDD0' } },
        bottom: { style: 'thin', color: { argb: 'FFE5DDD0' } },
        left: { style: 'thin', color: { argb: 'FFE5DDD0' } },
        right: { style: 'thin', color: { argb: 'FFE5DDD0' } }
      };

      // Alignment specific to columns
      if (c === 1 || c === 8) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { bold: true, color: { argb: 'FF5B1E31' } };
      } else if (c === 2 || c === 3) {
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      } else if (c === 4) {
        // Pillar column font styling
        cell.font = { bold: true };
        if (cell.value === 'Bioinformatics & Research Data') {
          cell.font = { bold: true, color: { argb: 'FF5B1E31' } }; // Maroon
        } else if (cell.value === 'Coding for Researchers') {
          cell.font = { bold: true, color: { argb: 'FF2A5C3D' } }; // Muted Green
        } else {
          cell.font = { bold: true, color: { argb: 'FF92400E' } }; // Amber/Brown
        }
      } else if (c === 5) {
        cell.font = { bold: true, color: { argb: 'FF222222' } };
      }
    }
  }

  // ==========================================
  // SHEET 3: PILLAR METRICS & DISTRIBUTION
  // ==========================================
  const metricsSheet = workbook.addWorksheet('Pillar Metrics & Schedule', {
    views: [{ showGridLines: true }]
  });

  metricsSheet.columns = [
    { header: 'Pillar / Theme', key: 'pillar', width: 32 },
    { header: 'Planned Posts', key: 'count', width: 16 },
    { header: 'Target Split', key: 'target', width: 16 },
    { header: 'Actual Share', key: 'actual', width: 16 },
    { header: 'Strategy Alignment', key: 'strategy', width: 45 }
  ];

  metricsSheet.addRows([
    [
      'Bioinformatics & Research Data',
      15,
      '50%',
      '50.0%',
      'Authority anchor: RNA-seq, PCA, normalizations, FASTQ, VCF, single-cell, microbiome.'
    ],
    [
      'Coding for Researchers',
      9,
      '30%',
      '30.0%',
      'Utility & growth bridge: Python speedups, R tidyverse, Bash pipelines, Conda, Git.'
    ],
    [
      'Real PhD Life',
      6,
      '20%',
      '20.0%',
      'Human connection & resilience: Reviewer responses, poster design, advisor communications, imposter syndrome.'
    ],
    [
      'Total',
      30,
      '100%',
      '100.0%',
      'Complete 30-day curriculum covering all critical scientific, technical, and scholar competencies.'
    ]
  ]);

  const metricHeader = metricsSheet.getRow(1);
  metricHeader.height = 28;
  metricHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  metricHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B1E31' } };
  metricHeader.alignment = { vertical: 'middle', horizontal: 'center' };

  for (let r = 2; r <= 6; r++) {
    const row = metricsSheet.getRow(r);
    row.height = 26;
    row.alignment = { vertical: 'middle' };
    row.getCell(2).alignment = { horizontal: 'center' };
    row.getCell(3).alignment = { horizontal: 'center' };
    row.getCell(4).alignment = { horizontal: 'center' };
    if (r === 5) {
      row.font = { bold: true };
      row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF9F3' } };
    }
  }

  // Save Workbook
  const outputPath = path.resolve('/home/angsuman/extra_spac/Insta_Angsumi/outputs/carousel-plan/ANGSUMI_November_2026_Carousel_Plan.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Successfully generated: ${outputPath}`);
}

generateNovemberPlan().catch(console.error);
