// Open a playground page, optionally click things, screenshot the viewport.
// node scripts/peek.mjs --id dialog --scope dark --click "button:has-text('md dialog')" [--click ...] [--w 1280] [--h 800] [--theme dark] [--skin alt] [--out name] [--full]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";

const a = process.argv.slice(2);
const get = (n, d) => { const i = a.indexOf(`--${n}`); return i >= 0 ? a[i + 1] : d; };
const all = (n) => a.flatMap((x, i) => (x === `--${n}` ? [a[i + 1]] : []));
const id = get("id"), scope = get("scope", "light"), w = +get("w", 1280), h = +get("h", 800), theme = get("theme", "light"), skin = get("skin", "default");
const out = get("out", `${id}-${scope}`), port = +get("port", 4174), full = a.includes("--full");
mkdirSync(".screenshots/peek", { recursive: true });
const chrome = ["/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find(existsSync);
const server = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], { stdio: "ignore" });
try {
  for (let i = 0; i < 80; i++) { try { if ((await fetch(`http://127.0.0.1:${port}`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
  const browser = await chromium.launch({ executablePath: chrome, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
  await ctx.addInitScript(([t, s]) => { try { localStorage.setItem("ui-theme", t); if (s !== "default") localStorage.setItem("ui-skin", s); } catch {} }, [theme, skin]);
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.log("console error:", m.text().slice(0, 200)); });
  await page.goto(`http://127.0.0.1:${port}/#/${id}`);
  await page.waitForSelector("main h1");
  await page.waitForTimeout(+get("wait", 0));
  const root = page.locator(`[data-matrix="${scope}"]`).first();
  for (const sel of all("click")) {
    const base = (await root.count()) ? root : page.locator("main");
    await base.locator(sel).first().click();
    await page.waitForTimeout(450);
  }
  for (const k of all("press")) { await page.keyboard.press(k); await page.waitForTimeout(350); }
  const el = get("el");
  if (el) await page.locator(el).first().screenshot({ path: `.screenshots/peek/${out}.png` });
  else await page.screenshot({ path: `.screenshots/peek/${out}.png`, fullPage: full });
  console.log(`.screenshots/peek/${out}.png`);
  await browser.close();
} finally { server.kill("SIGTERM"); }
