import { GuideLine, PageFrame } from "../../ui/page-frame";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "page-frame", title: "PageFrame + GuideLine", group: "Hex pieces", step: 9, description: "A centered column framed by vertical guide lines, with horizontal and dashed rules." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Frame with rules">
        <PageFrame className="py-6">
          <p>Content sits inside the guide-line frame.</p>
          <div className="my-4"><GuideLine /></div>
          <p>A solid rule above, a dashed rule below.</p>
          <div className="my-4"><GuideLine dashed /></div>
          <div className="relative h-16">
            <GuideLine orientation="vertical" dashed className="left-1/3" />
            <GuideLine orientation="vertical" className="left-2/3" />
          </div>
        </PageFrame>
      </Section>
    </ThemeMatrix>
  );
}
