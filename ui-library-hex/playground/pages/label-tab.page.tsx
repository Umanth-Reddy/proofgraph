import { AppWindow } from "../../ui/app-window";
import { LabelTab } from "../../ui/label-tab";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "label-tab", title: "LabelTab", group: "Hex pieces", step: 9, description: "A mono caption tab sitting on top of a window." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="On a window" hint="AppWindow squares its top-left corner when a LabelTab sits directly above it.">
        <div className="max-w-md">
          <LabelTab>Chat with the agent</LabelTab>
          <AppWindow title="Claims">Window content</AppWindow>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
