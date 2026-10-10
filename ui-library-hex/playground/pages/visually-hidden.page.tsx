import { Search } from "lucide-react";
import { VisuallyHidden } from "../../ui/visually-hidden";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "visually-hidden", title: "VisuallyHidden", group: "Foundations", step: 2, description: "Content for assistive technology only." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Icon-only button with a hidden label" hint="The button below reads “Search” to screen readers.">
        <button type="button" className="focus-ring inline-flex size-9 items-center justify-center rounded-control border border-border-strong bg-bg-raised">
          <Search className="size-4" aria-hidden />
          <VisuallyHidden>Search</VisuallyHidden>
        </button>
      </Section>
      <Section title="Inline hint">
        <p>
          Total: <strong>42</strong>
          <VisuallyHidden> items selected</VisuallyHidden>
        </p>
      </Section>
    </ThemeMatrix>
  );
}
