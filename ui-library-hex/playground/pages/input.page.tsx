import { AtSign, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Field } from "../../ui/field";
import { Kbd } from "../../ui/kbd";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "input", title: "Input", group: "Form controls", step: 2, description: "Text input with prefix/suffix slots, sizes, variants and invalid / disabled / loading states." };

function Controlled() {
  const [v, setV] = useState("controlled");
  return (
    <Row label={`controlled: "${v}"`}>
      <div className="w-64">
        <Input value={v} onValueChange={setV} aria-label="Controlled input" />
      </div>
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid max-w-sm gap-3">
          <Input size="sm" placeholder="Small" aria-label="Small" />
          <Input size="md" placeholder="Medium" aria-label="Medium" />
          <Input size="lg" placeholder="Large" aria-label="Large" />
        </div>
      </Section>
      <Section title="Variants and states">
        <div className="grid max-w-sm gap-3">
          <Input variant="outline" placeholder="Outline" aria-label="Outline" />
          <Input variant="filled" placeholder="Filled" aria-label="Filled" />
          <Input placeholder="Disabled" disabled aria-label="Disabled" />
          <Input defaultValue="Invalid value" invalid aria-label="Invalid" />
          <Input defaultValue="Read only" readOnly aria-label="Read only" />
          <Input placeholder="Searching…" loading aria-label="Loading" />
        </div>
      </Section>
      <Section title="Slots">
        <div className="grid max-w-sm gap-3">
          <Input prefix={<Search className="size-4" />} placeholder="Search" aria-label="With prefix" suffix={<Kbd size="sm" keys={["/"]} />} />
          <Input prefix={<AtSign className="size-4" />} placeholder="username" aria-label="Handle" />
          <Input prefix="https://" suffix=".com" placeholder="domain" aria-label="URL" />
        </div>
      </Section>
      <Section title="Inside Field">
        <div className="max-w-sm">
          <Field label="Email" hint="Hint text" error="Enter a valid email">
            <Input defaultValue="not-an-email" />
          </Field>
        </div>
      </Section>
      <Controlled />
    </ThemeMatrix>
  );
}
