// Quality gate: opens every playground page in light+dark at 1280px and 360px.
// Fails on console errors, page errors or horizontal page overflow; saves screenshots.
// Usage: node scripts/shots.mjs --step 1 [--skin alt] [--only id,id] [--no-shots]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const step = opt("step", "adhoc");
const skin = opt("skin", "default");
const only = opt("only", "")?.split(",").filter(Boolean);
const noShots = args.includes("--no-shots");
const port = Number(opt("port", "4173"));
const base = `http://127.0.0.1:${port}`;
const outDir = `.screenshots/${step}${skin === "default" ? "" : `-${skin}`}`;
mkdirSync(outDir, { recursive: true });

const chrome = ["/usr/bin/google-chrome-stable", "/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"].find(existsSync);

const server = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], { stdio: "ignore" });
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);

async function waitUp() {
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("preview server did not start (run `npm run build` first)");
}

const IGNORE = [/favicon/i, /Download the React DevTools/i];
const failures = [];
let checked = 0;

try {
  await waitUp();
  const browser = await chromium.launch({
    executablePath: chrome,
    args: ["--no-sandbox", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
  });

  const probe = await (await browser.newContext()).newPage();
  await probe.goto(base);
  await probe.waitForSelector("a[data-page]", { state: "attached" });
  let ids = await probe.$$eval("a[data-page]", (as) => as.map((a) => a.dataset.page));
  if (only?.length) ids = ids.filter((i) => only.includes(i));
  await probe.context().close();

  for (const theme of ["light", "dark"]) {
    for (const [w, h] of [[1280, 800], [360, 740]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
      await ctx.addInitScript(([t, s]) => {
        try {
          localStorage.setItem("ui-theme", t);
          localStorage.setItem("ui-skin", s);
        } catch {}
      }, [theme, skin]);
      for (const id of ids) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          const page = await ctx.newPage();
          const problems = [];
          try {
            page.setDefaultTimeout(60000);
            page.on("console", (m) => {
              if (m.type() === "error" && !IGNORE.some((r) => r.test(m.text()))) problems.push(`console: ${m.text().slice(0, 300)}`);
            });
            page.on("pageerror", (e) => problems.push(`pageerror: ${String(e.message).slice(0, 300)}`));
            await page.goto(`${base}/#/${id}`);
            try {
              await page.waitForSelector("main h1", { timeout: 8000 });
            } catch {
              problems.push("page did not render an h1");
            }
            await page.waitForTimeout(350);
            const over = await page.evaluate(() => {
              const de = document.documentElement;
              if (de.scrollWidth <= window.innerWidth + 1) return null;
              let worst = null;
              for (const el of document.body.querySelectorAll("*")) {
                const r = el.getBoundingClientRect();
                if (r.right > window.innerWidth + 1 && r.width > 0) {
                  let p = el.parentElement, clipped = false;
                  while (p && p !== document.body) {
                    const o = getComputedStyle(p).overflowX;
                    if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") { clipped = true; break; }
                    p = p.parentElement;
                  }
                  if (!clipped) { worst = `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`; break; }
                }
              }
              return `scrollWidth ${de.scrollWidth} > ${window.innerWidth}${worst ? ` (${worst})` : ""}`;
            });
            if (over) problems.push(`horizontal overflow: ${over}`);
            if (!noShots) await page.screenshot({ path: `${outDir}/${id}-${theme}-${w}.png`, fullPage: true });
          } catch (e) {
            problems.push(`harness error (attempt ${attempt}): ${String(e.message).split("\n")[0].slice(0, 200)}`);
            if (attempt === 1) {
              await page.close().catch(() => {});
              continue; // retry once with a fresh page
            }
          }
          checked++;
          if (problems.length) failures.push({ id, theme, width: w, problems });
          await page.close().catch(() => {});
          break;
        }
      }
      await ctx.close();
    }
  }
  await browser.close();
} finally {
  stop();
}

writeFileSync(`${outDir}/report.json`, JSON.stringify({ checked, failures }, null, 2));
console.log(`checked ${checked} page renders, ${failures.length} with problems (skin=${skin})`);
for (const f of failures) console.log(`- ${f.id} [${f.theme} ${f.width}px]: ${f.problems.join(" | ")}`);
process.exit(failures.length ? 1 : 0);
