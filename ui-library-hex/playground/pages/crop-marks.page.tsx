import { CropMarks } from "../../ui/crop-marks";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "crop-marks", title: "CropMarks", group: "Hex pieces", step: 9, description: "Corner brackets around a box." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row className="flex flex-wrap items-center gap-6">
          <CropMarks size="sm" className="px-4 py-3">Small</CropMarks>
          <CropMarks className="px-4 py-3">Medium</CropMarks>
          <CropMarks size="lg" className="px-4 py-3">Large</CropMarks>
        </Row>
      </Section>
      <Section title="asChild" hint="Draws the marks on your own element.">
        <CropMarks asChild>
          <nav aria-label="Example" className="flex gap-4 bg-bg-raised px-4 py-3 text-sm"><a href="#/crop-marks">Platform</a><a href="#/crop-marks">Pricing</a><a href="#/crop-marks">Log in</a></nav>
        </CropMarks>
      </Section>
    </ThemeMatrix>
  );
}
