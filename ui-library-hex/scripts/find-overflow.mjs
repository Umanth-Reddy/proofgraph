// node scripts/find-overflow.mjs --id hex [--w 360] : lists the elements that stick out past the viewport (dev server).
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
const a = process.argv.slice(2);
const get = (n, d) => { const i = a.indexOf(`--${n}`); return i >= 0 ? a[i + 1] : d; };
const id = get("id", "hex"), w = +get("w", 360), port = 5198;
const server = spawn("npx", ["vite", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], { stdio: "ignore" });
try {
  for (let i = 0; i < 120; i++) { try { if ((await fetch(`http://127.0.0.1:${port}`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
  const browser = await chromium.launch({ executablePath: ["/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find(existsSync), args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: w, height: 740 } });
  await ctx.addInitScript(() => { try { localStorage.setItem("ui-skin", "hex"); } catch {} });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${port}/#/${id}`);
  await page.waitForSelector("main h1");
  await page.waitForTimeout(2000);
  const rows = await page.evaluate(() => {
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > window.innerWidth + 1) {
        let p = el.parentElement, clipped = false;
        while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== "visible") { clipped = true; break; } p = p.parentElement; }
        if (!clipped) out.push(`${el.tagName.toLowerCase()} ${String(el.className).slice(0, 90)} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    }
    return out.slice(0, 12);
  });
  console.log(rows.join("\n") || "none");
  await browser.close();
} finally { server.kill("SIGTERM"); }
