import { DotFieldBackground } from "../../blocks/motion";
import { DisplayHeading } from "../../ui/display-heading";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "dot-field", title: "DotFieldBackground", group: "Motion", step: 10, description: "Dot grid that bulges away from the cursor. Follows the global theme and skin controls." };

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Cursor field" hint="Move the pointer across the dots. Colours: --hx-dots-from / -to / -glow.">
        <div className="relative grid h-[360px] place-items-center overflow-hidden rounded-card border border-border bg-bg-raised">
          <DotFieldBackground />
          <DisplayHeading size="sm" className="pointer-events-none relative">Sign in to <em>ProofGraph</em></DisplayHeading>
        </div>
      </Section>
      <Section title="Denser, with sparkle">
        <div className="relative h-48 overflow-hidden rounded-card border border-border bg-bg-raised"><DotFieldBackground dotSpacing={14} sparkle /></div>
      </Section>
    </div>
  );
}
