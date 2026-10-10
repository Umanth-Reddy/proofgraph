import { useState } from "react";
import { ArrowUp, ChevronDown, Eye, FileText, FolderOpen, History, LayoutDashboard, MessageSquare, Mic, NotebookText, Package, Plus, Sparkles, Timer, Variable } from "lucide-react";
import { Avatar } from "../../ui/avatar";
import { BarChart } from "../../ui/bar-chart";
import { Button, IconButton } from "../../ui/button";
import { Card } from "../../ui/card";
import { CodeViewer } from "../../ui/code-viewer";
import { Composer } from "../../ui/composer";
import { DisplayHeading } from "../../ui/display-heading";
import { GuideLine, PageFrame } from "../../ui/page-frame";
import { Arcs } from "../../ui/arcs";
import { AppWindow } from "../../ui/app-window";
import { CropMarks } from "../../ui/crop-marks";
import { Heading } from "../../ui/heading";
import { HexBadge } from "../../ui/hex-badge";
import { LabelTab } from "../../ui/label-tab";
import { Link } from "../../ui/link";
import { Quote } from "../../ui/quote";
import { SegmentedControl } from "../../ui/segmented-control";
import { Select } from "../../ui/select";
import { Sparkline } from "../../ui/sparkline";
import { StatCard } from "../../ui/stat-card";
import { Tabs } from "../../ui/tabs";
import { Terminal, TerminalToken } from "../../ui/terminal";
import { Text } from "../../ui/text";
import { AnimatedCheckbox, DotFieldBackground, GlassPillNav, HeroWaves, StaggeredText, ThoughtLine } from "../../blocks/motion";
import type { PageMeta } from "../types";

export const meta: PageMeta = {
  id: "hex",
  title: "Hex",
  group: "Hex",
  step: 0,
  description: "The hex look in context: every piece is a library element or a motion element. Follows the global skin, theme and density controls.",
};

const concepts = [
  { concept: "REST APIs", verified: 6, weak: 2, unverified: 0 },
  { concept: "Authentication", verified: 4, weak: 3, unverified: 1 },
  { concept: "Database Design", verified: 5, weak: 1, unverified: 1 },
  { concept: "Asynchronous Work", verified: 2, weak: 4, unverified: 2 },
  { concept: "Caching", verified: 0, weak: 3, unverified: 4 },
  { concept: "Automated Tests", verified: 3, weak: 2, unverified: 1 },
  { concept: "CI/CD", verified: 2, weak: 1, unverified: 0 },
  { concept: "Error Handling", verified: 3, weak: 2, unverified: 1 },
];
const series = [
  { key: "verified", label: "Verified", tone: "success" as const },
  { key: "weak", label: "Weak", tone: "warning" as const },
  { key: "unverified", label: "Unverified", tone: "neutral" as const },
];

const views = [
  { value: "claims", label: "Claims", icon: <MessageSquare className="size-4" aria-hidden="true" />, content: null },
  { value: "graph", label: "Skill graph", icon: <NotebookText className="size-4" aria-hidden="true" />, content: null },
  { value: "viva", label: "Viva", icon: <LayoutDashboard className="size-4" aria-hidden="true" />, content: null },
];

const Wordmark = () => <span className="font-(family-name:--font-display) text-sm font-bold tracking-[-0.03em] [font-stretch:118%]">ProofGraph</span>;

function ConceptChart({ height = 220 }: { height?: number }) {
  return <BarChart label="Evidence by concept" data={concepts} xKey="concept" series={series} stacked orientation="horizontal" categoryWidth={116} height={height} />;
}

