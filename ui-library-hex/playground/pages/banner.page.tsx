import { useState } from "react";
import { Banner } from "../../ui/banner";
import { Button } from "../../ui/button";
import { Link } from "../../ui/link";
import { TONES } from "../../lib/tone";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "banner", title: "Banner", group: "Feedback", step: 3, description: "Page-wide, optionally dismissible notice (demo mode, maintenance, integrity)." };

function Controlled() {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-2">
      <Banner open={open} onOpenChange={setOpen} dismissible tone="warning">
        Controlled banner.
      </Banner>
      {!open ? <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Show again</Button> : null}
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Subtle">
        <div className="grid gap-px overflow-hidden rounded-control border border-border">
          {TONES.map((t) => (
            <Banner key={t} tone={t}>
              {t}: Everything on this page uses sample data.
            </Banner>
          ))}
        </div>
      </Section>
      <Section title="Solid, with action and dismiss">
        <div className="grid gap-2">
          <Banner variant="solid" tone="info" dismissible action={<Link href="#/banner" variant="plain" underline="always">Learn more</Link>}>
            You are viewing the demo. Data resets every hour.
          </Banner>
          <Banner variant="solid" tone="danger" dismissible>
            Scheduled maintenance tonight at 22:00 UTC.
          </Banner>
          <Controlled />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
