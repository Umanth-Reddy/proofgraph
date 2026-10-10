import { Activity, GitPullRequest, Users } from "lucide-react";
import { StatCard } from "../../ui/stat-card";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "stat-card", title: "StatCard", group: "State blocks", step: 4, description: "Label, animated value, unit, delta and a sparkline slot, with loading and error states." };

const spark = (
  <svg viewBox="0 0 96 32" className="size-full overflow-visible" aria-hidden>
    <polyline points="0,24 12,20 24,22 36,14 48,16 60,8 72,12 84,4 96,6" fill="none" className="stroke-series-1 [stroke-width:2]" />
  </svg>
);

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variations">
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard label="Verified claims" value={142} delta={12.5} deltaLabel="vs last week" icon={<Users />} sparkline={spark} />
          <StatCard label="Median latency" value={182} unit="ms" delta={-8.2} deltaGood="down" deltaLabel="vs last week" icon={<Activity />} />
          <StatCard label="Open appeals" value={7} delta={-25} hint="2 older than 7 days" icon={<GitPullRequest />} />
          <StatCard label="Honesty score" value={70.5} precision={1} unit="/ 100" delta={0} />
        </div>
      </Section>
      <Section title="States">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Loading" loading />
          <StatCard label="Failed" error="Could not load this metric." />
          <StatCard label="No value" />
        </div>
      </Section>
      <Section title="Sizes and variants">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard size="sm" label="Small" value={1234} variant="sunken" />
          <StatCard size="md" label="Medium" value={1234} />
          <StatCard size="lg" label="Large" value="A−" variant="raised" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
