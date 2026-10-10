import { Donut, RadialProgress } from "../../ui/donut";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "donut", title: "Donut / RadialProgress", group: "Charts", step: 8, description: "Composition ring with a center value, and a single-value radial ring (quotas, readiness)." };

const data = [{ name: "Verified", value: 14, tone: "success" as const }, { name: "Weak", value: 5, tone: "warning" as const }, { name: "Unverified", value: 3, tone: "neutral" as const }];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Composition with center total">
        <Row>
          <div className="w-60">
            <Donut label="22 claims: 14 verified, 5 weak, 3 unverified" data={data} centerValue={22} centerCaption="claims" />
          </div>
          <div className="w-48">
            <Donut label="Series colors" size={160} thickness={0.25} data={[{ name: "A", value: 40 }, { name: "B", value: 30 }, { name: "C", value: 20 }, { name: "D", value: 10 }]} />
          </div>
        </Row>
      </Section>
      <Section title="RadialProgress (a Meter ring)">
        <Row>
          <RadialProgress value={72} label="Quota used" thresholds={[{ at: 0, tone: "success" }, { at: 80, tone: "danger" }]} unit="%" />
          <RadialProgress value={91} size="lg" label="Readiness" tone="info" />
        </Row>
      </Section>
      <Section title="States">
        <div className="grid gap-4 sm:grid-cols-3">
          <Donut label="Loading" loading size={140} data={[]} />
          <Donut label="Empty" size={140} data={[]} />
          <Donut label="Error" size={140} data={[]} error={new Error("No access")} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
