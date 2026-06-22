import fs from 'node:fs';

const files = process.argv.slice(2);
const targets = files.length ? files : [
  'outputs/previews/king-tamar-slide-12.light.html',
  'outputs/previews/king-tamar-slide-12.dark.html'
];

const errors = [];

for (const file of targets) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing HTML preview: ${file}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('dir="rtl"')) errors.push(`${file}: missing dir=rtl`);
  if (!html.includes('direction: rtl')) errors.push(`${file}: missing CSS direction rtl`);
  if (!html.includes('text-align: right')) errors.push(`${file}: missing right alignment`);
  if (!html.includes('font-family: Heebo')) errors.push(`${file}: missing Heebo font family`);
  if ((html.match(/class="card"/g) || []).length > 4) errors.push(`${file}: more than 4 cards`);
  if (html.includes('תשואה מובטחת') || html.includes('ללא סיכון') || html.includes('רווח בטוח')) {
    errors.push(`${file}: forbidden commercial phrase found`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ pass: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ pass: true, checked: targets }, null, 2));
