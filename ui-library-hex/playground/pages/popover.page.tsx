import { SlidersHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { Field } from "../../ui/field";
import { Input } from "../../ui/input";
import { Popover, PopoverClose } from "../../ui/popover";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "popover", title: "Popover", group: "Overlays", step: 3, description: "Anchored panel for light forms and details. Esc closes; focus returns to the trigger." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Basic and with form">
        <Row>
          <Popover trigger={<Button variant="outline">Details</Button>} aria-label="Details">
            <p className="font-medium">Verification</p>
            <p className="mt-1 text-fg-muted">Checked against 3 sources on 12 Oct.</p>
          </Popover>
          <Popover trigger={<Button variant="outline" leading={<SlidersHorizontal className="size-4" />}>Filters</Button>} aria-label="Filters">
            <div className="grid gap-3">
              <Field label="Min score">
                <Input type="number" defaultValue={60} />
              </Field>
              <PopoverClose asChild>
                <Button size="sm">Apply</Button>
              </PopoverClose>
            </div>
          </Popover>
        </Row>
      </Section>
      <Section title="Placement and width">
        <Row>
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Popover key={side} side={side} width="sm" trigger={<Button variant="soft">{side}</Button>} aria-label={side}>
              Opens to the {side}.
            </Popover>
          ))}
          <Popover align="end" width="lg" trigger={<Button variant="soft">Wide, end-aligned</Button>} aria-label="Wide">
            A wide panel that collides with the viewport edge and shifts to stay visible.
          </Popover>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
