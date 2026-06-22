import fs from 'node:fs';

const file = process.argv[2] || 'examples/slides/king-tamar-slide-12.light.json';
const slide = JSON.parse(fs.readFileSync(file, 'utf8'));

const forbiddenCommercial = [
  'תשואה מובטחת',
  'עליית ערך ודאית',
  'ללא סיכון',
  'רווח בטוח',
  'כסף קל',
  'הגנה מלאה',
  'כולם קונים',
  'הזדמנות שלא תחזור'
];

const forbiddenStyle = [
  'פוזיציה',
  'סקייל',
  'סטייל',
  'מיקרו־לוקיישן',
  'מיקרו-לוקיישן',
  'מערכת החלטה'
];

const negativeOpenings = ['לא עוד', 'לא רק', 'לא מתחילים', 'לא קונים'];
const allTexts = [
  slide.headline,
  slide.subtitle,
  slide.message_line,
  ...(slide.cards || []).flatMap(card => [card.title, card.body])
].filter(Boolean);

function containsHebrew(text) {
  return /[\u0590-\u05FF]/.test(text);
}

function startsWithForbiddenNegative(text) {
  return negativeOpenings.some(prefix => String(text).trim().startsWith(prefix));
}

const errors = [];
const warnings = [];

if (slide.source_layer === 'Sales Playbook V6') {
  errors.push('Client slide cannot use Sales Playbook V6 as source layer.');
}

if (!slide.qa?.rtl) errors.push('RTL QA flag is false or missing.');
if (!slide.qa?.no_invented_data) errors.push('No-invented-data QA flag is false or missing.');
if (!slide.qa?.no_guarantees) errors.push('No-guarantees QA flag is false or missing.');
if (!slide.qa?.client_screen_only) errors.push('Client-screen-only QA flag is false or missing.');

if (!containsHebrew(slide.headline || '')) {
  warnings.push('Headline does not contain Hebrew letters.');
}

if ((slide.headline || '').length > 80) {
  errors.push('Headline is too long for screen use.');
}

if (startsWithForbiddenNegative(slide.headline || '')) {
  errors.push('Headline starts with a forbidden negative opening.');
}

if ((slide.cards || []).length > 4) {
  errors.push('Too many cards. Maximum is 4.');
}

for (const text of allTexts) {
  for (const phrase of forbiddenCommercial) {
    if (text.includes(phrase)) errors.push(`Forbidden commercial phrase: ${phrase}`);
  }
  for (const phrase of forbiddenStyle) {
    if (text.includes(phrase)) warnings.push(`Heavy style phrase detected: ${phrase}`);
  }
  if (text.includes('דורש אימות') && !slide.source_flags?.length) {
    warnings.push('Text contains דורש אימות but source_flags are empty.');
  }
}

const score = Math.max(0, 100 - errors.length * 25 - warnings.length * 5);

const result = {
  file,
  pass: errors.length === 0,
  score,
  errors,
  warnings
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) process.exit(1);
