import { Breadcrumbs } from "../../layout/breadcrumbs";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "breadcrumbs", title: "Breadcrumbs", group: "Layout", step: 7, description: "Trail with the current page last; long trails collapse the middle into a menu." };

const item = (label: string) => ({ label, href: "#/breadcrumbs" });

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Short trail">
        <Breadcrumbs items={[item("Home"), item("Candidates"), { label: "Asha Rao" }]} />
      </Section>
      <Section title="Collapsed (more than 4 items)">
        <Breadcrumbs items={[item("Home"), item("Colleges"), item("Acme Institute"), item("Batch 2026"), item("Computer Science"), { label: "Asha Rao" }]} />
      </Section>
      <Section title="Long labels truncate, custom separator">
        <div className="max-w-sm">
          <Breadcrumbs separator={<span>/</span>} items={[item("A very long organisation name that keeps going"), item("Another quite long section name"), { label: "The current page also has a long title" }]} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
