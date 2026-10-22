// After the build: remove the original photos from the published site.
// Pages only use the resized WebP copies in uploads/_opt, so the 5-15 MB originals
// would just make every deploy slower (and risk GitHub Pages' 1 GB site limit).
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'dist/uploads';
if (!fs.existsSync(DIR)) process.exit(0);

let removed = 0, bytes = 0;
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '_opt') walk(p); continue; }
    if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) { bytes += fs.statSync(p).size; fs.unlinkSync(p); removed++; }
  }
};
walk(DIR);
console.log(`Removed ${removed} original photo(s) from the published site (${(bytes / 1048576).toFixed(0)} MB).`);
