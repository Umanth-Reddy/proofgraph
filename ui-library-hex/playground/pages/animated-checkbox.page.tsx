import { useState } from "react";
import { AnimatedCheckbox } from "../../blocks/motion";
import { Switch } from "../../ui/switch";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "animated-checkbox", title: "AnimatedCheckbox", group: "Motion", step: 10, description: "Task checkbox with a spring fill, drawn tick and strike-through. Checklists and to-dos only." };

function Controlled() {
  const [done, setDone] = useState(false);
  return (
    <>
      <AnimatedCheckbox label="Controlled" checked={done} onChange={setDone} />
      <span className="text-xs text-fg-muted">checked = {String(done)}</span>
    </>
  );
}

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Checklist" hint="A real checkbox: space toggles, keyboard toggles skip the spring.">
        <div className="grid gap-1">
          <AnimatedCheckbox label="Connect the warehouse" defaultChecked />
          <AnimatedCheckbox label="Ship the build" />
          <AnimatedCheckbox label="Share the dashboard" strike="center" />
          <AnimatedCheckbox label="Publish the app" disabled />
          <Controlled />
        </div>
      </Section>
      <Section title="Not for settings" hint="A toggle is not a task and must not strike through its label: use Switch.">
        <Switch label="Email me when my score changes" />
      </Section>
    </div>
  );
}
