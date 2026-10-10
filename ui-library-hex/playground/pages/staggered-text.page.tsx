import { useState } from "react";
import { StaggeredText } from "../../blocks/motion";
import { Button } from "../../ui/button";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "staggered-text", title: "StaggeredText", group: "Motion", step: 10, description: "Text that staggers in by letter, word or line when scrolled into view." };

function Demo() {
  const [run, setRun] = useState(0);
  return (
    <div key={run} className="grid max-w-2xl gap-4">
      <StaggeredText as="h2" className="font-(family-name:--font-display) text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] [font-stretch:118%]" segmentBy="chars" delay={30} text="Proof, not claims" />
      <StaggeredText as="p" className="text-lg text-fg-muted" segmentBy="words" delay={60} direction="bottom" text="Every skill on the profile links to the code that shows it and the quiz that confirms it." />
      <StaggeredText as="p" className="max-w-[36ch]" segmentBy="lines" delay={140} blur={false} direction="left" text="Lines are measured where the text actually wraps, so this paragraph comes in one rendered line at a time." />
      <div><Button size="sm" variant="outline" onClick={() => setRun((r) => r + 1)}>Replay</Button></div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Replay">
        <Demo />
      </Section>
    </div>
  );
}
