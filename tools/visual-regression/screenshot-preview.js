import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const htmlFile = process.argv[2] || 'outputs/previews/king-tamar-slide-12.light.html';
const output = process.argv[3] || `outputs/screenshots/${path.basename(htmlFile, '.html')}.png`;

if (!fs.existsSync(htmlFile)) {
  console.error(`HTML preview not found: ${htmlFile}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(output), { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
await page.goto(`file://${path.resolve(htmlFile)}`);
await page.locator('.slide').screenshot({ path: output });
await browser.close();

console.log(`Screenshot saved: ${output}`);
