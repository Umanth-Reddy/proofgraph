import { Info, Save } from "lucide-react";
import { Button, IconButton } from "../../ui/button";
import { Tooltip } from "../../ui/tooltip";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "tooltip", title: "Tooltip", group: "Overlays", step: 3, description: "Short hints on hover and keyboard focus. Never the only way to get essential information." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Placement">
        <Row>
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side} content={`Tooltip ${side}`} side={side}>
              <Button variant="outline">{side}</Button>
            </Tooltip>
          ))}
        </Row>
      </Section>
      <Section title="With shortcut, on icon buttons, disabled">
        <Row>
          <Tooltip content="Save" shortcut={["⌘", "S"]}>
            <IconButton label="Save" variant="outline">
              <Save className="size-4" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Explains the metric in a sentence or two.">
            <span tabIndex={0} className="focus-ring inline-flex rounded-chip text-fg-muted">
              <Info className="size-4" aria-label="More info" />
            </span>
          </Tooltip>
          <Tooltip content="Never shown" disabled>
            <Button variant="ghost">Disabled tooltip</Button>
          </Tooltip>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
