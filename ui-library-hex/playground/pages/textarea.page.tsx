import { useState } from "react";
import { Textarea } from "../../ui/textarea";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "textarea", title: "Textarea", group: "Form controls", step: 2, description: "Multi-line input with auto-resize and a character counter." };

function Counted() {
  const [v, setV] = useState("Start typing…");
  return <Textarea value={v} onValueChange={setV} maxLength={60} showCounter aria-label="Counted" />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid max-w-md gap-3">
          <Textarea size="sm" placeholder="Small" aria-label="Small" />
          <Textarea size="md" placeholder="Medium" aria-label="Medium" />
          <Textarea size="lg" placeholder="Large" aria-label="Large" />
        </div>
      </Section>
      <Section title="Auto-resize (grows to 6 rows, then scrolls)">
        <div className="max-w-md">
          <Textarea autoResize maxRows={6} defaultValue={"Line one\nLine two\nLine three"} aria-label="Auto resize" />
        </div>
      </Section>
      <Section title="Counter (controlled, 60 max)">
        <div className="max-w-md">
          <Counted />
        </div>
      </Section>
      <Section title="States">
        <div className="grid max-w-md gap-3">
          <Textarea disabled defaultValue="Disabled" aria-label="Disabled" />
          <Textarea invalid defaultValue="Invalid" aria-label="Invalid" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
