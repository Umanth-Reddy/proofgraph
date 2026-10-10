import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { EventFeed, defineRenderers, type EventRowProps } from "../../ui/event-feed";
import { useEventStream } from "../../hooks/use-event-stream";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "event-feed", title: "EventFeed + useEventStream", group: "Live and code", step: 5, description: "Streaming log with per-type renderers, grouping, auto-scroll that pauses, “jump to latest” and connection status. Driven here by useEventStream in mock-replay mode." };

interface ScanEvent {
  sequence_number: number;
  event_type: "scan.started" | "evidence.accepted" | "evidence.rejected" | "scan.completed";
  actor: "scanner" | "verifier";
  message: string;
}

const fixtures: ScanEvent[] = [
  { sequence_number: 1, event_type: "scan.started", actor: "scanner", message: "Cloning acme/storefront" },
  { sequence_number: 2, event_type: "evidence.accepted", actor: "scanner", message: "app/routers/products.py:41-52 matches claim “REST API design”" },
  { sequence_number: 3, event_type: "evidence.accepted", actor: "scanner", message: "tests/test_products.py:8-30 corroborates" },
  { sequence_number: 4, event_type: "evidence.rejected", actor: "verifier", message: "README.md claim has no supporting code" },
  { sequence_number: 5, event_type: "evidence.accepted", actor: "verifier", message: "docker-compose.yml:1-22 matches “Docker”" },
  { sequence_number: 6, event_type: "scan.completed", actor: "verifier", message: "3 accepted, 1 rejected" },
];

function EvidenceRow({ event }: EventRowProps<ScanEvent>) {
  const ok = event.event_type === "evidence.accepted";
  return (
    <>
      {ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="Accepted" /> : <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-label="Rejected" />}
      <span className="min-w-0 flex-1 break-words">{event.message}</span>
      <Badge size="sm" tone={ok ? "success" : "danger"}>
        {ok ? "accepted" : "rejected"}
      </Badge>
    </>
  );
}

function LifecycleRow({ event }: EventRowProps<ScanEvent>) {
  return (
    <>
      <Badge size="sm" tone="info" variant="outline">
        {event.event_type}
      </Badge>
      <span className="min-w-0 flex-1 break-words text-fg-muted">{event.message}</span>
    </>
  );
}

const renderers = defineRenderers<ScanEvent>({ "evidence.accepted": EvidenceRow, "evidence.rejected": EvidenceRow, "scan.started": LifecycleRow, "scan.completed": LifecycleRow });

function Live() {
  const { events, status, reconnect } = useEventStream<ScanEvent>({
    mock: { events: fixtures, intervalMs: 700 },
    idOf: (e) => e.sequence_number,
    isTerminal: (e) => e.event_type === "scan.completed",
    maxEvents: 500,
  });
  return <EventFeed title="Live scan" events={events} status={status} getKey={(e) => e.sequence_number} getType={(e) => e.event_type} groupBy={(e) => e.actor} renderers={renderers} onReconnect={reconnect} />;
}

function Firehose() {
  const [events, setEvents] = useState<ScanEvent[]>([]);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(
      () =>
        setEvents((prev) => [
          ...prev,
          { sequence_number: prev.length + 1, event_type: "evidence.accepted", actor: "scanner", message: `Checked file ${prev.length + 1}` },
        ]),
      600,
    );
    return () => clearInterval(t);
  }, [running]);
  return (
    <div className="space-y-2">
      <Row>
        <Button size="sm" variant="outline" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause stream" : "Resume stream"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setEvents([])}>
          Clear
        </Button>
      </Row>
      <EventFeed title="Firehose (scroll up to pause following)" fixedHeight events={events} status={running ? "live" : "done"} getKey={(e) => e.sequence_number} getType={(e) => e.event_type} renderers={renderers} />
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Live replay (mock) with grouping by actor and per-type rows" hint="Restart appears when the stream is done.">
        <div className="max-w-2xl">
          <Live />
        </div>
      </Section>
      <Section title="Auto-scroll, pause on scroll-up, jump to latest">
        <div className="max-w-2xl">
          <Firehose />
        </div>
      </Section>
      <Section title="States and fallback row">
        <div className="grid max-w-2xl gap-3">
          <EventFeed title="Idle" events={[]} status="idle" getKey={(_, i) => i} />
          <EventFeed title="Connecting" events={[]} status="connecting" getKey={(_, i) => i} />
          <EventFeed title="Error" events={[]} status="error" getKey={(_, i) => i} onReconnect={() => {}} />
          <EventFeed title="Unknown types use the fallback row" events={[{ type: "custom.thing", payload: { a: 1 } }]} status="reconnecting" getKey={(_, i) => i} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
