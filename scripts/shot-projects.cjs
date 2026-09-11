const { chromium } = require("playwright");
const path = require("path");

const out = path.join("C:/Users/olegk/code/portfolio/public/projects");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const jobs = [
    { url: "https://okhanahome.com", file: "okhana.png" },
    { url: "https://www.aokemz.ru", file: "aokemz.png" },
    { url: "https://www.sigmabrowser.com", file: "sigma.png" },
    { url: "https://github.com/JakuninOleg/Go-Ai", file: "go-ai.png" },
    { url: "https://github.com/JakuninOleg/tesla-explorer", file: "tesla-explorer.png" },
  ];

  for (const job of jobs) {
    try {
      await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2800);
      for (const t of ["Accept", "Agree", "Разрешить", "OK", "Принять", "Got it"]) {
        const b = page.getByRole("button", { name: t });
        if (await b.count()) {
          await b
            .first()
            .click({ timeout: 1000 })
            .catch(() => {});
        }
      }
      await page.screenshot({ path: path.join(out, job.file), fullPage: false });
      console.log("OK", job.file);
    } catch (e) {
      console.log("FAIL", job.file, e.message);
    }
  }

  await browser.close();
})();
