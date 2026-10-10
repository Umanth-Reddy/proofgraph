import { useState } from "react";
import { Select, type SelectOption } from "../../ui/select";
import { Field } from "../../ui/field";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "select", title: "Select", group: "Form controls", step: 2, description: "Single select with groups, sizes and invalid / disabled / loading / empty states." };

const roles: SelectOption[] = [
  { value: "student", label: "Student", group: "People" },
  { value: "faculty", label: "Faculty", group: "People" },
  { value: "recruiter", label: "Recruiter", group: "Companies" },
  { value: "hr", label: "HR partner", group: "Companies" },
  { value: "admin", label: "Admin", group: "Internal", disabled: true },
];

function Controlled() {
  const [v, setV] = useState("faculty");
  return (
    <div className="max-w-xs">
      <Select options={roles} value={v} onValueChange={setV} aria-label="Controlled" />
      <p className="mt-1 text-xs text-fg-muted">value = {v}</p>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid max-w-xs gap-3">
          <Select size="sm" options={roles} aria-label="Small" />
          <Select size="md" options={roles} aria-label="Medium" />
          <Select size="lg" options={roles} aria-label="Large" />
        </div>
      </Section>
      <Section title="Grouped, with a disabled option">
        <div className="max-w-xs">
          <Select options={roles} placeholder="Pick a role" aria-label="Grouped" />
        </div>
      </Section>
      <Section title="States">
        <div className="grid max-w-xs gap-3">
          <Select options={roles} defaultValue="student" disabled aria-label="Disabled" />
          <Select options={roles} invalid aria-label="Invalid" />
          <Select options={roles} loading aria-label="Loading" placeholder="Loading options…" />
          <Select options={[]} aria-label="Empty" placeholder="No options yet" />
        </div>
      </Section>
      <Section title="Controlled and inside Field">
        <Controlled />
        <div className="mt-4 max-w-xs">
          <Field label="Role" hint="Decides your dashboard." required>
            <Select options={roles} />
          </Field>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
