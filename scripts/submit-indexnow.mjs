import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const origin = "https://jakuninoleg.dev";
const keyFile = "fee3f75e73ab4403af79cbad0997e7bc.txt";
const key = (await readFile(fileURLToPath(new URL(`../public/${keyFile}`, import.meta.url)), "utf8")).trim();
const keyUrl = `${origin}/${keyFile}`;
const dryRun = process.argv.includes("--dry-run");
const input = process.argv.slice(2).filter((item) => item !== "--dry-run");

if (!/^[a-zA-Z0-9-]{8,128}$/.test(key) || `${key}.txt` !== keyFile) {
  throw new Error("The IndexNow key file is invalid.");
}
if (input.length === 0) {
  console.error("Usage: npm run indexnow -- /ru/blog/example [/en/blog/example] [--dry-run]");
  process.exit(1);
}

const urls = [...new Set(input.map((item) => {
  const url = new URL(item, origin);
  if (url.origin !== origin || !/^\/(ru|en)(\/|$)/.test(url.pathname) || url.search || url.hash) {
    throw new Error(`Only canonical /ru or /en URLs on ${origin} are allowed: ${item}`);
  }
  return url.href;
}))];

console.log(`IndexNow URLs:\n${urls.join("\n")}`);
if (dryRun) process.exit(0);

const keyResponse = await fetch(keyUrl, { signal: AbortSignal.timeout(15_000) });
if (!keyResponse.ok || keyResponse.url !== keyUrl || (await keyResponse.text()).trim() !== key) {
  throw new Error(`The deployed IndexNow key is not available at ${keyUrl}. Wait for deployment.`);
}

for (const url of urls) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok || response.url !== url) {
    throw new Error(`${url} is not published at its canonical URL yet (HTTP ${response.status}).`);
  }
  const html = await response.text();
  if (response.headers.get("x-robots-tag")?.includes("noindex") ||
      /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    throw new Error(`${url} is marked noindex; it was not submitted.`);
  }
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(origin).host, key, keyLocation: keyUrl, urlList: urls }),
  signal: AbortSignal.timeout(15_000),
});
if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
}
console.log(response.status === 202 ? "IndexNow received the URLs; key verification is pending." : "IndexNow received the URLs.");
