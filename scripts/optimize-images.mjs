import fs from "fs";
import path from "path";
import sharp from "sharp";

async function writeWebp(input, output, width, quality = 78) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    `${path.basename(input)} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  );
}

async function writePng(input, output, width) {
  const tmp = `${output}.tmp.png`;
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, output);
  console.log(`${path.basename(output)} resized to ${width}px`);
}

const root = process.cwd();
const mascot = path.join(root, "public", "mascot");
const projects = path.join(root, "public", "projects");

await writeWebp(path.join(mascot, "mascot-base.png"), path.join(mascot, "mascot-base.webp"), 900, 80);
await writeWebp(path.join(mascot, "mascot-stickers.png"), path.join(mascot, "mascot-stickers.webp"), 900, 78);
await writeWebp(path.join(mascot, "mascot-contact.png"), path.join(mascot, "mascot-contact.webp"), 256, 82);

const projectFiles = fs.readdirSync(projects).filter((f) => f.endsWith(".png") && f !== "sigma.png");
for (const file of projectFiles) {
  const input = path.join(projects, file);
  const output = path.join(projects, file.replace(/\.png$/i, ".webp"));
  await writeWebp(input, output, 1280, 76);
}

const apple = path.join(root, "public", "favicon", "apple-touch-icon.png");
if (fs.existsSync(apple)) {
  await writePng(apple, apple, 180);
}

console.log("done");
