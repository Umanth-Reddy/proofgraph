import { Copy, Download, MoreHorizontal, Pencil, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, IconButton } from "../../ui/button";
import { DropdownMenu, type MenuEntry } from "../../ui/dropdown-menu";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "dropdown-menu", title: "DropdownMenu", group: "Overlays", step: 3, description: "Row actions and option menus: icons, shortcuts, danger items, checkboxes, radios and submenus." };

function Full() {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("name");
  const items: MenuEntry[] = [
    { type: "label", label: "Actions" },
    { label: "Edit", icon: <Pencil className="size-4" />, shortcut: "⌘E" },
    { label: "Duplicate", icon: <Copy className="size-4" />, shortcut: "⌘D" },
    { type: "sub", label: "Share", icon: <Share2 className="size-4" />, items: [{ label: "Copy link" }, { label: "Email…" }] },
    { type: "separator" },
    { type: "checkbox", label: "Grid view", checked: grid, onCheckedChange: setGrid },
    { type: "radio", value: sort, onValueChange: setSort, options: [{ value: "name", label: "Sort by name" }, { value: "date", label: "Sort by date" }] },
    { type: "separator" },
    { label: "Export", icon: <Download className="size-4" />, disabled: true },
    { label: "Delete", icon: <Trash2 className="size-4" />, tone: "danger", shortcut: "⌫" },
  ];
  return <DropdownMenu trigger={<Button variant="outline">Open menu</Button>} items={items} />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Everything" hint="Arrow keys move, → opens a submenu, Esc closes, typing jumps to an item.">
        <Row>
          <Full />
        </Row>
      </Section>
      <Section title="Row-actions pattern, end-aligned">
        <Row>
          <DropdownMenu
            align="end"
            aria-label="Row actions"
            trigger={
              <IconButton label="Row actions">
                <MoreHorizontal className="size-4" />
              </IconButton>
            }
            items={[{ label: "View", href: "#/dropdown-menu" }, { label: "Edit" }, { type: "separator" }, { label: "Remove", tone: "danger" }]}
          />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
