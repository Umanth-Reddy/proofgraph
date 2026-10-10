import { ValueChange } from "../../ui/value-change";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "value-change", title: "ValueChange", group: "State blocks", step: 4, description: "“From → to” with a tone from the direction of change." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Automatic tone">
        <Row>
          <ValueChange from={55} to={70} showDelta />
          <ValueChange from={70} to={55} showDelta />
          <ValueChange from={50} to={50} />
          <ValueChange from={420} to={380} goodDirection="down" showDelta />
        </Row>
      </Section>
      <Section title="Forced tones and text values">
        <Row>
          <ValueChange from="unverified" to="verified" tone="success" />
          <ValueChange from="verified" to="weak" tone="warning" />
          <ValueChange from="v1.2" to="v1.3" tone="info" />
        </Row>
      </Section>
      <Section title="Sizes">
        <Row>
          <ValueChange size="sm" from={1} to={2} />
          <ValueChange size="md" from={1} to={2} />
          <ValueChange size="lg" from={1} to={2} />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
