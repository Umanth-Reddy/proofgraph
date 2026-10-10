import { HeroWaves } from "../../blocks/motion";
import { DisplayHeading } from "../../ui/display-heading";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "hero-waves", title: "HeroWaves", group: "Motion", step: 10, description: "WebGL wave field for hero backgrounds. Follows the global theme and skin controls (it reads <html> tokens, so there is no per-panel theme matrix here)." };

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Hero background" hint="Colours: --hx-waves-horizon / -wave / -crest. Holds still under prefers-reduced-motion.">
        <div className="relative grid h-[420px] place-items-center overflow-hidden rounded-card border border-border">
          <HeroWaves />
          <DisplayHeading size="md" className="relative">See the score <em>move</em></DisplayHeading>
        </div>
      </Section>
    </div>
  );
}
