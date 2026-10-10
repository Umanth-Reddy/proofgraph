import { useState } from "react";
import { Field } from "../../ui/field";
import { Input } from "../../ui/input";
import { Stepper, Wizard, type WizardStep } from "../../ui/stepper";
import { toast } from "../../ui/toast";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "stepper", title: "Stepper / Wizard", group: "Flows", step: 6, description: "Step indicator, and a Wizard with Back / Next / Finish, a per-step validation gate (sync or async) and focus management." };

const base = [
  { id: "a", label: "Account", description: "Basics" },
  { id: "b", label: "Profile", description: "Skills" },
  { id: "c", label: "Review", optional: true },
];

function Demo() {
  const [name, setName] = useState("");
  const steps: WizardStep[] = [
    {
      id: "a",
      label: "Account",
      description: "Who are you?",
      content: (
        <Field label="Full name" required hint="Next stays blocked until this is filled.">
          <Input value={name} onValueChange={setName} />
        </Field>
      ),
      validate: () => (name.trim() ? true : "Enter your full name to continue."),
    },
    {
      id: "b",
      label: "Check (async)",
      description: "Server validation",
      content: <p>Pressing Next runs a 700 ms async check.</p>,
      validate: () => new Promise((res) => setTimeout(() => res(true), 700)),
    },
    { id: "c", label: "Review", content: <p>Everything looks good, {name || "friend"}.</p> },
  ];
  return <Wizard steps={steps} onFinish={async () => { await new Promise((r) => setTimeout(r, 500)); toast.success("Wizard finished"); }} />;
}

export default function Page() {
  const [cur, setCur] = useState(1);
  return (
    <ThemeMatrix>
      <Section title="Indicator, horizontal (click a reachable step)">
        <Stepper steps={base} current={cur} onStepClick={setCur} />
      </Section>
      <Section title="Statuses: completed, current, error, upcoming">
        <Stepper steps={[{ id: "1", label: "Done" }, { id: "2", label: "Failed", status: "error" }, { id: "3", label: "Current", status: "current" }, { id: "4", label: "Later" }]} current={2} />
      </Section>
      <Section title="Vertical and sizes">
        <div className="grid gap-6 sm:grid-cols-2">
          <Stepper orientation="vertical" steps={base} current={1} />
          <div className="grid gap-4">
            <Stepper size="sm" steps={base} current={0} />
            <Stepper size="lg" steps={base} current={2} />
          </div>
        </div>
      </Section>
      <Section title="Wizard with validation gate">
        <div className="max-w-2xl">
          <Demo />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
