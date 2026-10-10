import { Code2, FileText } from "lucide-react";
import { useState } from "react";
import { Tabs } from "../../ui/tabs";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "tabs", title: "Tabs", group: "Navigation", step: 3, description: "Underline or pill tabs with counts, icons and disabled items. Arrow keys switch tabs." };

const items = [
  { value: "evidence", label: "Evidence", count: 12, content: "Evidence list" },
  { value: "claims", label: "Claims", count: 4, content: "Claims table" },
  { value: "history", label: "History", content: "Scan history" },
  { value: "private", label: "Private", disabled: true, content: "Hidden" },
];

function Controlled() {
  const [v, setV] = useState("claims");
  return (
    <>
      <p className="mb-2 text-xs text-fg-muted">value = {v}</p>
      <Tabs label="Controlled" items={items} value={v} onValueChange={setV} />
    </>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Underline and pill">
        <div className="grid gap-6">
          <Tabs label="Underline" items={items} />
          <Tabs label="Pill" variant="pill" items={items} />
        </div>
      </Section>
      <Section title="Sizes">
        <div className="grid gap-4">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Tabs key={s} label={s} size={s} items={items.slice(0, 3)} />
          ))}
        </div>
      </Section>
      <Section title="Icons, controlled, overflow scroll at narrow widths">
        <div className="grid gap-6">
          <Tabs label="Icons" items={[{ value: "a", label: "Docs", icon: <FileText className="size-4" />, content: "Docs" }, { value: "b", label: "Code", icon: <Code2 className="size-4" />, content: "Code" }]} />
          <Controlled />
          <Tabs label="Many" items={Array.from({ length: 10 }, (_, i) => ({ value: `t${i}`, label: `Section ${i + 1}`, content: `Content ${i + 1}` }))} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
