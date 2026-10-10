# High-Retention Motion Graphics Playbook (Science & Coding Reels)

## 1. Timing Breakdown for 25-Second Reels

| Time Window | Reel Phase | Psychological Goal | Visual Movement |
| :--- | :--- | :--- | :--- |
| **0.0s – 2.0s** | **Visual Hook** | Stop the infinite scroll immediately | Large, high-contrast dynamic motion (rotating 3D helix, sudden scale shift). Text: 1 bold question. |
| **2.0s – 6.0s** | **Core Problem / Curiosity Gap** | Anchor the viewer's attention | Camera zooms into the microscopic detail (e.g., A, T, G, C letters). |
| **6.0s – 16.0s** | **The Mechanism (Step-by-Step)** | Deliver high value with zero fluff | Progressive animation (DNA unzipping → mRNA translation → codon reading). |
| **16.0s – 22.0s** | **The Payoff / Climax** | Provide the "Aha!" revelation | Secondary structure folding into a functional 3D protein. |
| **22.0s – 25.0s** | **Seamless Loop Transition** | Drive repeated views (130%+ loop rate) | Camera dollies through the protein back to the identical initial DNA helix frame. |

---

## 2. Safe-Zone Template (1080 × 1920)

```
0px ───────────────────────────────────────────── Top of Screen
     [ TOP 280px: PLATFORM HEADER / SEARCH BAR ]
280px ────────────────────────────────────────────
     │                                     │
     │      PRIMARY CONTENT & VISUALS      │
     │       (100px margin left/right)     │ [ RIGHT 160px: ]
     │                                     │ [ LIKE / SHARE ]
     │                                     │ [ COMMENT      ]
     │          KINETIC SUBTITLES          │ [ AUDIO ICON   ]
     │       (y: 1200px to 1450px)         │
     │                                     │
1540px ───────────────────────────────────────────
     [ BOTTOM 380px: CAPTION, USERNAME, SOUND TRACK ]
1920px ────────────────────────────────────────── Bottom of Screen
```

---

## 3. Kinetic Subtitle Style Guide

- **Font**: Space Grotesk Bold or Inter ExtraBold.
- **Size**: 54px to 68px.
- **Case**: Uppercase with tight tracking (`letter-spacing: -0.02em`).
- **Highlight Technique**: Render words in muted ivory (`#F5F0E8`), with the currently spoken keyword popping in vibrant emerald (`#10B981`) or cyan (`#00F0FF`) with a subtle drop shadow or badge background.
- **Pacing**: Display 2 to 4 words at a time. Never dump two-line paragraphs on screen at once.

---

## 4. Audio Ducking Matrix

- **Voiceover**: Normalized to `-1.0 dBFS` peak.
- **Background Music**: Set to `-18 dBFS` to `-22 dBFS` during speech.
- **Sound Effects (SFX)**:
  - Whoosh (scene transitions): `-6 dBFS`
  - Pop / Click (label reveals): `-8 dBFS`
  - Deep Sub-Bass Thud (loop drop or climax): `-4 dBFS`
