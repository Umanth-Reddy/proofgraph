import { Bell, FileText, MoreHorizontal } from "lucide-react";
import { Avatar } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { IconButton } from "../../ui/button";
import { EmptyState } from "../../ui/empty-state";
import { List, ListItem } from "../../ui/list";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "list", title: "List / ListItem", group: "State blocks", step: 4, description: "Leading, title, meta and trailing actions; link, button or static rows; loading and empty states." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Notifications (card variant)">
        <div className="max-w-xl">
          <List variant="card" aria-label="Notifications">
            <ListItem unread leading={<Bell className="size-4" />} title="Your scan finished" description="14 of 16 claims verified" meta="2m" href="#/list" trailing={<Badge tone="success" size="sm">New</Badge>} />
            <ListItem unread leading={<FileText className="size-4" />} title="Resume parsed" description="Two skills need evidence" meta="1h" onClick={() => {}} />
            <ListItem selected leading={<Avatar name="Asha Rao" size="sm" />} title="Asha Rao replied" description="Re: appeal #204" meta="Yesterday" trailing={<IconButton size="sm" label="More"><MoreHorizontal className="size-4" /></IconButton>} />
            <ListItem title="Static row" description="Not interactive" />
          </List>
        </div>
      </Section>
      <Section title="Plain, undivided">
        <div className="max-w-xl">
          <List divided={false}>
            <ListItem title="One" description="Plain list" />
            <ListItem title="Two" />
          </List>
        </div>
      </Section>
      <Section title="Loading and empty">
        <div className="grid max-w-xl gap-4">
          <List variant="card" loading loadingRows={3} />
          <List variant="card" isEmpty empty={<EmptyState size="sm" title="No notifications" description="You are all caught up." />} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
