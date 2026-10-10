import { Arcs } from "../../ui/arcs";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "arcs", title: "Arcs", group: "Hex pieces", step: 9, description: "Concentric hairline arcs, a decorative backdrop." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Backdrop" hint="Fills its positioned parent and fades in toward the bottom.">
        <div className="relative h-80 overflow-hidden rounded-card border border-border">
          <Arcs />
          <p className="relative p-4 text-fg-muted">Content layers above the arcs.</p>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
