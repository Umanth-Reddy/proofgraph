import { DescriptionList } from "../../ui/description-list";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "description-list", title: "DescriptionList", group: "State blocks", step: 4, description: "Label/value facts on a semantic <dl>, with copyable and linked values." };

const items = [
  { label: "Repository", value: "acme/storefront", href: "#/description-list" },
  { label: "Commit", value: "15fedba9c2e1d04b", mono: true, copyable: true },
  { label: "Path", value: "app/routers/products.py", mono: true, copyable: true, hint: "Lines 41–52" },
  { label: "Verified at", value: "12 Oct 2026, 14:03" },
  { label: "Reviewer", value: null },
];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Horizontal (stacks on narrow screens), divided">
        <div className="max-w-xl">
          <DescriptionList items={items} divided />
        </div>
      </Section>
      <Section title="Stacked layout">
        <div className="max-w-sm">
          <DescriptionList items={items.slice(0, 3)} layout="stacked" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
