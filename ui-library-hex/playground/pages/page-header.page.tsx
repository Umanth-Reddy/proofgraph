import { Download, Plus } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Tabs } from "../../ui/tabs";
import { PageHeader } from "../../layout/page-header";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "page-header", title: "PageHeader", group: "Layout", step: 7, description: "Breadcrumbs, title, description, status meta, actions and a tabs slot. Actions wrap under the title on narrow screens." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Full">
        <PageHeader
          breadcrumbs={[{ label: "Home", href: "#/page-header" }, { label: "Candidates", href: "#/page-header" }, { label: "Asha Rao" }]}
          title="Asha Rao"
          meta={<Badge tone="success" dot>Verified</Badge>}
          description="Backend developer · 14 of 16 claims verified."
          actions={
            <>
              <Button variant="outline" leading={<Download className="size-4" />}>Export</Button>
              <Button leading={<Plus className="size-4" />}>Shortlist</Button>
            </>
          }
          tabs={<Tabs label="Sections" items={[{ value: "overview", label: "Overview" }, { value: "evidence", label: "Evidence", count: 12 }, { value: "history", label: "History" }]} />}
          bordered
        />
      </Section>
      <Section title="Minimal and long title">
        <div className="grid gap-6">
          <PageHeader title="Dashboard" />
          <PageHeader title="A very long page title that should wrap instead of overflowing its container on narrow screens" description="Description text." actions={<Button>Primary</Button>} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
