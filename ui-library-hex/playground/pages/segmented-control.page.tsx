import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { SegmentedControl } from "../../ui/segmented-control";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "segmented-control", title: "SegmentedControl", group: "Form controls", step: 2, description: "2–5 mutually exclusive options. Arrow keys move between them." };

function Controlled() {
  const [v, setV] = useState("week");
  return (
    <Row label={`controlled: ${v}`}>
      <SegmentedControl label="Period" value={v} onValueChange={setV} options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} />
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          {(["sm", "md", "lg"] as const).map((s) => (
            <SegmentedControl key={s} size={s} label={`Size ${s}`} defaultValue="a" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} />
          ))}
        </Row>
      </Section>
      <Section title="Icons, disabled item, five options">
        <Row>
          <SegmentedControl
            label="View"
            defaultValue="list"
            options={[
              { value: "list", label: "List", icon: <List className="size-4" /> },
              { value: "grid", label: "Grid", icon: <LayoutGrid className="size-4" /> },
            ]}
          />
          <SegmentedControl label="Level" defaultValue="2" options={[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n), disabled: n === 4 }))} />
        </Row>
      </Section>
      <Section title="Full width, controlled, disabled">
        <div className="max-w-md space-y-3">
          <SegmentedControl fullWidth label="Billing" defaultValue="m" options={[{ value: "m", label: "Monthly" }, { value: "y", label: "Yearly" }]} />
          <Controlled />
          <SegmentedControl disabled label="Disabled" defaultValue="a" options={[{ value: "a", label: "One" }, { value: "b", label: "Two" }]} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
