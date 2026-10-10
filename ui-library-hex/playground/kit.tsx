/** Playground helpers — not part of the library. */
import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { PortalContainerProvider } from "../lib/portal";

export function PageIntro({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="mt-1 max-w-prose text-fg-muted">{description}</p> : null}
    </header>
  );
}

export function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="mb-6 min-w-0">
      <h2 className="mb-1 text-sm font-semibold text-fg">{title}</h2>
      {hint ? <p className="mb-2 text-xs text-fg-muted">{hint}</p> : <div className="mb-2" />}
      {children}
    </section>
  );
}

export function Row({ label, children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div className="mb-3 min-w-0">
      {label ? <div className="mb-1 font-mono text-xs text-fg-subtle">{label}</div> : null}
      <div className={className ?? "flex flex-wrap items-center gap-3"}>{children}</div>
    </div>
  );
}

const PANELS = [
  { id: "light", label: "light", attrs: { "data-theme": "light" } },
  { id: "dark", label: "dark", attrs: { "data-theme": "dark" } },
  { id: "compact", label: "compact (light)", attrs: { "data-theme": "light", "data-density": "compact" } },
] as const;

function Panel({ attrs, id, label, children }: { attrs: Record<string, string>; id: string; label: string; children: ReactNode }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  return (
    <div ref={setEl} {...attrs} data-matrix={id} className="relative min-w-0 rounded-card border border-border bg-bg p-4 text-fg">
      <div className="mb-3 font-mono text-xs uppercase tracking-wide text-fg-subtle">{label}</div>
      <PortalContainerProvider container={el}>{children}</PortalContainerProvider>
    </div>
  );
}

/** Renders its children under light, dark and compact scopes. Overlays portal into their panel so they inherit its scope. */
export function ThemeMatrix({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4">
      {PANELS.map((p) => (
        <Panel key={p.id} id={p.id} label={p.label} attrs={p.attrs}>
          {children}
        </Panel>
      ))}
    </div>
  );
}

/** Stable unique id for demo wiring. */
export function useDemoId(prefix = "demo") {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

/* ---- tiny persisted attribute store (density, skin) ---- */
function makeAttrStore(key: string, attr: string, fallback: string, unset = fallback) {
  const listeners = new Set<() => void>();
  let value = fallback;
  try {
    value = localStorage.getItem(key) ?? fallback;
  } catch {
    /* ignore */
  }
  const apply = () => {
    if (typeof document !== "undefined") {
      if (value === unset) document.documentElement.removeAttribute(attr);
      else document.documentElement.setAttribute(attr, value);
    }
  };
  apply();
  return {
    set(v: string) {
      value = v;
      try {
        localStorage.setItem(key, v);
      } catch {
        /* ignore */
      }
      apply();
      listeners.forEach((l) => l());
    },
    use() {
      return useSyncExternalStore(
        (cb) => {
          listeners.add(cb);
          return () => listeners.delete(cb);
        },
        () => value,
        () => fallback,
      );
    },
  };
}

export const densityStore = makeAttrStore("ui-density", "data-density", "comfortable");
export const skinStore = makeAttrStore("ui-skin", "data-skin", "hex", "default");
