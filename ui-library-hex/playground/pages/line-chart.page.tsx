import { LineChart } from "../../ui/line-chart";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "line-chart", title: "LineChart", group: "Charts", step: 8, description: "Series over a category or time axis with tooltip, legend and threshold lines. Colors come from the --series-* tokens." };

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const data = months.map((m, i) => ({ month: m, honesty: 48 + Math.round(Math.sin(i / 1.8) * 8 + i * 2.4), readiness: 35 + Math.round(Math.cos(i / 2.4) * 7 + i * 3.1), cohort: 52 + (i % 4) * 2 }));

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Multiple series with a cap line">
        <LineChart label="Honesty and readiness by month; honesty capped at 70" data={data} xKey="month" series={[{ key: "honesty", label: "Honesty" }, { key: "readiness", label: "Readiness" }, { key: "cohort", label: "Cohort median", tone: "neutral" }]} thresholds={[{ value: 70, label: "Cap 70", tone: "warning" }]} yDomain={[0, 100]} />
      </Section>
      <Section title="Curves, dots, formatted axes">
        <div className="grid gap-4 sm:grid-cols-2">
          <LineChart label="Linear with dots" curve="linear" showDots height={200} data={data.slice(0, 6)} xKey="month" series={[{ key: "honesty", label: "Honesty" }]} formatY={(v) => `${v} pts`} />
          <LineChart label="Step curve" curve="step" height={200} data={data.slice(0, 6)} xKey="month" series={[{ key: "readiness", label: "Readiness", tone: "success" }]} showGrid={false} />
        </div>
      </Section>
      <Section title="States">
        <div className="grid gap-4 sm:grid-cols-3">
          <LineChart label="Loading" loading height={160} data={[]} xKey="month" series={[{ key: "a" }]} />
          <LineChart label="Empty" height={160} data={[]} xKey="month" series={[{ key: "a" }]} />
          <LineChart label="Error" error={new Error("Could not reach the metrics service")} onRetry={() => {}} height={160} data={[]} xKey="month" series={[{ key: "a" }]} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
