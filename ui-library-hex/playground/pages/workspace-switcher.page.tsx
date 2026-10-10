import { Briefcase, GraduationCap, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { WorkspaceSwitcher } from "../../blocks/workspace-switcher";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "workspace-switcher", title: "WorkspaceSwitcher", group: "Layout", step: 7, description: "Switch role or organization (Student / College / Company / Admin)." };

const workspaces = [
  { id: "student", name: "Student", role: "Personal workspace", icon: <GraduationCap /> },
  { id: "college", name: "Acme Institute", role: "College admin", description: "Placement cell", icon: <LayoutGrid /> },
  { id: "company", name: "Acme Corp", role: "Recruiter", icon: <Briefcase /> },
  { id: "locked", name: "Platform", role: "Admin (no access)", icon: <LayoutGrid />, disabled: true },
];

function Controlled() {
  const [v, setV] = useState("company");
  return (
    <Row label={`controlled: ${v}`}>
      <div className="w-64">
        <WorkspaceSwitcher workspaces={workspaces} value={v} onValueChange={setV} onCreate={() => {}} />
      </div>
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Default">
        <div className="w-64">
          <WorkspaceSwitcher workspaces={workspaces} />
        </div>
      </Section>
      <Section title="Controlled with create action, and compact (icon-only)">
        <Controlled />
        <Row>
          <WorkspaceSwitcher workspaces={workspaces} compact />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
