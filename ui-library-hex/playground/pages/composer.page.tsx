import { useState } from "react";
import { Plus } from "lucide-react";
import { IconButton } from "../../ui/button";
import { Composer } from "../../ui/composer";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "composer", title: "Composer", group: "Hex pieces", step: 9, description: "Message box with a send button: box and inline variants." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Box" hint="Enter sends, Shift+Enter adds a line. An uncontrolled composer clears itself.">
        <div className="max-w-lg">
          <Composer leading={<IconButton label="Add attachment" size="sm" variant="outline"><Plus className="size-4" /></IconButton>} trailing={<span className="text-xs text-fg-muted">Galactic Warehouse</span>} onSubmit={() => undefined} />
        </div>
      </Section>
      <Section title="Inline">
        <div className="max-w-lg"><Composer variant="inline" placeholder="Do anything" /></div>
      </Section>
      <Section title="Controlled, loading and disabled">
        <div className="grid max-w-lg gap-3">
          <Controlled />
          <Composer defaultValue="Working on it" loading />
          <Composer disabled placeholder="Unavailable" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}

function Controlled() {
  const [value, setValue] = useState("Draft kept by the parent");
  return <Composer value={value} onValueChange={setValue} onSubmit={() => setValue("")} />;
}
