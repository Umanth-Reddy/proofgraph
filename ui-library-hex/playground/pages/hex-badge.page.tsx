import { Eye, ShieldCheck, Sparkles } from "lucide-react";
import { HexBadge } from "../../ui/hex-badge";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "hex-badge", title: "HexBadge", group: "Hex pieces", step: 9, description: "Hexagonal icon badge." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          <HexBadge size="sm"><Eye /></HexBadge>
          <HexBadge><Eye /></HexBadge>
          <HexBadge size="lg"><Eye /></HexBadge>
        </Row>
      </Section>
      <Section title="Labelled" hint="Decorative by default; a label turns it into an image with a name.">
        <Row>
          <HexBadge label="Verified" size="lg"><ShieldCheck /></HexBadge>
          <HexBadge><Sparkles /></HexBadge>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
