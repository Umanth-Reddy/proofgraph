import { useState } from "react";
import { SplitView } from "../../layout/split-view";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "split-view", title: "SplitView", group: "Layout", step: 7, description: "Primary pane plus a resizable side panel. Drag the handle or use ← → / Home / End; below md the panes stack." };

const Pane = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="h-full min-h-40 p-3">
    <div className="mb-1 text-sm font-medium">{title}</div>
    <div className="text-sm text-fg-muted">{children ?? "Content"}</div>
  </div>
);

function Controlled() {
  const [size, setSize] = useState(280);
  return (
    <>
      <p className="mb-2 text-xs text-fg-muted">side panel = {Math.round(size)}px (controlled)</p>
      <div className="overflow-hidden rounded-card border border-border">
        <SplitView size={size} onSizeChange={setSize} minSize={160} maxSize={420} primary={<Pane title="Live Scan" />} secondary={<Pane title="Evidence panel" />} />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Right panel (default)">
        <div className="overflow-hidden rounded-card border border-border">
          <SplitView primary={<Pane title="Primary" />} secondary={<Pane title="Secondary">Drag the divider.</Pane>} />
        </div>
      </Section>
      <Section title="Left panel, controlled">
        <div className="grid gap-4">
          <div className="overflow-hidden rounded-card border border-border">
            <SplitView side="left" defaultSize={220} minSize={140} maxSize={360} primary={<Pane title="Editor" />} secondary={<Pane title="Outline" />} />
          </div>
          <Controlled />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
