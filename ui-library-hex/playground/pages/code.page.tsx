import { Code } from "../../ui/code";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "code", title: "Code (inline)", group: "Foundations", step: 2, description: "Inline code for identifiers, SHAs and paths." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants">
        <Row>
          <Code>useEventStream</Code>
          <Code variant="outline">15fedba</Code>
        </Row>
      </Section>
      <Section title="Tones">
        <Row>
          {TONES.map((t) => (
            <Code key={t} tone={t}>
              {t}
            </Code>
          ))}
        </Row>
      </Section>
      <Section title="In a sentence, with long unbroken tokens wrapping">
        <p className="max-w-prose">
          Run <Code>npm run build</Code> then open <Code>app/routers/products_and_inventory_management_endpoints.py</Code> at <Code>15fedba</Code>.
        </p>
      </Section>
    </ThemeMatrix>
  );
}
