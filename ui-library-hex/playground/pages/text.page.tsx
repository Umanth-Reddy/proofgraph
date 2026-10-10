import { Text } from "../../ui/text";
import { TONES } from "../../lib/tone";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "text", title: "Text", group: "Foundations", step: 2, description: "Body copy: sizes, emphasis, tones, mono and tabular numbers." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <Text key={s} size={s}>
            {s}: The quick brown fox jumps over the lazy dog.
          </Text>
        ))}
      </Section>
      <Section title="Emphasis">
        <Text>Default</Text>
        <Text emphasis="muted">Muted</Text>
        <Text emphasis="subtle">Subtle</Text>
      </Section>
      <Section title="Tones">
        {TONES.map((t) => (
          <Text key={t} tone={t}>
            {t}
          </Text>
        ))}
      </Section>
      <Section title="Weight, mono, numeric, truncate">
        <Text weight="semibold">Semibold</Text>
        <Text mono>15fedba · app/routers/products.py</Text>
        <Text numeric>1,234.50 / 9,876.00 / 0.07</Text>
        <Text numeric>1,111.11 / 8,888.88 / 0.99</Text>
        <div className="w-40">
          <Text truncate>A long line that gets truncated with an ellipsis</Text>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
