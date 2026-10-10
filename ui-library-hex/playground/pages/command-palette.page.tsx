import { FileText, Home, Moon, Settings, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { CommandPalette, type CommandGroup } from "../../ui/command-palette";
import { Kbd } from "../../ui/kbd";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "command-palette", title: "CommandPalette", group: "Overlays", step: 3, description: "⌘K navigation: grouped results, keywords, recent items and a global hotkey." };

const icon = (I: typeof Home) => <I className="size-4" />;
const groups: CommandGroup[] = [
  {
    heading: "Navigate",
    items: [
      { id: "home", label: "Go to dashboard", icon: icon(Home), shortcut: ["G", "D"] },
      { id: "people", label: "Candidates", description: "Browse the talent directory", icon: icon(Users), keywords: ["students", "directory"] },
      { id: "docs", label: "Documentation", icon: icon(FileText) },
    ],
  },
  {
    heading: "Settings",
    items: [
      { id: "settings", label: "Open settings", icon: icon(Settings), shortcut: ["⌘", ","] },
      { id: "theme", label: "Toggle dark mode", icon: icon(Moon), keywords: ["theme", "appearance"] },
      { id: "locked", label: "Billing (locked)", disabled: true },
    ],
  },
];

function Demo({ hotkey }: { hotkey: string | false }) {
  const [last, setLast] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Row label={last ? `ran: ${last}` : "nothing run yet"}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} hotkey={hotkey} groups={groups} recent={[groups[0].items[1]]} onRun={(i) => setLast(i.label)} />
    </Row>
  );
}

export default function Page() {
  return (
    <>
      <Section title="Global hotkey" hint="This instance listens for the shortcut anywhere on the page.">
        <Row>
          <span className="inline-flex items-center gap-2">
            Press <Kbd keys={["⌘/Ctrl", "K"]} size="sm" />
          </span>
          <Demo hotkey="mod+k" />
        </Row>
      </Section>
      <ThemeMatrix>
        <Section title="Under each scope (hotkey off)">
          <Demo hotkey={false} />
        </Section>
      </ThemeMatrix>
    </>
  );
}
