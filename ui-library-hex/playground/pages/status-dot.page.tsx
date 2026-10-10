import { StatusDot } from "../../ui/status-dot";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "status-dot", title: "StatusDot", group: "Foundations", step: 2, description: "Tone dots; pulse marks live states and is disabled under reduced motion." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Tones">
        <Row>
          {TONES.map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <StatusDot tone={t} /> {t}
            </span>
          ))}
        </Row>
      </Section>
      <Section title="Pulse (live)">
        <Row>
          {TONES.map((t) => (
            <StatusDot key={t} tone={t} pulse label={`${t} live`} />
          ))}
        </Row>
      </Section>
      <Section title="Sizes">
        <Row>
          <StatusDot size="sm" tone="success" />
          <StatusDot size="md" tone="success" />
          <StatusDot size="lg" tone="success" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
