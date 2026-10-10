import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { AsyncBoundary } from "../../ui/async-boundary";
import { Button } from "../../ui/button";
import { EmptyState } from "../../ui/empty-state";
import { SegmentedControl } from "../../ui/segmented-control";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "async-boundary", title: "AsyncBoundary", group: "State blocks", step: 4, description: "One place for loading, error, empty and content. Pass any query's status." };

type Mode = "loading" | "error" | "empty" | "ready" | "refetching";

function Demo() {
  const [mode, setMode] = useState<Mode>("loading");
  const [tries, setTries] = useState(0);
  useEffect(() => {
    if (mode !== "loading") return;
    const t = setTimeout(() => setMode("ready"), 1500);
    return () => clearTimeout(t);
  }, [mode, tries]);
  return (
    <div className="space-y-3">
      <SegmentedControl label="State" size="sm" value={mode} onValueChange={setMode} options={(["loading", "error", "empty", "ready", "refetching"] as const).map((m) => ({ value: m, label: m }))} />
      <AsyncBoundary
        query={{ isLoading: mode === "loading", error: mode === "error" ? { status: 500, detail: "Server error" } : undefined, isEmpty: mode === "empty", isRefetching: mode === "refetching", onRetry: () => { setTries((t) => t + 1); setMode("loading"); } }}
        empty={<EmptyState bordered icon={<Inbox />} title="Nothing to show" action={<Button size="sm" onClick={() => setMode("ready")}>Add item</Button>} />}
      >
        <div className="rounded-card border border-border bg-bg-raised p-4">Loaded content (try #{tries}).</div>
      </AsyncBoundary>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Switch states">
        <div className="max-w-xl">
          <Demo />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
