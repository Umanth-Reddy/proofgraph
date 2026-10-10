import { Field } from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select } from "../../ui/select";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "field", title: "Field", group: "Form controls", step: 2, description: "Label, hint, error and required marker with auto-wired ids. Wraps every control." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="States" hint="Click a label to focus its control; hint and error are linked via aria-describedby.">
        <div className="grid max-w-xl gap-4">
          <Field label="Email" hint="We only use this for sign-in.">
            <Input type="email" placeholder="you@example.com" />
          </Field>
          <Field label="Full name" required>
            <Input placeholder="Required field" />
          </Field>
          <Field label="Username" error="That username is taken.">
            <Input defaultValue="asha" />
          </Field>
          <Field label="Locked" disabled hint="Disabled via Field">
            <Input defaultValue="read only for now" />
          </Field>
          <Field label="Hidden label (still announced)" hideLabel>
            <Input placeholder="Search…" />
          </Field>
        </div>
      </Section>
      <Section title="Wraps any control">
        <div className="grid max-w-xl gap-4">
          <Field label="Bio" hint="Max 200 characters">
            <Textarea maxLength={200} showCounter />
          </Field>
          <Field label="Role" error="Pick a role">
            <Select options={[{ value: "a", label: "Student" }, { value: "b", label: "Recruiter" }]} />
          </Field>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
