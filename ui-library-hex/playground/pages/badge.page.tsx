import { Check } from "lucide-react";
import { Badge } from "../../ui/badge";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "badge", title: "Badge", group: "Foundations", step: 2, description: "Status labels: subtle, solid and outline, with an optional dot." };

export default function Page() {
  return (
    <ThemeMatrix>
      {(["subtle", "solid", "outline"] as const).map((v) => (
        <Section key={v} title={v}>
          <Row>
            {TONES.map((t) => (
              <Badge key={t} variant={v} tone={t}>
                {t}
              </Badge>
            ))}
          </Row>
          <Row label="with dot">
            {TONES.map((t) => (
              <Badge key={t} variant={v} tone={t} dot>
                {t}
              </Badge>
            ))}
          </Row>
        </Section>
      ))}
      <Section title="Sizes">
        <Row>
          <Badge size="sm" tone="info">
            Small
          </Badge>
          <Badge size="md" tone="info">
            Medium
          </Badge>
          <Badge size="lg" tone="info">
            Large
          </Badge>
        </Row>
      </Section>
      <Section title="Dense table of badges" hint="Subtle tones stay calm in bulk.">
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 20 }, (_, i) => (
            <Badge key={i} tone={TONES[i % 5]} dot>
              {["verified", "weak", "unverified", "replaced", "rejected"][i % 5]}
            </Badge>
          ))}
        </div>
      </Section>
      <Section title="asChild + icon">
        <Row>
          <Badge asChild tone="success">
            <a href="#/badge">
              <Check className="size-3" /> link badge
            </a>
          </Badge>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
