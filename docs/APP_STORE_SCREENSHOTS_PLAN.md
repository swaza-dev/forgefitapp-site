# App Store Screenshots – Plan

Professional screenshots for the App Store. Use this plan to align on scope, then create assets.

---

## Reference example (target style)

Use the **Hevy-style** App Store listing as the visual reference:

- **Layout:** One iPhone mockup per screenshot (iPhone X/newer with notch). Light gray background so the device and text stand out.
- **Text overlay:** Large, bold headline **above** the device (e.g. “LOG WORKOUTS”, “ANALYZE YOUR WORKOUTS”). One clear message per screenshot; optional short subline (e.g. “GET STRONGER”, “STAY MOTIVATED”).
- **Count:** 5 screens in a row, each highlighting a different feature.
- **Brand:** App name (e.g. “HEVY”) can appear above one of the screens; optional “Apps We Love”–style badge on the first screenshot if applicable.

For ForgeFit: same structure—iPhone mockup, light gray background, bold text above the device explaining the feature. Screenshot 1 (hero) gets localized copy for main features; screenshots 2–6 stay in English.

---

## Decisions to lock (fill in when ready)

| Decision | Your choice | Notes |
|----------|-------------|--------|
| **Slots** | _e.g. 5 screens_ | Which screens, in which order (see §3) |
| **Device size(s)** | _e.g. 6.7" only_ | 6.7", 6.5", 5.5", or multiple |
| **Localization** | **Screenshot 1 in multiple languages** (main features); **2–6 English only** | See §6 |
| **Headlines** | _Approved list_ | Final copy per slot (see §5) |
| **Frame** | _Yes / No_ | Device frame (iPhone with island) or full-bleed screenshot |
| **Template** | _Figma / PSD / other_ | Where we build the master layout |

---

## 1. Apple’s requirements (quick reference)

| Device              | Size (portrait) | Notes                    |
|---------------------|-----------------|--------------------------|
| iPhone 6.7"         | 1290 × 2796 px  | iPhone 15 Pro Max, etc.  |
| iPhone 6.5"         | 1284 × 2778 px  | iPhone 14 Plus, etc.     |
| iPhone 5.5"         | 1242 × 2208 px  | Smaller iPhones          |
| iPad Pro 12.9" (6th)| 2048 × 2732 px  | If you support iPad      |

- **Count:** Often 3–10 screens per device size; 5–6 is common.
- **Format:** PNG or JPEG, no transparency for iPhone.
- **Content:** No external prices, “coming soon,” or misleading UI.

---

## 2. What we have today

Existing assets in the repo:

- `dashboard-screenshot.png` – 4 pillars / compliance
- `N_logging_01.png` – Natural language meal logging
- `coach-chat.png` – AI coach conversation (e.g. “Hey James!”)
- `workout-screenshot.png` – Training / exercises
- `nutrition-screenshot-1.png`, `nutrition-screenshot-2.png` – Nutrition

These can be used as **source app UI**; we still need to turn them into **App Store–ready images** (frame, copy, size).

---

## 3. Recommended screenshot “slots” (order and message)

Order matters: first 2–3 show in search and product page preview.

| # | Goal                     | Message (short)              | Suggested source asset        |
|---|--------------------------|------------------------------|-------------------------------|
| 1 | Hero / main value        | “All 4 pillars. One app.”    | Dashboard or composite        |
| 2 | Differentiation          | “Your AI coach. 24/7.”        | coach-chat.png                |
| 3 | Ease of use              | “Log meals in plain language.”| N_logging_01.png              |
| 4 | Training depth           | “52-week programs. 5,700+ exercises.” | workout-screenshot.png |
| 5 | Trust / proof (optional) | “Built for real results.” or rating | Dashboard or simple graphic |
| 6 | CTA (optional)           | “Start your plan today.”     | Simple graphic or app screen  |

You can shrink to 4 or extend to 6–8 once we lock the list.

---

## 4. Design approach (professional look)

- **Device frame:** Optional but looks pro (e.g. iPhone frame with notch/island). Can be one PSD/Figma template reused for all.
- **Background:**  
  - Solid (e.g. white, light gray, or your brand color), or  
  - Very subtle gradient/texture so the app stays the focus.
- **Copy overlay:**  
  - 1 short line per screenshot (e.g. “Track training, nutrition, sleep & hydration”).  
  - Same font and style across all (e.g. one bold headline font, one size).
- **Consistency:** Same padding, same headline position (e.g. top or bottom), same style for all 5–6 screens so it feels like one set.

### 4.1 What makes screenshots look “pro” (guidelines)

