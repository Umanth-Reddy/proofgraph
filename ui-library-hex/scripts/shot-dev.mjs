// Screenshot playground pages from the Vite dev server (no build needed, does not touch dist/).
// node scripts/shot-dev.mjs --ids hex,hero-waves [--skin hex] [--theme light|dark] [--w 1280] [--h 900] [--wait 1500] [--out dir]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";

const a = process.argv.slice(2);
const get = (n, d) => { const i = a.indexOf(`--${n}`); return i >= 0 ? a[i + 1] : d; };
const ids = get("ids", "hex").split(",");
const skin = get("skin", "hex"), theme = get("theme", "light"), w = +get("w", 1280), h = +get("h", 900), wait = +get("wait", 1500);
const port = +get("port", 5199), out = get("out", ".screenshots/dev");
mkdirSync(out, { recursive: true });
const chrome = ["/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find(existsSync);
const server = spawn("npx", ["vite", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], { stdio: "ignore" });
const base = `http://127.0.0.1:${port}`;
try {
  for (let i = 0; i < 120; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
  const browser = await chromium.launch({ executablePath: chrome, args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
  await ctx.addInitScript(([t, s]) => { try { localStorage.setItem("ui-theme", t); localStorage.setItem("ui-skin", s); } catch {} }, [theme, skin]);
  for (const id of ids) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.slice(0, 200)}`));
    await page.goto(`${base}/#/${id}`);
    await page.waitForSelector("main h1", { timeout: 20000 });
    await page.waitForTimeout(wait);
    const file = `${out}/${id}-${skin}-${theme}-${w}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(file, errors.length ? `ERRORS: ${errors.join(" | ")}` : "ok", over > 1 ? `overflow +${over}px` : "");
    await page.close();
  }
  await browser.close();
} finally {
  server.kill("SIGTERM");
}
