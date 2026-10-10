import { AlertTriangle, Check, GitBranch, Info, X } from "lucide-react";
import { Icon } from "../../ui/icon";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "icon", title: "Icon", group: "Foundations", step: 2, description: "Size and tone wrapper for lucide icons; decorative unless labelled." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          <Icon icon={GitBranch} size="sm" />
          <Icon icon={GitBranch} size="md" />
          <Icon icon={GitBranch} size="lg" />
        </Row>
      </Section>
      <Section title="Tones">
        <Row>
          <Icon icon={Info} tone="neutral" size="lg" />
          <Icon icon={Info} tone="info" size="lg" />
          <Icon icon={Check} tone="success" size="lg" />
          <Icon icon={AlertTriangle} tone="warning" size="lg" />
          <Icon icon={X} tone="danger" size="lg" />
        </Row>
      </Section>
      <Section title="Labelled (role=img)">
        <Row>
          <Icon icon={Check} tone="success" label="Verified" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
