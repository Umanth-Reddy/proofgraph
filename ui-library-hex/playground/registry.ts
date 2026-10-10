import type { PageMeta, PageModule } from "./types";

const modules = import.meta.glob<PageModule>("./pages/*.page.tsx", { eager: true });

export const pages: (PageMeta & { Component: PageModule["default"] })[] = Object.values(modules)
  .map((m) => ({ ...m.meta, Component: m.default }))
  .sort((a, b) => a.step - b.step || a.group.localeCompare(b.group) || a.title.localeCompare(b.title));

export const groups = (() => {
  const out: { group: string; step: number; items: typeof pages }[] = [];
  for (const p of pages) {
    let g = out.find((x) => x.group === p.group);
    if (!g) out.push((g = { group: p.group, step: p.step, items: [] }));
    g.items.push(p);
  }
  return out;
})();
