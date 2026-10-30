// Copies images and PDFs from their working locations into public/, resizing
// raster images so the static site stays light. Re-run after a figure changes:
//   npm run assets
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import sharp from "sharp";

const HOME = homedir();
const CODE = join(HOME, "Code");
const DL = join(HOME, "Downloads");
const OUT = join(import.meta.dirname, "..", "public");

// [source, destination under public/, max width in px]. PDFs are copied as-is.
const manifest = [
  // Portrait
  [join(DL, "Media/Photos/Headshots/sid.jpg"), "images/headshot.jpg", 720],

  // Research figures
  [join(CODE, "SRIM-Analysis/srim_analysis_output/srim_analysis.png"), "figures/srim-campaigns.png", 2200],
  [join(CODE, "hBN Analysis/report_figures/grid_overview.png"), "figures/pl-map-overview.png", 1800],
  [join(CODE, "AFM-GUI/processed/2026.07.20_0/images/037_1F_Height.png"), "figures/afm-flake.png", 1000],
  [join(CODE, "PL-GUI/data/thickness_vs_color.png"), "figures/thickness-vs-color.png", 1400],
  [join(CODE, "Senior Lab/phi_vs_f_fit.png"), "figures/phase-vs-frequency.png", 1400],

  // Robotics
  [join(CODE, "VEX-SCAR-Website-1/src/assets/history/25-26.jpg"), "photos/scar-2025-26.jpg", 1600],
  [join(CODE, "VEX-SCAR-Website-1/src/assets/history/worldsbots25.jpg"), "photos/scar-worlds-2025.jpg", 1600],

  // CV and résumé
  [join(DL, "Career/Resumes/siddharthpaulresumephysics-academic.pdf"), "cv/Siddharth_Paul_CV.pdf"],
  [join(DL, "Career/Resumes/general.pdf"), "cv/Siddharth_Paul_Resume.pdf"],
];

for (const [src, dest, maxWidth] of manifest) {
  const target = join(OUT, dest);
  await mkdir(dirname(target), { recursive: true });
  if (!maxWidth) {
    await copyFile(src, target);
  } else {
    const img = sharp(src).rotate().resize({ width: maxWidth, withoutEnlargement: true });
    await (dest.endsWith(".png") ? img.png({ compressionLevel: 9, palette: true }) : img.jpeg({ quality: 82, mozjpeg: true })).toFile(target);
  }
  console.log(`✓ ${dest}`);
}

// Social share card (app/opengraph-image.png), drawn as SVG in the site's palette.
const hex = (cx, cy, r) =>
  [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
const pts = hex(1010, 315, 120);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#1f4e8c" stroke-opacity="0.08"/></pattern></defs>
  <rect width="1200" height="630" fill="#f6f4ee"/><rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="200" font-family="Consolas, monospace" font-size="22" letter-spacing="3" fill="#5c584f">RUTGERS UNIVERSITY · CLASS OF 2027</text>
  <text x="76" y="300" font-family="Georgia, serif" font-size="92" fill="#1d1c1a">Siddharth Paul</text>
  <text x="80" y="370" font-family="Georgia, serif" font-style="italic" font-size="38" fill="#5c584f">Physics, computer science, and mathematics.</text>
  <text x="80" y="520" font-family="Consolas, monospace" font-size="22" fill="#1f4e8c">sidp24.github.io</text>
  <polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#1f4e8c" stroke-width="4"/>
  ${pts.map(([x, y], i) => (i % 2 === 0 ? `<circle cx="${x}" cy="${y}" r="16" fill="#1f4e8c"/>` : `<circle cx="${x}" cy="${y}" r="14" fill="#f6f4ee" stroke="#1f4e8c" stroke-width="4"/>`)).join("")}
</svg>`;
await sharp(Buffer.from(og)).png().toFile(join(OUT, "..", "app", "opengraph-image.png"));
console.log("✓ app/opengraph-image.png");
