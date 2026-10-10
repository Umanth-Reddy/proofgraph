import { Check, GitCommit, ShieldAlert } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Timeline } from "../../ui/timeline";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "timeline", title: "Timeline", group: "State blocks", step: 4, description: "Time, title, tone and icon for scan history, growth and audit trails." };

const items = [
  { id: "1", title: "Scan completed", time: "14:03", description: "14 of 16 claims verified", tone: "success" as const, icon: <Check /> },
  { id: "2", title: "Evidence replaced", time: "13:58", description: "New commit supersedes 15fedba", tone: "info" as const, icon: <GitCommit />, extra: <Badge size="sm" tone="info">replaced</Badge> },
  { id: "3", title: "Integrity notice", time: "13:41", description: "Similar repository detected", tone: "warning" as const, icon: <ShieldAlert /> },
  { id: "4", title: "Scan started", time: "13:40" },
];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Dot and icon variants">
        <div className="grid gap-6 sm:grid-cols-2">
          <Timeline items={items} aria-label="Dot timeline" />
          <Timeline items={items} variant="icon" aria-label="Icon timeline" />
        </div>
      </Section>
      <Section title="Loading and empty">
        <div className="grid gap-6 sm:grid-cols-2">
          <Timeline items={[]} loading />
          <Timeline items={[]} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
