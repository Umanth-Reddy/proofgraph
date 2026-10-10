import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { groups, pages } from "./registry";
import { SegmentedControl } from "../ui/segmented-control";
import { Toaster } from "../ui/toast";
import { SkinProvider } from "../lib/skin";
import { skins, type SkinName } from "../skins";
import { PageIntro, densityStore, skinStore } from "./kit";

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
const getHash = () => window.location.hash.replace(/^#\/?/, "");

export function App() {
  const route = useSyncExternalStore(subscribe, getHash, () => "");
  const density = densityStore.use();
  const skin = skinStore.use();
  const [open, setOpen] = useState(false);
  const page = pages.find((p) => p.id === route);

  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    document.title = page ? `${page.title} · UI Library` : "UI Library Playground";
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <SkinProvider skin={skins[skin as SkinName]}>
    <div className="flex min-h-screen min-w-0 flex-col">
      <Toaster />
      <header className="sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-border bg-bg-raised px-3">
        <button
          type="button"
          className="focus-ring inline-flex size-8 items-center justify-center rounded-control text-fg-muted hover:bg-bg-hover md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
        <a href="#/" className="focus-ring rounded-chip text-sm font-semibold">
          UI Library
        </a>
        <div className="ml-auto flex items-center gap-2">
          <SegmentedControl size="sm" label="Density" value={density} onValueChange={densityStore.set} options={[
              { value: "comfortable", label: "Cozy" },
              { value: "compact", label: "Compact" },
            ]} />
          <div className="hidden sm:block"><SegmentedControl size="sm" label="Skin" value={skin} onValueChange={skinStore.set} options={[{ value: "hex", label: "Hex" }, { value: "default", label: "Default" }, { value: "alt", label: "Warm" }]} /></div>
          <ThemeToggle size="sm" />
        </div>
      </header>

      <div className="flex min-h-0 min-w-0 flex-1">
        {open ? <div className="fixed inset-0 top-12 z-20 bg-bg-overlay md:hidden" onClick={() => setOpen(false)} /> : null}
        <nav
          aria-label="Elements"
          className={`scroll-y fixed bottom-0 top-12 z-30 w-64 shrink-0 border-r border-border bg-bg-raised p-3 md:sticky md:z-10 md:block md:h-[calc(100vh-3rem)] ${open ? "block" : "hidden"}`}
        >
          {groups.map((g) => (
            <div key={g.group} className="mb-4">
              <div className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-fg-subtle">{g.group}</div>
              <ul>
                {g.items.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#/${p.id}`}
                      data-page={p.id}
                      aria-current={p.id === route ? "page" : undefined}
                      className="focus-ring block rounded-control px-2 py-1 text-sm text-fg-muted hover:bg-bg-hover hover:text-fg aria-[current=page]:bg-accent-subtle aria-[current=page]:text-accent-fg"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">
          {page ? (
            <>
              <PageIntro title={page.title} description={page.description} />
              <page.Component />
            </>
          ) : (
            <>
              <PageIntro
                title="UI Library playground"
                description="Every element, shown across variants, sizes, tones and states under light, dark and compact scopes."
              />
              <p className="text-fg-muted">{pages.length} elements. Pick one from the list.</p>
            </>
          )}
        </main>
      </div>
    </div>
    </SkinProvider>
  );
}
