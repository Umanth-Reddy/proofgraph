import { BarChart } from "../../ui/bar-chart";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "bar-chart", title: "BarChart", group: "Charts", step: 8, description: "Grouped or stacked bars, vertical or horizontal." };

const batches = [
  { batch: "CS-A", ready: 42, almost: 18, notyet: 10 },
  { batch: "CS-B", ready: 35, almost: 24, notyet: 15 },
  { batch: "IT-A", ready: 51, almost: 12, notyet: 6 },
  { batch: "ECE", ready: 28, almost: 22, notyet: 20 },
];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Grouped">
        <BarChart label="Readiness by batch, grouped" data={batches} xKey="batch" series={[{ key: "ready", label: "Ready", tone: "success" }, { key: "almost", label: "Almost", tone: "warning" }, { key: "notyet", label: "Not yet", tone: "danger" }]} />
      </Section>
      <Section title="Stacked and horizontal">
        <div className="grid gap-4 sm:grid-cols-2">
          <BarChart label="Stacked" stacked height={220} data={batches} xKey="batch" series={[{ key: "ready", label: "Ready", tone: "success" }, { key: "almost", label: "Almost", tone: "warning" }, { key: "notyet", label: "Not yet", tone: "danger" }]} />
          <BarChart label="Horizontal" orientation="horizontal" height={220} categoryWidth={60} data={batches} xKey="batch" series={[{ key: "ready", label: "Ready" }]} thresholds={[{ value: 40 }]} />
        </div>
      </Section>
      <Section title="Empty">
        <BarChart label="Empty" height={140} data={[]} xKey="batch" series={[{ key: "ready" }]} />
      </Section>
    </ThemeMatrix>
  );
}
