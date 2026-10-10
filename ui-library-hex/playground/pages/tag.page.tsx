import { Hash } from "lucide-react";
import { useState } from "react";
import { Tag } from "../../ui/tag";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "tag", title: "Tag / Chip", group: "Foundations", step: 2, description: "Static, removable and selectable chips." };

function Removable() {
  const [tags, setTags] = useState(["python", "fastapi", "postgres"]);
  return (
    <Row label="removable (click ×, or Backspace/Delete when focused)">
      {tags.map((t) => (
        <Tag key={t} onRemove={() => setTags((x) => x.filter((y) => y !== t))}>
          {t}
        </Tag>
      ))}
      {tags.length === 0 ? <span className="text-fg-muted">All removed</span> : null}
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants × tones">
        {(["subtle", "outline"] as const).map((v) => (
          <Row key={v} label={v}>
            {TONES.map((t) => (
              <Tag key={t} variant={v} tone={t}>
                {t}
              </Tag>
            ))}
          </Row>
        ))}
      </Section>
      <Section title="Sizes">
        <Row>
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
          <Tag size="lg">Large</Tag>
        </Row>
      </Section>
      <Section title="Behavior">
        <Removable />
        <Row label="selectable (uncontrolled)">
          <Tag selectable>react</Tag>
          <Tag selectable defaultSelected>
            typescript
          </Tag>
          <Tag selectable tone="info" leading={<Hash className="size-3" />}>
            topic
          </Tag>
        </Row>
        <Row label="disabled">
          <Tag disabled onRemove={() => {}}>
            locked
          </Tag>
          <Tag selectable disabled>
            off
          </Tag>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