function AgentWindow() {
  const [view, setView] = useState("claims");
  const [working, setWorking] = useState(false);
  return (
    <div className="min-w-0">
      <LabelTab>Chat with the agent</LabelTab>
      <AppWindow
        title="Backend SDE · readiness"
        logo={<Wordmark />}
        actions={<><span className="hidden sm:block"><Tabs label="View" variant="pill" size="sm" items={views} value={view} onValueChange={setView} /></span><Button size="sm" variant="outline">Share</Button></>}
        classNames={{ body: "flex flex-col gap-3" }}
        className="h-[720px]"
      >
        <Card variant="outline"><div className="p-2"><ConceptChart height={170} /></div></Card>
        <Text>Caching has code in two repositories but no accepted evidence yet. Take the viva on <code>cache.py</code> to move it from Weak.</Text>
        <div className="self-end rounded-card border border-(color:--accent-border) bg-accent-subtle px-3 py-2 text-accent-fg">Which concept is holding my Readiness back?</div>
        <ThoughtLine working={working} steps={["Reading your claims", "Matching evidence to commits", "Ranking gaps by readiness"]} fontSize={14} elapsed={11} key={String(working)} />
        <Text>Caching is the biggest single gap: <strong>4 of 7 items are unverified</strong>, and it is part of both target roles.</Text>
        <div><Button size="sm" variant="ghost" onClick={() => setWorking((w) => !w)}>{working ? "Settle" : "Replay thinking"}</Button></div>
        <div className="mt-auto"><Composer placeholder="Ask about a concept…" trailing={<span className="text-xs text-fg-muted">demo-repo <ChevronDown className="inline size-3" aria-hidden="true" /></span>} leading={<IconButton label="Add" size="sm" variant="outline"><Plus className="size-4" /></IconButton>} /></div>
      </AppWindow>
    </div>
  );
}

function SideWindows() {
  const [agent, setAgent] = useState("student");
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
      <div className="min-w-0">
        <SegmentedControl size="sm" label="Role" value={agent} onValueChange={setAgent} options={[{ value: "student", label: "Student" }, { value: "college", label: "College" }]} />
        <div className="mt-2">
          <AppWindow chrome titleAlign="start" title="Show my gaps" className="h-[280px]" classNames={{ body: "flex flex-col gap-2" }}>
            <div className="inline-flex w-fit items-center gap-2 rounded-card border border-border bg-bg-subtle px-2 py-1"><Avatar size="sm" name="P G" />Get my top three gaps</div>
            <span className="font-mono text-xs text-fg-subtle">Worked for 27s</span>
            <Text><strong>Top gaps</strong></Text>
            <Text>1. Caching · 2. Asynchronous Work · 3. Automated Tests</Text>
            <div className="mt-auto"><Composer variant="inline" placeholder="Do anything" trailing={<IconButton label="Voice" size="sm" variant="ghost"><Mic className="size-4" /></IconButton>} /></div>
          </AppWindow>
        </div>
      </div>
      <AppWindow chrome title="# placement-cell">
        <div className="grid gap-3">
          <div className="flex gap-2"><Avatar name="Julia R" /><div><div className="flex items-baseline gap-2"><strong>Julia</strong><span className="text-xs text-fg-subtle">4 min ago</span></div><p>Which CS-B students are ready for the backend drive?</p></div></div>
          <div className="flex items-center gap-2 text-fg-subtle"><span>3 replies</span><span className="h-px flex-1 bg-border" /></div>
          <div className="flex gap-2"><Avatar name="P G" tone="info" shape="square" /><div><div className="flex items-baseline gap-2"><strong>ProofGraph</strong><span className="text-xs text-fg-subtle">4 min ago</span></div><p>42 students are Verified on at least five of the eight concepts.</p><Button size="sm" variant="outline" className="mt-2">Open batch</Button></div></div>
        </div>
      </AppWindow>
      <AppWindow chrome title="ProofGraph CLI">
        <Terminal aria-label="Create scan" caret>
          {"$ proofgraph scan create \"acme/api\"\n"}
          <TerminalToken kind="key">Scan ID:</TerminalToken>{" "}<TerminalToken kind="value">019fb3c7-0dbe-7550</TerminalToken>{"\n"}
          <TerminalToken kind="key">Created:</TerminalToken>{"  2026-10-10T16:06:34Z\n"}
          <TerminalToken kind="key">URL:</TerminalToken>{"      "}<TerminalToken kind="url">https://example.app/scan/019fb3c7</TerminalToken>{"\n$ "}
        </Terminal>
      </AppWindow>
    </div>
  );
}

