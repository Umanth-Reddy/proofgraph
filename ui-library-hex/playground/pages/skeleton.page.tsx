import { Skeleton } from "../../ui/skeleton";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "skeleton", title: "Skeleton", group: "Foundations", step: 2, description: "Loading placeholders: line, multi-line, rectangle and circle." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Shapes">
        <Row>
          <Skeleton shape="circle" />
          <Skeleton shape="circle" width={24} height={24} />
          <div className="w-48">
            <Skeleton shape="rect" />
          </div>
        </Row>
      </Section>
      <Section title="Text lines">
        <div className="max-w-md space-y-4">
          <Skeleton />
          <Skeleton lines={3} />
        </div>
      </Section>
      <Section title="Card-like composition">
        <div className="flex max-w-md items-center gap-3 rounded-card border border-border bg-bg-raised p-4">
          <Skeleton shape="circle" />
          <div className="flex-1">
            <Skeleton lines={2} />
          </div>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
