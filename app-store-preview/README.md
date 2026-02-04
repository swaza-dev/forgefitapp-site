# App Store 6.9" Screenshots

Apple **6.9" display** (iPhone 6.5", 6.7" or 6.9"). Accepted sizes per Apple:

| Orientation | Dimensions (px) |
|-------------|-----------------|
| Portrait    | **1320 × 2868** · 1290 × 2796 · 1260 × 2736 |
| Landscape   | 2868 × 1320 · 2796 × 1290 · 2736 × 1260     |

We use **1320 × 2868** (portrait) per screenshot.

## Design

- Same cool background as the main site: dark theme, gradient orbs, noise overlay, Inter font.
- Nike / Daily Burn–style: one bold headline + short subline above the device; one message per screenshot.
- iPhone frame with Dynamic Island; app screens from `screenshots/` (and `../coach-chat.png` for AI coach).

## Screens (order)

| # | File (export)           | Message |
|---|-------------------------|--------|
| 1 | `01-hero-4-pillars.png`  | Hero – app intro / video frame; “All 4 pillars. One app.” |
| 2 | `02-track-4-pillars.png`| “Track training, nutrition, sleep & hydration.” |
| 3 | `03-log-naturally.png`  | “Log meals in plain language.” |
| 4 | `04-ai-coach.png`       | “Your AI coach. 24/7.” |
| 5 | `05-training-system.png`| “52-week programs. 5,700+ exercises.” |

## Source images

- **Screen 1:** `screenshots/Video-image01.PNG` (hero app-started video image).
- **Screen 2:** `screenshots/Home-02.PNG`.
- **Screen 3:** `screenshots/Nutrition-01.PNG`.
- **Screen 4:** `../coach-chat.png` (site root).
- **Screen 5:** `screenshots/Workouts-01.PNG`.

To swap assets, edit `index.html` and change the `src` in each `.phone__screen img`.

## Export to PNG (6.9")

From **project root** (forgefitapp-site):

```bash
node scripts/export-app-store-6.9.js
```

Requires: `npm install puppeteer` (or `npx puppeteer`).

Output: `app-store-preview/6.9/01-hero-4-pillars.png` … `05-training-system.png` at **1320 × 2868 px**.

## Preview

Open `app-store-preview/index.html` in a browser. At viewports &lt; 1320px it scales; at 1320px+ each section is exactly 1320 × 2868.
