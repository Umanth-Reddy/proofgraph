import { GlassPillNav } from "../../blocks/motion";
import { DotFieldBackground } from "../../blocks/motion";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "glass-pill-nav", title: "GlassPillNav", group: "Motion", step: 10, description: "Frosted-glass pill navigation with a mobile menu. Follows the global theme and skin controls." };

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Over a backdrop" hint="Absolutely positioned: mount inside a positioned header. Narrow the window to see the mobile menu.">
        <div className="relative h-60 overflow-hidden rounded-card border border-border bg-bg-raised">
          <DotFieldBackground />
          <GlassPillNav
            logo={<span className="font-bold">PG</span>}
            logoAlt="ProofGraph"
            activeHref="#platform"
            items={[{ label: "Platform", href: "#platform" }, { label: "Pricing", href: "#pricing" }, { label: "Docs", href: "#docs" }, { label: "Blog", href: "#blog" }]}
          />
        </div>
      </Section>
    </div>
  );
}
