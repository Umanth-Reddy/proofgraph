import { Heading } from "../../ui/heading";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "heading", title: "Heading", group: "Foundations", step: 2, description: "Type scale. `level` picks the tag, `size` picks the look." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Default size per level">
        {([1, 2, 3, 4, 5, 6] as const).map((l) => (
          <Heading key={l} level={l}>
            Level {l} heading
          </Heading>
        ))}
      </Section>
      <Section title="Independent size">
        <Heading level={3} size="2xl">
          h3 styled as 2xl
        </Heading>
        <Heading level={2} size="sm" muted>
          h2 styled small and muted
        </Heading>
      </Section>
    </ThemeMatrix>
  );
}