- **One clear idea per screenshot** – One headline, one main visual. No clutter.
- **Readable text** – Headlines large enough to read in the App Store preview (e.g. 44–60 pt equivalent on 6.7" canvas). High contrast (e.g. dark text on light, or light on dark).
- **Safe area** – Keep important content and text away from the very edges; Apple may crop or show in different contexts.
- **Device frame** – A clean iPhone frame (with Dynamic Island) signals “real app” and looks polished; use a standard frame asset so all screens match.
- **Same system** – Same font family, same headline position (all top or all bottom), same padding and background on every image so the set feels like one product.
- **App UI is the hero** – Overlay copy supports the screenshot; it shouldn’t cover key UI. Prefer headline above or below the device, or in a dedicated strip.
- **No misleading content** – No fake prices, “coming soon,” or UI that doesn’t match the app. Matches Apple’s review guidelines.

---

## 5. Copy (headlines) – draft

Use these as a starting point; we can refine per slot:

1. **“All 4 pillars. One app.”**  
   (or: “Training, nutrition, sleep & hydration – in one place.”)
2. **“Your AI coach. 24/7.”**  
   (or: “Ask anything. Get answers in your language.”)
3. **“Log meals in plain language.”**  
   (or: “No scanning. Just type what you ate.”)
4. **“52-week programs. 5,700+ exercises.”**  
   (or: “Plans that adapt to you.”)
5. **“Built for real results.”**  
   (or: “Less than a coffee per month.”)
6. **“Start your plan today.”**  
   (or: “Download ForgeFit.”)

Subtitle lines (if any) should be one short sentence max.

---

## 6. Localization **(decided)**

- **Screenshots 2–6:** English only. Same images for all locales.
- **Screenshot 1 (hero):** Multiple language versions. Same layout and visual (e.g. dashboard or composite); only the **headline/copy** changes per language to explain the main features of the app in that locale.

**Implications**

- **Asset count:** One English set for slots 2–6. For slot 1, one image per language (e.g. `01-hero-en.png`, `01-hero-de.png`, `01-hero-es.png`, …).
- **Copy for slot 1 per language:** Short line that explains the main features (e.g. “Training, nutrition, sleep & hydration – in one app” → translate for de, es, fr, etc.). We can reuse or adapt strings from the website i18n (e.g. `translations/*.json` home section) for consistency.
- **Which languages for slot 1:** Decide the list (e.g. en, de, es, fr, it, pt, ja, ko, zh, ru, tr to match the site, or a subset for key App Store markets).

---

## 7. Deliverables checklist (to implement)

- [ ] **Final list of slots**  
  e.g. “We want exactly these 5 screens in this order.”
- [ ] **Final headline (and optional subtitle) per slot**  
  So we don’t change copy later.
- [ ] **Device + dimensions**  
  e.g. “iPhone 6.7\" only for now” or “6.7\" + 6.5\".”
- [ ] **Localization**  
  “English only” or “English + es, de, ja” (and Option A/B/C).
- [ ] **Template**  
  One master (Figma/PSD/HTML) with: device frame, background, headline area, screenshot area.
- [ ] **Export specs**  
  Exact px dimensions and format (PNG/JPEG) per size (see below).
- [ ] **Naming**  
  e.g. `01-hero-4-pillars.png`, `02-ai-coach.png`, … (and per locale if needed).

**Export specs (reference)**

| Device | Portrait size | Format | Example filename |
|--------|----------------|--------|------------------|
| iPhone 6.7" | 1290 × 2796 px | PNG or JPEG | `01-hero-4-pillars-1290x2796.png` |
| iPhone 6.5" | 1284 × 2778 px | PNG or JPEG | `01-hero-4-pillars-1284x2778.png` |
| iPhone 5.5" | 1242 × 2208 px | PNG or JPEG | `01-hero-4-pillars-1242x2208.png` |

**Naming convention**

- **Slots 2–6 (English only):** `02-ai-coach.png`, `03-meal-logging.png`, `04-workouts.png`, `05-trust.png`, optional `06-cta.png`. Same file for all locales.
- **Slot 1 (hero, per language):** `01-hero-en.png`, `01-hero-de.png`, `01-hero-es.png`, `01-hero-fr.png`, … (one per locale). Each has the same layout; only the headline/copy changes to explain main features in that language.

---

## 8. Next steps

1. You confirm: slots (which screens, in which order), device size(s), and localization (A/B/C + languages).
2. Lock headlines (and optional subtitles) for each slot.
3. Build one template (frame + background + text area + screenshot area).
4. Generate the set (e.g. 5–6 images for 6.7") and, if needed, localized versions.
5. Add to the repo (e.g. `app-store/screenshots/`) and document in README or a short “App Store assets” doc.

If you tell me your choices (slots, device, localization, and any headline tweaks), I can turn this into a concrete asset list and, where useful, into copy-paste specs for Figma/design or for scripted generation (e.g. ImageMagick/Canvas) if you want to automate later.
