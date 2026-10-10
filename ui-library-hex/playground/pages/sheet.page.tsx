import { Button } from "../../ui/button";
import { Sheet, SheetClose } from "../../ui/sheet";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "sheet", title: "Sheet / Drawer", group: "Overlays", step: 3, description: "Side or bottom panel for evidence, filters and mobile navigation." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sides">
        <Row>
          {(["right", "left", "bottom", "top"] as const).map((side) => (
            <Sheet
              key={side}
              side={side}
              trigger={<Button variant="outline">{side}</Button>}
              title={`Sheet from the ${side}`}
              description="Evidence details"
              footer={
                <SheetClose asChild>
                  <Button>Done</Button>
                </SheetClose>
              }
            >
              <p>Panel content. Scroll if it grows.</p>
            </Sheet>
          ))}
        </Row>
      </Section>
      <Section title="Sizes (side panels)">
        <Row>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Sheet key={size} size={size} trigger={<Button variant="soft">{size}</Button>} title={`${size} sheet`}>
              {Array.from({ length: 24 }, (_, i) => (
                <p key={i} className="mb-3">
                  Row {i + 1} of evidence.
                </p>
              ))}
            </Sheet>
          ))}
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
