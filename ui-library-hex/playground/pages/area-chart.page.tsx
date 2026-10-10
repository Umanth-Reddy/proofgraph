import { AreaChart } from "../../ui/area-chart";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "area-chart", title: "AreaChart", group: "Charts", step: 8, description: "Filled series, overlapping or stacked." };

const days = Array.from({ length: 14 }, (_, i) => ({ day: `D${i + 1}`, scans: 20 + Math.round(Math.sin(i / 2) * 8 + i), failed: 3 + (i % 4), queued: 6 + Math.round(Math.cos(i / 3) * 3) }));

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Overlapping">
        <AreaChart label="Scans per day" data={days} xKey="day" series={[{ key: "scans", label: "Completed" }, { key: "failed", label: "Failed", tone: "danger" }]} />
      </Section>
      <Section title="Stacked">
        <AreaChart label="Throughput by status, stacked" stacked data={days} xKey="day" series={[{ key: "scans", label: "Completed", tone: "success" }, { key: "queued", label: "Queued", tone: "info" }, { key: "failed", label: "Failed", tone: "danger" }]} />
      </Section>
      <Section title="Compact">
        <AreaChart label="Compact area" height={140} showGrid={false} data={days} xKey="day" series={[{ key: "scans" }]} />
      </Section>
    </ThemeMatrix>
  );
}
