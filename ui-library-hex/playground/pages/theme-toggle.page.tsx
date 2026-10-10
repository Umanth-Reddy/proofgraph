import { useState } from "react";
import { ThemeToggle } from "../../ui/theme-toggle";
import type { ThemeMode } from "../../hooks/use-theme";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = {
  id: "theme-toggle",
  title: "ThemeToggle",
  group: "Foundations",
  step: 1,
  description: "Light / dark / system switch. Uncontrolled it drives the document theme; with `value` it is presentational.",
};

function Controlled() {
  const [v, setV] = useState<ThemeMode>("dark");
  return (
    <Row label={`controlled value="${v}" (does not change the page theme)`}>
      <ThemeToggle value={v} onValueChange={setV} />
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants">
        <Row label="segmented">
          <ThemeToggle />
        </Row>
        <Row label="cycle">
          <ThemeToggle variant="cycle" />
        </Row>
      </Section>
      <Section title="Sizes">
        <Row label="sm / md / lg segmented">
          <ThemeToggle size="sm" />
          <ThemeToggle size="md" />
          <ThemeToggle size="lg" />
        </Row>
        <Row label="sm / md / lg cycle">
          <ThemeToggle variant="cycle" size="sm" />
          <ThemeToggle variant="cycle" size="md" />
          <ThemeToggle variant="cycle" size="lg" />
        </Row>
      </Section>
      <Section title="Controlled and localized">
        <Controlled />
        <Row label="custom labels">
          <ThemeToggle labels={{ group: "Apariencia", light: "Claro", dark: "Oscuro", system: "Sistema" }} value="light" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
