import { FolderOpen, Search } from "lucide-react";
import { Button } from "../../ui/button";
import { EmptyState } from "../../ui/empty-state";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "empty-state", title: "EmptyState", group: "State blocks", step: 4, description: "“Nothing here yet”: icon, message and the next action." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid gap-3">
          {(["sm", "md", "lg"] as const).map((s) => (
            <EmptyState key={s} size={s} bordered icon={<FolderOpen />} title={`No repositories (${s})`} description="Connect GitHub to see your repositories and start a scan." action={<Button size="sm">Connect GitHub</Button>} />
          ))}
        </div>
      </Section>
      <Section title="Variants">
        <div className="grid gap-3">
          <EmptyState title="Plain, text only" />
          <EmptyState bordered icon={<Search />} title="No matches" description="Try a different filter." action={<Button size="sm" variant="outline">Clear filters</Button>} secondaryAction={<Button size="sm" variant="ghost">Learn more</Button>} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
