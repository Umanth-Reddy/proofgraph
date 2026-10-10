import { AppWindow } from "../../ui/app-window";
import { Terminal, TerminalToken } from "../../ui/terminal";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "terminal", title: "Terminal", group: "Hex pieces", step: 9, description: "Preformatted command output with coloured tokens." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="In a chrome window">
        <AppWindow chrome title="ProofGraph CLI">
          <Terminal aria-label="Create scan" caret>
            {"$ proofgraph scan create \"acme/api\"\n\n"}
            <TerminalToken kind="key">Scan ID:</TerminalToken>{"  "}<TerminalToken kind="value">019fb3c7-0dbe-7550-b735</TerminalToken>{"\n"}
            <TerminalToken kind="key">Created:</TerminalToken>{"  "}<TerminalToken kind="value">2026-10-10T16:06:34Z</TerminalToken>{"\n"}
            <TerminalToken kind="key">URL:</TerminalToken>{"      "}<TerminalToken kind="url">https://example.app/scan/019fb3c7</TerminalToken>{"\n"}
            <TerminalToken kind="muted">queued behind 2 scans</TerminalToken>{"\n$ "}
          </Terminal>
        </AppWindow>
      </Section>
    </ThemeMatrix>
  );
}
