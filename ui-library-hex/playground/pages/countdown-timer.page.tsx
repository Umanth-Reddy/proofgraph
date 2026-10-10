import { useState } from "react";
import { Button } from "../../ui/button";
import { CountdownTimer } from "../../ui/countdown-timer";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "countdown-timer", title: "CountdownTimer", group: "Flows", step: 6, description: "Drift-free countdown with warning and danger phases, pause, onExpire and screen-reader milestones (the ticking digits are not announced)." };

function Controlled() {
  const [paused, setPaused] = useState(false);
  const [expired, setExpired] = useState(0);
  return (
    <Row label={`controlled paused=${paused}, expired ${expired}×`}>
      <CountdownTimer durationMs={20_000} warnAtMs={12_000} dangerAtMs={6_000} pausable paused={paused} onPausedChange={setPaused} onExpire={() => setExpired((x) => x + 1)} label="Answer time" />
      <Button size="sm" variant="outline" onClick={() => setPaused((p) => !p)}>
        Toggle from outside
      </Button>
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Phases (warn at 12 s, danger at 6 s)">
        <Row>
          <CountdownTimer durationMs={15_000} warnAtMs={10_000} dangerAtMs={5_000} label="Viva question" />
        </Row>
      </Section>
      <Section title="Static phases and sizes">
        <Row>
          <CountdownTimer size="sm" durationMs={90_000} autoStart={false} />
          <CountdownTimer size="md" durationMs={9_000} warnAtMs={10_000} autoStart={false} />
          <CountdownTimer size="lg" durationMs={4_000} dangerAtMs={5_000} autoStart={false} />
        </Row>
      </Section>
      <Section title="Pausable and controlled">
        <Controlled />
      </Section>
      <Section title="Already expired">
        <Row>
          <CountdownTimer durationMs={0} label="Challenge" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
