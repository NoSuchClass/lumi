#!/usr/bin/env node
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 640 } });
  await page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) return route.abort();
    return route.continue();
  });
  const inFile = path.resolve(__dirname, '../assets/social-preview.html');
  const outFile = path.resolve(__dirname, '../assets/social-preview.png');
  await page.goto('file://' + inFile, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: 1280, height: 640 } });
  console.log('OK →', outFile);
  await browser.close();
})();
