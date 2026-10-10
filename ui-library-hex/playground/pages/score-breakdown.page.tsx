import { ScoreBreakdown } from "../../ui/score-breakdown";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "score-breakdown", title: "ScoreBreakdown", group: "State blocks", step: 4, description: "Parts that sum to a total: stacked bar plus list; items link to their evidence. Warns in development if the parts do not add up." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Honesty score (70 of 100)">
        <div className="max-w-md">
          <ScoreBreakdown
            title="Why 70?"
            total={70}
            items={[
              { label: "Strongest finding (deep)", value: 55, href: "#/score-breakdown" },
              { label: "Diversity bonus", value: 10 },
              { label: "Test corroboration", value: 5 },
            ]}
          />
        </div>
      </Section>
      <Section title="Sizes and tones">
        <div className="grid max-w-md gap-6">
          <ScoreBreakdown size="sm" total={40} max={50} items={[{ label: "Code", value: 25, tone: "success" }, { label: "Docs", value: 10, tone: "info" }, { label: "Penalty", value: 5, tone: "warning" }]} />
          <ScoreBreakdown size="lg" total={100} items={[{ label: "Everything", value: 100 }]} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
