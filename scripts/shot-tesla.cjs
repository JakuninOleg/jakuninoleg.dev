const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://github.com/JakuninOleg/tesla-explorer", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);
  await page.locator("button:has-text('Accept')").first().click({ timeout: 2000 }).catch(() => {});
  await page.locator("button:has-text('Got it')").first().click({ timeout: 1500 }).catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "C:/Users/olegk/code/portfolio/public/projects/tesla-explorer.png",
  });
  await browser.close();
  console.log("ok");
})();
