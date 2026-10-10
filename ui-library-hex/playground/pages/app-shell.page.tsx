import { BarChart3, Bell, Briefcase, GraduationCap, Home, LayoutGrid, Settings, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { AppShell, type NavSection } from "../../layout/app-shell";
import { PageHeader } from "../../layout/page-header";
import { UserMenu } from "../../blocks/user-menu";
import { WorkspaceSwitcher } from "../../blocks/workspace-switcher";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "app-shell", title: "AppShell", group: "Layout", step: 7, description: "Sidebar + topbar + main. Collapses to an icon rail on desktop; below lg the sidebar is a Sheet opened from the topbar. Nav comes from config; bring your own router via renderLink / onNavigate." };

const nav: NavSection[] = [
  {
    items: [
      { id: "home", label: "Dashboard", icon: <Home className="size-4" />, href: "#/app-shell" },
      { id: "people", label: "Candidates", icon: <Users className="size-4" />, href: "#/app-shell", badge: 12 },
      { id: "jobs", label: "Job posts", icon: <Briefcase className="size-4" />, href: "#/app-shell" },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "reports", label: "Reports", icon: <BarChart3 className="size-4" />, href: "#/app-shell" },
      { id: "alerts", label: "Alerts", icon: <Bell className="size-4" />, href: "#/app-shell", badge: 3 },
      { id: "integrity", label: "Integrity", icon: <ShieldCheck className="size-4" />, href: "#/app-shell", disabled: true },
    ],
  },
  { label: "Account", items: [{ id: "settings", label: "Settings", icon: <Settings className="size-4" />, href: "#/app-shell" }] },
];

const workspaces = [
  { id: "student", name: "Student", role: "Personal workspace", icon: <GraduationCap /> },
  { id: "company", name: "Acme Corp", role: "Company", icon: <Briefcase /> },
  { id: "admin", name: "Platform", role: "Admin", icon: <LayoutGrid /> },
];

function Shell() {
  const [active, setActive] = useState("people");
  return (
    <div className="h-[28rem] overflow-hidden rounded-card border border-border">
      <AppShell
        contained
        nav={nav}
        activeId={active}
        onNavigate={(item, e) => {
          e.preventDefault();
          setActive(item.id);
        }}
        brand={<span className="text-sm font-semibold">ProofGraph</span>}
        brandCollapsed={<span className="text-sm font-bold">PG</span>}
        sidebarHeader={({ collapsed }) => <WorkspaceSwitcher workspaces={workspaces} compact={collapsed} />}
        topbar={
          <>
            <span className="min-w-0 flex-1 truncate text-sm text-fg-muted">Acme Corp / Candidates</span>
            <UserMenu user={{ name: "Asha Rao", email: "asha@example.com" }} size="sm" items={[{ label: "Profile" }, { label: "Settings" }]} onSignOut={() => {}} />
          </>
        }
      >
        <PageHeader title={nav.flatMap((s) => s.items).find((i) => i.id === active)?.label ?? ""} description="Content area scrolls independently." />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="rounded-control border border-border bg-bg-raised p-3 text-sm">Row {i + 1}</div>
          ))}
        </div>
      </AppShell>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Shell (use the collapse button; at narrow widths use the menu button)">
        <Shell />
      </Section>
    </ThemeMatrix>
  );
}
