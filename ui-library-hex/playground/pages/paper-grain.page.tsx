import { PaperGrain } from "../../ui/paper-grain";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "paper-grain", title: "PaperGrain", group: "Hex pieces", step: 9, description: "Paper texture overlay: page-wide or contained in a box." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Contained" hint="fixed={false} fills the nearest positioned parent. The default is a viewport-wide overlay; mount it once near the app root.">
        <div className="relative h-40 overflow-hidden rounded-card border border-border bg-bg-raised p-4">
          <p className="relative">Text stays crisp and clickable under the grain.</p>
          <PaperGrain fixed={false} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
