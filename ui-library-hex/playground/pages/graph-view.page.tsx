import { useState } from "react";
import { GraphView, type GraphEdge, type GraphLayout, type GraphNode, type GraphStyleMap } from "../../ui/graph-view";
import { SegmentedControl } from "../../ui/segmented-control";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "graph-view", title: "GraphView", group: "Charts", step: 8, description: "Cytoscape graph styled by tokens: styleMap by type, layouts, selection with neighbour highlight, fit/zoom, minimap, keyboard navigation and a screen-reader node list." };

const nodes: GraphNode[] = [
  { id: "py", label: "Python", type: "skill", weight: 1.4 },
  { id: "fastapi", label: "FastAPI", type: "skill" },
  { id: "pg", label: "PostgreSQL", type: "skill" },
  { id: "docker", label: "Docker", type: "skill" },
  { id: "e1", label: "products.py", type: "evidence" },
  { id: "e2", label: "test_products.py", type: "evidence" },
  { id: "e3", label: "compose.yml", type: "evidence" },
  { id: "c1", label: "Claim: REST design", type: "claim" },
  { id: "x1", label: "Similar repo", type: "cluster" },
];
const edges: GraphEdge[] = [
  { source: "py", target: "fastapi", type: "relates" },
  { source: "fastapi", target: "pg", type: "relates" },
  { source: "docker", target: "pg", type: "relates" },
  { source: "e1", target: "py", type: "supports" },
  { source: "e1", target: "fastapi", type: "supports" },
  { source: "e2", target: "fastapi", type: "supports" },
  { source: "e3", target: "docker", type: "supports" },
  { source: "c1", target: "e1", type: "supports", label: "backed by" },
  { source: "e1", target: "x1", type: "similar" },
];
const styleMap: GraphStyleMap = {
  nodes: { skill: { tone: "info", label: "Skill" }, evidence: { tone: "success", shape: "round-rectangle", label: "Evidence" }, claim: { tone: "warning", shape: "diamond", label: "Claim" }, cluster: { tone: "danger", shape: "hexagon", label: "Integrity cluster" } },
  edges: { supports: { tone: "success", directed: true }, similar: { tone: "danger", dashed: true }, relates: {} },
};

function Demo() {
  const [layout, setLayout] = useState<GraphLayout>("cose");
  const [sel, setSel] = useState<string | null>("fastapi");
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl size="sm" label="Layout" value={layout} onValueChange={setLayout} options={(["cose", "breadthfirst", "circle", "grid"] as const).map((l) => ({ value: l, label: l }))} />
        <span className="text-xs text-fg-muted">selected = {sel ?? "none"}</span>
      </div>
      <GraphView nodes={nodes} edges={edges} styleMap={styleMap} layout={layout} selectedId={sel} onSelect={setSel} minimap legend height={380} />
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Skill graph (select a node; use the controls; Tab into the graph for arrow-key navigation)">
        <Demo />
      </Section>
      <Section title="States">
        <div className="grid gap-4 sm:grid-cols-2">
          <GraphView nodes={[]} edges={[]} height={160} />
          <GraphView nodes={[]} edges={[]} loading height={160} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
