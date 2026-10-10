import { Settings, Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import { AppWindow } from "../../ui/app-window";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "app-window", title: "AppWindow", group: "Hex pieces", step: 9, description: "Framed app mockup: app bar, macOS chrome bar, or bare." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="App bar">
        <AppWindow title="Galactic Revenue Insights" logo={<span className="font-bold tracking-tight">ProofGraph</span>} actions={<Button size="sm" variant="outline">Share</Button>}>
          <p className="text-fg-muted">Body area scrolls inside the window.</p>
        </AppWindow>
      </Section>
      <Section title="Chrome bar">
        <Row className="grid gap-4 sm:grid-cols-2">
          <AppWindow chrome title="Show Q3 sales" actions={<Settings className="size-3.5" aria-hidden="true" />}>Centered title</AppWindow>
          <AppWindow chrome titleAlign="start" title="# Slack">Start-aligned title</AppWindow>
        </Row>
      </Section>
      <Section title="Bare">
        <AppWindow bare aria-label="Preview"><p className="flex items-center gap-2"><Share2 className="size-4" aria-hidden="true" /> No bar</p></AppWindow>
      </Section>
    </ThemeMatrix>
  );
}
