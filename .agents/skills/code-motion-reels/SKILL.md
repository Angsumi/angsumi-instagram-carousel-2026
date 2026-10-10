---
name: code-motion-reels
description: >-
  Master framework and production-ready rendering pipeline for generating viral, high-retention
  motion graphics, 3D scientific explainers, kinetic typography, and Reels/Shorts with code
  (HTML5/Canvas2D/Three.js, Puppeteer, FFmpeg, and audio synthesis).
  Use whenever creating, scripting, animating, or rendering programmatic vertical videos (1080x1920),
  scientific motion graphics, title cards, or Remotion/Canvas/Puppeteer video pipelines.
---

# Code-Driven Viral Motion Graphics & Reels Engine

A complete engineering standard for generating studio-grade, 60fps/30fps vertical motion graphics (1080x1920) entirely from code using Puppeteer, Canvas2D / Three.js, and FFmpeg.

---

## 1. Core Architecture & Philosophy

Programmatic video rendering eliminates screen recorder stutter, dropped frames, and resolution scaling issues by enforcing **deterministic frame-by-frame rendering**:

```
[HTML5 Scene: Three.js / Canvas2D / DOM]
                 │
                 ▼ window.seekFrame(frame, totalFrames, timeSec)
[Puppeteer Headless Chrome (1080x1920)]
                 │
                 ▼ Raw PNG Buffer Stream (image2pipe)
[FFmpeg Pipe Encoder (H.264 / yuv420p / AAC / 1080x1920)]
                 │
                 ▼
[Production-Ready MP4 Video with Audio & Loop]
```

### The 4 Viral Retention Rules
1. **0–2s Visual Hook**: Start directly with the dynamic visual phenomenon (e.g. 3D DNA twisting into camera) and a single high-curiosity question. Never start with a static slide or generic intro.
2. **Safe Zones (9:16 Vertical)**:
   - **Top 15% (0–280px)**: Reserved for platform header/search.
   - **Bottom 20% (1540–1920px)**: Reserved for platform caption, audio tag, account name.
   - **Right 15% (920–1080px)**: Reserved for like, comment, share, remix icons.
   - **Action Safe Zone**: Keep core visual focal points and subtitles centered within `x: 100..980px`, `y: 350..1500px`.
3. **Kinetic Typography**: Display 3–6 words at a time with active keyword highlights (e.g., contrasting glowing color on verbs and key nouns) timed to narration.
4. **Seamless Infinite Loop**: The final 0.5s of the animation must smoothly transition back to the exact initial camera/particle state of Frame 0, driving 130%+ loop retention rates.

---

## 2. Directory Structure

A standardized motion-engine project is structured as follows:

```text
motion-engine/
├── package.json               # type: "module", puppeteer, three, canvas
├── fonts/                     # SpaceGrotesk.ttf, Inter.ttf (WOFF2/TTF)
├── engine/
│   ├── renderer.js            # Frame-by-frame Puppeteer -> FFmpeg pipe runner
│   ├── preview.js             # Fast 3-frame still inspector (0%, 50%, 100%)
│   └── voiceover.js           # Audio synthesis & duration calculator
├── templates/
│   ├── dna-storage/           # 3D Three.js science explainer template
│   ├── kinetic-type/          # Editorial kinetic typography template
│   └── chart-explainer/       # Animated research data/PCA plot template
└── outputs/                   # Rendered MP4 reels and preview stills
```

---

## 3. Step-by-Step Production Runbook

### Step 1: Initialize the Project & Install Dependencies
Run inside the project root:
```bash
npm init -y
npm pkg set type=module
npm install puppeteer three
```

Ensure system dependencies exist:
- `node` (v20+)
- `ffmpeg` (with `libx264` support)
- `google-chrome` or Chromium

### Step 2: Implement Deterministic Scene State (`scene.html`)
The HTML page must expose `window.seekFrame(frameIndex, totalFrames, timeInSeconds)`. The animation **must not** rely on `requestAnimationFrame` or `Date.now()` during rendering.

Example:
```javascript
window.seekFrame = (frame, totalFrames, time) => {
  const progress = frame / totalFrames; // 0.0 to 1.0
  updateScene(progress, time);
  renderer.render(scene, camera);
};
```

### Step 3: Run Fast Keyframe Preview
Before rendering hundreds of frames, verify layout, safe zones, and text legibility across 3 key timestamps:
```bash
node engine/preview.js --scene templates/dna-storage/index.html
```
Check the generated stills (`outputs/preview_00.png`, `preview_50.png`, `preview_99.png`).

### Step 4: Render Production MP4
Run the pipe renderer:
```bash
node engine/renderer.js \
  --scene templates/dna-storage/index.html \
  --output outputs/dna_explainer_reel.mp4 \
  --fps 30 \
  --duration 25 \
  --width 1080 \
  --height 1920
```

### Step 5: High-Quality FFmpeg Encoding Flags
The renderer pipes raw frames directly into FFmpeg with these parameters for maximum mobile device compatibility and instant playback:
```bash
ffmpeg -y -f image2pipe -vcodec png -r 30 -i - \
  -c:v libx264 \
  -profile:v high \
  -level 4.2 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  output.mp4
```

---

## 4. Script Reference & Automation
See [scripts/renderer.js](./scripts/renderer.js) for the complete, zero-drop frame streaming engine with real-time CLI progress bar and automated audio multiplexing.
