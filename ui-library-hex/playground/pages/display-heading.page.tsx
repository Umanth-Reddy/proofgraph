import { DisplayHeading } from "../../ui/display-heading";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "display-heading", title: "DisplayHeading", group: "Hex pieces", step: 9, description: "Large expanded headline with a serif italic accent." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid gap-6">
          <DisplayHeading size="sm">Proof, <em>not</em> claims</DisplayHeading>
          <DisplayHeading>Make <em>everyone</em> a data person</DisplayHeading>
          <DisplayHeading as="h1" size="lg">Skills you can <em>show</em></DisplayHeading>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
