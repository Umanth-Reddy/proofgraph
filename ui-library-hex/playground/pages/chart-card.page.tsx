import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { ChartCard } from "../../ui/chart-card";
import { LineChart } from "../../ui/line-chart";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "chart-card", title: "ChartCard", group: "Charts", step: 8, description: "Title, period switcher, loading / empty / error states, and a “view data” table toggle as the accessible alternative to the chart." };

const make = (n: number) => Array.from({ length: n }, (_, i) => ({ day: `D${i + 1}`, score: 50 + Math.round(Math.sin(i / 2) * 10 + i * (n > 10 ? 0.8 : 2)) }));

function Demo() {
  const [period, setPeriod] = useState("7d");
  const data = period === "7d" ? make(7) : period === "30d" ? make(30) : make(12);
  return (
    <ChartCard
      title="Honesty score"
      description="Average across verified claims"
      periods={[{ value: "7d", label: "7d" }, { value: "30d", label: "30d" }, { value: "1y", label: "1y" }]}
      period={period}
      onPeriodChange={setPeriod}
      actions={<Button size="sm" variant="outline" leading={<Download className="size-4" />}>CSV</Button>}
      data={{ caption: `Honesty score, last ${period}`, columns: [{ key: "day", label: "Day" }, { key: "score", label: "Score", align: "right" }], rows: data }}
      footer="Scores update after each scan."
    >
      <LineChart label={`Honesty score over ${period}`} data={data} xKey="day" series={[{ key: "score", label: "Score" }]} height={220} />
    </ChartCard>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Interactive">
        <div className="max-w-2xl">
          <Demo />
        </div>
      </Section>
      <Section title="States">
        <div className="grid gap-4 sm:grid-cols-3">
          <ChartCard title="Loading" loading loadingHeight={120}>x</ChartCard>
          <ChartCard title="Empty" isEmpty emptyLabel="No scans yet">x</ChartCard>
          <ChartCard title="Error" error={{ status: 500, detail: "Metrics unavailable" }} onRetry={() => {}}>x</ChartCard>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
