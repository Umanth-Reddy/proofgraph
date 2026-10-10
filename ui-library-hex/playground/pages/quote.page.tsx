import { Quote } from "../../ui/quote";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "quote", title: "Quote", group: "Hex pieces", step: 9, description: "Pull quote with attribution." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="With emphasis and attribution">
        <Quote author="Sam Rivera." role="VP of Engineering, Example Co">
          Great visual and design sensibility. <strong>The ability to use it in any way we choose</strong> is valuable.
        </Quote>
      </Section>
      <Section title="Without attribution">
        <Quote>Proof, not claims.</Quote>
      </Section>
    </ThemeMatrix>
  );
}
