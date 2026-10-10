import { Spinner } from "../../ui/spinner";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "spinner", title: "Spinner", group: "Foundations", step: 2, description: "Indeterminate activity. Static under reduced motion." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Row>
      </Section>
      <Section title="Tones" hint="Without a tone it inherits the text color.">
        <Row>
          <Spinner size="lg" />
          {TONES.map((t) => (
            <Spinner key={t} size="lg" tone={t} />
          ))}
        </Row>
      </Section>
      <Section title="With status label">
        <Row>
          <span className="inline-flex items-center gap-2 text-fg-muted">
            <Spinner label="Scanning repository" /> Scanning repository…
          </span>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
