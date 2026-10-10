import { Meter } from "../../ui/meter";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "meter", title: "Meter", group: "State blocks", step: 4, description: "Value in a range, linear or radial, with threshold tones and a cap marker (e.g. 70 of 100)." };

const thresholds = [{ at: 0, tone: "danger" as const }, { at: 40, tone: "warning" as const }, { at: 70, tone: "success" as const }];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Linear with thresholds">
        <div className="grid max-w-xl gap-4">
          {[22, 55, 88].map((v) => (
            <Meter key={v} label={`Readiness ${v}`} value={v} thresholds={thresholds} />
          ))}
        </div>
      </Section>
      <Section title="Cap marker (score capped at 70)">
        <div className="max-w-xl">
          <Meter label="Honesty" value={64} cap={70} thresholds={thresholds} size="lg" />
        </div>
      </Section>
      <Section title="Sizes and tones">
        <div className="grid max-w-xl gap-3">
          <Meter size="sm" value={40} aria-label="Small" showValue={false} />
          <Meter size="md" value={60} tone="info" aria-label="Medium" showValue={false} />
          <Meter size="lg" value={80} tone="warning" aria-label="Large" showValue={false} />
          <Meter label="Quota" value={9} max={10} formatValue={(v, m) => `${v} of ${m} used`} thresholds={[{ at: 0, tone: "success" }, { at: 8, tone: "danger" }]} />
        </div>
      </Section>
      <Section title="Radial">
        <Row>
          <Meter variant="radial" size="sm" value={35} thresholds={thresholds} aria-label="Small radial" />
          <Meter variant="radial" size="md" value={64} cap={70} thresholds={thresholds} label="Honesty" unit="/100" />
          <Meter variant="radial" size="lg" value={91} thresholds={thresholds} label="Readiness" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
