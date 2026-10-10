import { Kbd } from "../../ui/kbd";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "kbd", title: "Kbd", group: "Foundations", step: 2, description: "Keyboard key caps and shortcut combos." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          <Kbd size="sm">Esc</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd size="lg">Tab</Kbd>
        </Row>
      </Section>
      <Section title="Combos">
        <Row>
          <Kbd keys={["⌘", "K"]} />
          <Kbd keys={["Ctrl", "Shift", "P"]} />
          <Kbd keys={["g", "d"]} size="sm" />
        </Row>
      </Section>
      <Section title="In a sentence">
        <p>
          Press <Kbd keys={["⌘", "K"]} size="sm" /> to open the command palette.
        </p>
      </Section>
    </ThemeMatrix>
  );
}
