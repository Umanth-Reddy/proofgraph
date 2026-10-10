import { useEffect, useRef, useState } from "react";
import { Combobox, type ComboboxOption } from "../../ui/combobox";
import { Field } from "../../ui/field";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "combobox", title: "Combobox", group: "Form controls", step: 2, description: "Searchable select: local filtering or async search, groups, clearable." };

const skills: ComboboxOption[] = [
  { value: "py", label: "Python", description: "Language", group: "Languages" },
  { value: "ts", label: "TypeScript", description: "Language", group: "Languages" },
  { value: "go", label: "Go", group: "Languages" },
  { value: "react", label: "React", description: "UI library", group: "Frameworks" },
  { value: "fastapi", label: "FastAPI", group: "Frameworks" },
  { value: "pg", label: "PostgreSQL", group: "Data" },
];

const universe = ["Aarhus", "Bangalore", "Berlin", "Bologna", "Boston", "Cairo", "Delhi", "Dublin", "Edinburgh", "Hanoi", "Hyderabad", "Kyoto", "Lagos", "Lima", "Oslo", "Pune"];

function Async() {
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const search = (q: string) => {
    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOptions(universe.filter((c) => c.toLowerCase().includes(q.toLowerCase())).slice(0, 6).map((c) => ({ value: c, label: c })));
      setLoading(false);
    }, 500);
  };
  return <Combobox options={options} loading={loading} onSearchChange={search} placeholder="Search a city" aria-label="Async city" clearable />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Local filtering, grouped">
        <div className="max-w-xs">
          <Combobox options={skills} placeholder="Pick a skill" aria-label="Skill" />
        </div>
      </Section>
      <Section title="Clearable, pre-selected">
        <div className="max-w-xs">
          <Combobox options={skills} defaultValue="react" clearable aria-label="Clearable" />
        </div>
      </Section>
      <Section title="Async search (500 ms fake latency)">
        <div className="max-w-xs">
          <Async />
        </div>
      </Section>
      <Section title="States">
        <div className="grid max-w-xs gap-3">
          <Combobox options={skills} disabled defaultValue="go" aria-label="Disabled" />
          <Combobox options={skills} invalid aria-label="Invalid" />
          <Combobox options={[]} loading aria-label="Loading" placeholder="Loading…" />
          <Combobox options={[]} aria-label="Empty" placeholder="No data" emptyLabel="Nothing to choose" />
        </div>
      </Section>
      <Section title="Inside Field">
        <div className="max-w-xs">
          <Field label="Primary skill" error="Choose one">
            <Combobox options={skills} />
          </Field>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
