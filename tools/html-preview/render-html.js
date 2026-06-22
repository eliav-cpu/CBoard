import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2] || 'examples/slides/king-tamar-slide-12.light.json';
const output = process.argv[3] || `outputs/previews/${path.basename(input, '.json')}.html`;
const slide = JSON.parse(fs.readFileSync(input, 'utf8'));

const isDark = slide.colorway === 'dark';
const colors = {
  navy: '#0F1E3A',
  deepBlue: '#2F63C8',
  ctaBlue: '#4D8DF7',
  white: '#FFFFFF',
  cloud: '#FAFAFB',
  mist: '#F3F4F6',
  graphite: '#111827',
  steel: '#6B7280',
  champagne: '#D6C7A1'
};

const theme = {
  bg: isDark ? colors.navy : colors.cloud,
  panel: isDark ? colors.graphite : colors.white,
  text: isDark ? colors.white : colors.navy,
  muted: isDark ? '#CBD5E1' : colors.steel,
  card: isDark ? '#0B172E' : colors.white,
  visual: isDark ? '#071223' : '#E5E7EB',
  border: isDark ? '#26344F' : '#E5E7EB'
};

const esc = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const cards = (slide.cards || []).map(card => `
  <section class="card">
    <h2>${esc(card.title)}</h2>
    <p>${esc(card.body)}</p>
  </section>
`).join('\n');

const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(slide.headline)}</title>
  <style>
    :root {
      --bg: ${theme.bg};
      --panel: ${theme.panel};
      --text: ${theme.text};
      --muted: ${theme.muted};
      --card: ${theme.card};
      --visual: ${theme.visual};
      --border: ${theme.border};
      --champagne: ${colors.champagne};
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #0b1020;
      font-family: Heebo, Arial, sans-serif;
    }
    .slide {
      width: 1280px;
      height: 720px;
      direction: rtl;
      background: var(--bg);
      display: grid;
      grid-template-columns: 43% 57%;
      gap: 24px;
      padding: 34px;
      color: var(--text);
      overflow: hidden;
    }
    .visual-zone {
      border-radius: 18px;
      background: var(--visual);
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      color: var(--muted);
      font-size: 24px;
      letter-spacing: 0;
    }
    .content-panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 34px 38px 28px 38px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: right;
    }
    h1 {
      margin: 0;
      font-size: 42px;
      line-height: 1.12;
      font-weight: 800;
      color: var(--text);
      text-align: right;
    }
    .subtitle {
      margin: 14px 0 26px 0;
      font-size: 23px;
      line-height: 1.35;
      color: var(--muted);
      text-align: right;
    }
    .cards {
      display: grid;
      gap: 14px;
    }
    .card {
      background: var(--card);
      border: 1px solid color-mix(in srgb, var(--champagne) 60%, transparent);
      border-radius: 14px;
      padding: 16px 20px;
      min-height: 95px;
      text-align: right;
    }
    .card h2 {
      margin: 0 0 8px 0;
      font-size: 22px;
      line-height: 1.1;
      color: var(--text);
    }
    .card p {
      margin: 0;
      font-size: 18px;
      line-height: 1.35;
      color: var(--muted);
    }
    .message {
      margin-top: auto;
      border-top: 1px solid var(--champagne);
      padding-top: 16px;
      font-size: 18px;
      line-height: 1.35;
      color: var(--text);
      text-align: right;
    }
  </style>
</head>
<body>
  <main class="slide" data-slide-id="${esc(slide.slide_id)}" data-colorway="${esc(slide.colorway)}">
    <aside class="visual-zone">אזור תמונת מגדל / ויזואל</aside>
    <section class="content-panel">
      <h1>${esc(slide.headline)}</h1>
      <p class="subtitle">${esc(slide.subtitle)}</p>
      <div class="cards">${cards}</div>
      ${slide.message_line ? `<div class="message">${esc(slide.message_line)}</div>` : ''}
    </section>
  </main>
</body>
</html>`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html, 'utf8');
console.log(`Rendered HTML preview: ${output}`);
