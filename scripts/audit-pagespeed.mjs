import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const origin = (process.env.PAGESPEED_URL || "http://localhost:3000").replace(/\/$/, "");
const output = "seo/pagespeed/results-mobile.json";
const requestedPaths = process.argv.slice(2);
const sitemap = requestedPaths.length ? "" : await (await fetch(`${origin}/sitemap.xml`)).text();
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  new URL(match[1].replaceAll("&amp;", "&")).pathname,
);
const paths = [...new Set(requestedPaths.length ? requestedPaths : sitemapPaths)];

if (!paths.length) throw new Error("No pages found. Check the site URL and sitemap.");
await mkdir("seo/pagespeed", { recursive: true });

const chrome = await launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  logLevel: "error",
});
const results = [];
let failed = false;

try {
  for (const [index, path] of paths.entries()) {
    try {
      const { lhr } = await lighthouse(`${origin}${path}`, {
        port: chrome.port,
        onlyCategories: ["performance"],
        logLevel: "error",
      });
      const result = {
        path,
        score: Math.round((lhr.categories.performance?.score ?? 0) * 100),
        lcpMs: Math.round(lhr.audits["largest-contentful-paint"]?.numericValue ?? 0),
        cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? 0,
        tbtMs: Math.round(lhr.audits["total-blocking-time"]?.numericValue ?? 0),
        error: lhr.runtimeError?.message,
      };
      results.push(result);
      if (result.error || result.score < 90) failed = true;
      console.log(`${index + 1}/${paths.length} ${result.score} ${path}`);
    } catch (error) {
      failed = true;
      results.push({ path, error: String(error) });
      console.error(`${index + 1}/${paths.length} ERROR ${path}: ${error}`);
    }
    await writeFile(output, JSON.stringify(results, null, 2));
  }
} finally {
  try {
    await chrome.kill();
  } catch (error) {
    // Chrome may keep its temporary profile locked briefly on Windows.
    if (!/EPERM|EBUSY/.test(String(error))) console.error(`Chrome cleanup: ${error}`);
  }
}

console.log(`\n${results.filter((result) => result.score >= 90).length}/${paths.length} pages scored 90–100. Report: ${output}`);
// Chrome can keep a Windows file handle alive after chrome.kill() rejects.
process.exit(failed ? 1 : 0);
