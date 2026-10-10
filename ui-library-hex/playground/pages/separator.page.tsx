import { Separator } from "../../ui/separator";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "separator", title: "Separator", group: "Foundations", step: 2, description: "Horizontal and vertical rules, with an optional label." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Horizontal">
        <Separator />
      </Section>
      <Section title="With label">
        <Separator label="or continue with" />
      </Section>
      <Section title="Vertical">
        <div className="flex h-8 items-center gap-3">
          <span>One</span>
          <Separator orientation="vertical" />
          <span>Two</span>
          <Separator orientation="vertical" />
          <span>Three</span>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