function Showcase() {
  return (
    <section className="relative py-10">
      <Arcs />
      <Heading level={2} size="xl" className="relative mb-8">Notebook, chat and <em>data</em> app</Heading>
      <div className="relative grid gap-6 lg:grid-cols-3 lg:gap-0">
        <div className="min-w-0 lg:pr-0 lg:[&>div]:-mr-4">
          <LabelTab>Agentic evidence notebooks</LabelTab>
          <AppWindow title="Claim: Caching" logo={<Wordmark />} className="h-[520px]" classNames={{ body: "flex gap-2 p-0" }}>
            <nav aria-label="Notebook tools" className="flex flex-col items-center gap-2 border-r border-border px-1.5 py-2 text-fg-muted">
              {[[Sparkles, "Evidence"], [Package, "Detectors"], [FolderOpen, "Repos"], [Variable, "Variables"], [Timer, "Scans"], [History, "History"]].map(([Icon, name]) => {
                const I = Icon as typeof Sparkles;
                return <IconButton key={name as string} label={name as string} size="sm" variant="ghost"><I className="size-4" /></IconButton>;
              })}
            </nav>
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
              <Sparkline data={[2, 3, 3, 5, 4, 6, 8, 7, 9]} area showLast className="h-16 w-full" />
              <CodeViewer language="python" lineNumbers={false} header="Python cell" code={'def get_user(user_id):\n    # cache hit: skip the database\n    if user_id in cache:\n        return cache[user_id]\n    user = db.fetch(user_id)\n    cache[user_id] = user\n    return user'} />
            </div>
          </AppWindow>
        </div>
        <div className="relative z-10 min-w-0 lg:-mx-0">
          <LabelTab>Conversational self-serve</LabelTab>
          <AppWindow title="Backend SDE" logo={<Wordmark />} className="h-[560px]" classNames={{ body: "flex flex-col gap-3" }}>
            <ThoughtLine working={false} elapsed={11} steps={["Compared three role templates", "Picked Backend SDE"]} fontSize={14} />
            <Card variant="outline"><div className="p-2"><ConceptChart height={230} /></div></Card>
            <div className="mt-auto"><Composer placeholder="Ask another question…" className="shadow-[0_0_0_1px_var(--accent-border),0_0_0_4px_var(--accent-subtle)]" /></div>
          </AppWindow>
        </div>
        <div className="min-w-0 lg:[&>div]:-ml-4">
          <LabelTab>Beautiful data apps</LabelTab>
          <AppWindow title="Overview" className="relative h-[520px]" actions={<><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="outline">Share</Button></>}>
            <div className="grid gap-3">
              <Text size="sm" emphasis="muted">Readiness across target roles and concepts.</Text>
              <div className="grid grid-cols-2 gap-2">
                <Card variant="outline"><div className="p-3"><StatCard label="Honesty (0–100)" value={78} delta={4.2} /></div></Card>
                <Card variant="outline"><div className="p-3"><StatCard label="Readiness (0–100)" value={64} delta={-1.5} /></div></Card>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select size="sm" aria-label="Role" options={[{ value: "be", label: "Backend SDE" }, { value: "fs", label: "Full-stack" }]} defaultValue="be" />
                <Select size="sm" aria-label="Period" options={[{ value: "q3", label: "Q3" }, { value: "q2", label: "Q2" }]} defaultValue="q3" />
              </div>
              <Card variant="outline"><div className="p-2"><ConceptChart height={180} /></div></Card>
            </div>
            <Button variant="outline" className="absolute bottom-4 right-4 rounded-full shadow-float"><Sparkles className="size-4" aria-hidden="true" />Agent</Button>
          </AppWindow>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [done, setDone] = useState(false);
  return (
    <PageFrame className="py-0">
      {/* Hero: dot field, glass pill nav, display headline, staggered lead, handles CTA */}
      <section className="relative min-h-[460px] overflow-hidden py-24">
        <DotFieldBackground />
        <div className="relative"><GlassPillNav logo={<Eye className="size-6" aria-hidden="true" />} logoAlt="ProofGraph" activeHref="#platform" items={[{ label: "Platform", href: "#platform" }, { label: "Pricing", href: "#pricing" }, { label: "Docs", href: "#docs" }]} /></div>
        <div className="relative mt-16 grid gap-6">
          <DisplayHeading as="h1" size="lg">Proof, <em>not</em> claims</DisplayHeading>
          <StaggeredText as="p" className="max-w-xl text-lg text-fg-muted" segmentBy="words" delay={40} direction="bottom" text="Every skill on the profile links to the code that shows it and the quiz that confirms it." />
          <div className="flex flex-wrap items-center gap-6">
            <Button size="lg" data-handles>Get started free</Button>
            <Button size="lg" variant="outline">Request a demo</Button>
          </div>
        </div>
      </section>
      <GuideLine dashed />

      {/* Feature split: copy and quote above, windows below */}
      <section className="grid gap-10 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid content-start gap-5">
            <HexBadge size="md"><Eye /></HexBadge>
            <Heading level={2} size="xl">Trusted skills, <em>shown</em> not told</Heading>
            <Text emphasis="muted">Claims are compared with evidence in the student’s own code. The quiz is the gate, not a shortcut. Fixed, versioned rules compute every score, so the result is the same on every scan.</Text>
            <div><Button variant="outline">Explore the evidence trail</Button></div>
          </div>
          <div className="grid content-end gap-5">
            <GuideLine dashed />
            <Quote author="Placement officer." role="Example College"><strong>Seeing the exact commit and line behind every skill</strong> changed how we shortlist.</Quote>
          </div>
        </div>
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <AgentWindow />
          <SideWindows />
        </div>
      </section>
      <GuideLine />

      <Showcase />
      <GuideLine />

      {/* Waves band + checklist */}
      <section className="relative my-10 grid min-h-[360px] items-center overflow-hidden rounded-card border border-border">
        <HeroWaves />
        <div className="relative grid gap-5 p-8">
          <DisplayHeading size="sm">See the score <em>move</em></DisplayHeading>
          <div className="grid gap-1 rounded-card bg-bg-raised/80 p-4 backdrop-blur sm:max-w-sm">
            <AnimatedCheckbox label="Connect GitHub" defaultChecked />
            <AnimatedCheckbox label="Upload the LinkedIn export" checked={done} onChange={setDone} strike="center" />
            <AnimatedCheckbox label="Take the viva" disabled />
          </div>
        </div>
      </section>
      <GuideLine />

      {/* Buttons */}
      <section className="py-10">
        <Heading level={2} size="xl" className="mb-6">Buttons</Heading>
        <div className="flex flex-wrap items-center gap-6">
          <Button data-handles>Get started</Button>
          <Button>Primary, no handles</Button>
          <Button variant="outline">Explore the evidence trail</Button>
          <Button size="sm" variant="outline">Share</Button>
          <IconButton label="Add" size="sm" variant="outline"><Plus className="size-4" /></IconButton>
          <Button variant="outline" className="rounded-full shadow-float"><FileText className="size-4" aria-hidden="true" />Agent</Button>
          <IconButton label="Send" tone="neutral" variant="solid" className="rounded-full"><ArrowUp className="size-4" /></IconButton>
          <Link href="#/hex">Text link</Link>
          <Button disabled variant="outline">Disabled</Button>
          <CropMarks className="px-4 py-2">Crop marks</CropMarks>
        </div>
      </section>
    </PageFrame>
  );
}
