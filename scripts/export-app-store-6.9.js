#!/usr/bin/env node
/**
 * Export App Store screens at 6.9" display size (1320×2868 px).
 * Run from project root: node scripts/export-app-store-6.9.js
 * Requires: npm install puppeteer (or npx puppeteer)
 */
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PREVIEW_DIR = path.join(PROJECT_ROOT, 'app-store-preview');
const OUTPUT_DIR = path.join(PREVIEW_DIR, '6.9');
const WIDTH = 1320;
const HEIGHT = 2868;

const SCREENS = [
  { id: 'screen-1', file: '01-track-4-pillars.png' },
  { id: 'screen-2', file: '02-log-naturally.png' },
  { id: 'screen-3', file: '03-ai-coach.png' },
  { id: 'screen-4', file: '04-training-system.png' },
];

async function main() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (_) {
    console.error('Puppeteer not found. Run: npm install puppeteer');
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const htmlPath = path.join(PREVIEW_DIR, 'index.html');
  const fileUrl = pathToFileURL(htmlPath).href;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 10000 });

    for (const { id, file } of SCREENS) {
      const el = await page.$(`#${id}`);
      if (!el) {
        console.warn('Element not found:', id);
        continue;
      }
      const outPath = path.join(OUTPUT_DIR, file);
      await el.screenshot({ path: outPath, type: 'png' });
      console.log('Saved:', path.relative(PROJECT_ROOT, outPath));
    }

    console.log('Done. Screenshots in app-store-preview/6.9/');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
