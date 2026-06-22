import fs from 'node:fs';
import path from 'node:path';
import pptxgen from 'pptxgenjs';

const input = process.argv[2] || 'examples/slides/king-tamar-slide-12.light.json';
const output = process.argv[3] || `outputs/slides/${path.basename(input, '.json')}.pptx`;
const slideData = JSON.parse(fs.readFileSync(input, 'utf8'));

const COLORS = {
  navy: '0F1E3A',
  deepBlue: '2F63C8',
  ctaBlue: '4D8DF7',
  white: 'FFFFFF',
  cloud: 'FAFAFB',
  mist: 'F3F4F6',
  graphite: '111827',
  steel: '6B7280',
  champagne: 'D6C7A1'
};

const isDark = slideData.colorway === 'dark';
const bg = isDark ? COLORS.navy : COLORS.cloud;
const panel = isDark ? COLORS.graphite : COLORS.white;
const text = isDark ? COLORS.white : COLORS.navy;
const muted = isDark ? 'CBD5E1' : COLORS.steel;
const accent = COLORS.champagne;

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'PRIME Invest';
pptx.subject = 'King Tamar controlled slide render';
pptx.title = slideData.headline;
pptx.company = 'PRIME Invest';
pptx.lang = 'he-IL';
pptx.theme = {
  headFontFace: 'Heebo',
  bodyFontFace: 'Heebo',
  lang: 'he-IL'
};
pptx.defineLayout({ name: 'PRIME_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'PRIME_WIDE';

const s = pptx.addSlide();
s.background = { color: bg };

// Left visual zone placeholder. Replace with project image when available.
s.addShape(pptx.ShapeType.rect, {
  x: 0.35,
  y: 0.35,
  w: 5.45,
  h: 6.8,
  fill: { color: isDark ? '071223' : 'E5E7EB' },
  line: { color: isDark ? '1F2937' : 'D1D5DB', transparency: 35 }
});
s.addText('אזור תמונת מגדל / ויזואל', {
  x: 0.75,
  y: 3.35,
  w: 4.65,
  h: 0.35,
  fontFace: 'Heebo',
  fontSize: 16,
  color: muted,
  align: 'center',
  margin: 0.03
});

// Right content panel.
s.addShape(pptx.ShapeType.roundRect, {
  x: 6.05,
  y: 0.35,
  w: 6.9,
  h: 6.8,
  rectRadius: 0.08,
  fill: { color: panel },
  line: { color: isDark ? '26344F' : 'E5E7EB', transparency: 15 }
});

s.addText(slideData.headline, {
  x: 6.45,
  y: 0.75,
  w: 6.05,
  h: 0.72,
  fontFace: 'Heebo',
  bold: true,
  fontSize: 28,
  color: text,
  align: 'right',
  valign: 'mid',
  fit: 'shrink',
  margin: 0.02,
  breakLine: false
});

s.addText(slideData.subtitle || '', {
  x: 6.45,
  y: 1.48,
  w: 6.05,
  h: 0.45,
  fontFace: 'Heebo',
  fontSize: 15,
  color: muted,
  align: 'right',
  fit: 'shrink',
  margin: 0.02
});

let y = 2.18;
for (const card of slideData.cards || []) {
  s.addShape(pptx.ShapeType.roundRect, {
    x: 6.45,
    y,
    w: 6.05,
    h: 1.02,
    rectRadius: 0.08,
    fill: { color: isDark ? '0B172E' : 'FFFFFF' },
    line: { color: accent, transparency: 35 }
  });
  s.addText(card.title, {
    x: 10.18,
    y: y + 0.15,
    w: 2.05,
    h: 0.28,
    fontFace: 'Heebo',
    bold: true,
    fontSize: 15,
    color: text,
    align: 'right',
    margin: 0.02
  });
  s.addText(card.body, {
    x: 6.7,
    y: y + 0.48,
    w: 5.5,
    h: 0.34,
    fontFace: 'Heebo',
    fontSize: 12.5,
    color: muted,
    align: 'right',
    fit: 'shrink',
    margin: 0.02
  });
  y += 1.18;
}

if (slideData.message_line) {
  s.addShape(pptx.ShapeType.line, {
    x: 6.45,
    y: 6.42,
    w: 6.05,
    h: 0,
    line: { color: accent, transparency: 15, width: 1 }
  });
  s.addText(slideData.message_line, {
    x: 6.45,
    y: 6.55,
    w: 6.05,
    h: 0.36,
    fontFace: 'Heebo',
    fontSize: 12.2,
    color: text,
    align: 'right',
    fit: 'shrink',
    margin: 0.02
  });
}

fs.mkdirSync(path.dirname(output), { recursive: true });
await pptx.writeFile({ fileName: output });
console.log(`Rendered ${output}`);
