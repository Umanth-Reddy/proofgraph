import { GitBranch, Briefcase } from "lucide-react";
import { useState } from "react";
import { ConnectAccountCard, type ConnectionStatus } from "../../ui/connect-account-card";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "connect-account-card", title: "ConnectAccountCard", group: "Flows", step: 6, description: "Provider, status, connect / disconnect (with confirmation) and last sync." };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Live() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  return (
    <ConnectAccountCard
      provider="GitHub"
      icon={<GitBranch />}
      description="Read your public repositories to verify claims."
      status={status}
      account="@asha-rao"
      lastSyncedAt={Date.now() - 3 * 3600_000}
      onConnect={async () => { setStatus("connecting"); await wait(900); setStatus("connected"); }}
      onSync={async () => { setStatus("syncing"); await wait(1200); setStatus("connected"); }}
      onDisconnect={async () => { await wait(600); setStatus("disconnected"); }}
    />
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Interactive (connect → sync → disconnect with confirmation)">
        <div className="max-w-2xl">
          <Live />
        </div>
      </Section>
      <Section title="Every status">
        <div className="grid max-w-2xl gap-3">
          {(["disconnected", "connecting", "connected", "syncing"] as const).map((s) => (
            <ConnectAccountCard key={s} provider="LinkedIn" icon={<Briefcase />} status={s} account="in/asha" lastSyncedAt={Date.now() - 86_400_000} onConnect={() => {}} onSync={() => {}} onDisconnect={() => {}} />
          ))}
          <ConnectAccountCard provider="GitHub" icon={<GitBranch />} status="error" error="The access token expired." onConnect={() => {}} onDisconnect={() => {}} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
