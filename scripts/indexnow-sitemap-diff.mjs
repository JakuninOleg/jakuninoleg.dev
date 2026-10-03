import { readFile, writeFile } from "node:fs/promises";

const [beforeFile, afterFile, outputFile] = process.argv.slice(2);
if (!beforeFile || !afterFile || !outputFile) {
  console.error("Usage: node scripts/indexnow-sitemap-diff.mjs before.xml after.xml output.txt");
  process.exit(1);
}

function entries(xml) {
  const result = new Map();
  for (const match of xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)) {
    const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) continue;
    const url = new URL(loc.replaceAll("&amp;", "&"));
    if (url.origin !== "https://jakuninoleg.dev") continue;
    result.set(url.href, true);
  }
  return result;
}

const before = entries(await readFile(beforeFile, "utf8"));
const after = entries(await readFile(afterFile, "utf8"));
const changed = [...after.keys()].filter((url) => !before.has(url));

await writeFile(outputFile, changed.join("\n") + (changed.length ? "\n" : ""));
console.log(changed.length ? `New URLs:\n${changed.join("\n")}` : "No new URLs in the sitemap.");
