import { useState } from "react";
import { AnimatedNumber } from "../../ui/animated-number";
import { Button } from "../../ui/button";
import { formatCompact } from "../../lib/format";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "animated-number", title: "AnimatedNumber", group: "State blocks", step: 4, description: "Eases between values; instant under reduced motion; screen readers hear only the final value." };

function Demo() {
  const [v, setV] = useState(72);
  return (
    <>
      <Row>
        <span className="text-4xl font-semibold">
          <AnimatedNumber value={v} />
        </span>
        <span className="text-2xl">
          <AnimatedNumber value={v * 13.37} precision={2} />
        </span>
        <span className="text-2xl">
          <AnimatedNumber value={v * 1000} format={formatCompact} />
        </span>
      </Row>
      <Row>
        <Button size="sm" variant="outline" onClick={() => setV(Math.round(Math.random() * 100))}>
          Random
        </Button>
        <Button size="sm" variant="outline" onClick={() => setV((x) => x + 10)}>
          +10
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setV(0)}>
          Reset
        </Button>
      </Row>
    </>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Interactive">
        <Demo />
      </Section>
      <Section title="Animation off">
        <span className="text-2xl">
          <AnimatedNumber value={1234} animate={false} />
        </span>
      </Section>
    </ThemeMatrix>
  );
}
