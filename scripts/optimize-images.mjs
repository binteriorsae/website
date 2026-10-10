// Makes web-sized copies of every photo uploaded through the CMS.
// Phone photos can be 5-10 MB; visitors get 600/1200/1800px WebP versions instead.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/uploads';
const OUT = 'public/uploads/_opt';
const SIZES = [600, 1200, 1800];

if (!fs.existsSync(SRC)) { console.log('No uploads folder yet, nothing to optimise.'); process.exit(0); }
fs.mkdirSync(OUT, { recursive: true });

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) return p === OUT ? [] : walk(p);
  return /\.(jpe?g|png|webp)$/i.test(e.name) ? [p] : [];
});

let made = 0;
for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\.[^.]+$/, '');
  for (const w of SIZES) {
    const out = path.join(OUT, `${rel}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    made++;
  }
}
console.log(`Image optimisation done (${made} new file${made === 1 ? '' : 's'}).`);
