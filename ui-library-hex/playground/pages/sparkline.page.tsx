import { Sparkline } from "../../ui/sparkline";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "sparkline", title: "Sparkline", group: "Charts", step: 8, description: "Tiny trend line in plain SVG: cheap in tables, SSR-safe, no layout measuring." };

const up = [3, 5, 4, 7, 6, 9, 8, 12, 11, 14];
const wave = Array.from({ length: 24 }, (_, i) => 10 + Math.sin(i / 2.2) * 6 + (i % 5));

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants">
        <Row>
          <Sparkline data={up} label="Score trend, up" />
          <Sparkline data={up} area label="With area" />
          <Sparkline data={up} area showLast label="With latest dot" />
          <Sparkline data={wave} tone="info" area label="Longer series" />
        </Row>
      </Section>
      <Section title="Tones">
        <Row>
          {TONES.map((t) => (
            <Sparkline key={t} data={wave} tone={t} showLast label={`${t} trend`} />
          ))}
        </Row>
      </Section>
      <Section title="Edge cases and sizing">
        <Row>
          <Sparkline data={[5]} showLast label="Single point" />
          <Sparkline data={[4, 4, 4, 4]} label="Flat" />
          <Sparkline data={[]} label="No data" />
          <Sparkline data={up} min={0} max={50} label="Fixed domain" />
          <Sparkline data={up} className="h-12 w-48" area label="Large" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
