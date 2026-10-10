import { useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose } from "../../ui/dialog";
import { Field } from "../../ui/field";
import { Input } from "../../ui/input";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "dialog", title: "Dialog", group: "Overlays", step: 3, description: "Modal dialog with title, description, scrolling body and footer. Esc and overlay click close it; focus is trapped and restored." };

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <Row label={`controlled (open = ${open})`}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open controlled
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Controlled dialog" description="Opened from state." footer={<Button onClick={() => setOpen(false)}>Done</Button>}>
        State lives in the parent.
      </Dialog>
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <Row>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Dialog
              key={s}
              size={s}
              trigger={<Button variant="outline">{s} dialog</Button>}
              title={`A ${s} dialog`}
              description="Supporting description under the title."
              footer={
                <>
                  <DialogClose asChild>
                    <Button variant="ghost" tone="neutral">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button>Save</Button>
                </>
              }
            >
              <Field label="Project name">
                <Input placeholder="My project" />
              </Field>
            </Dialog>
          ))}
        </Row>
      </Section>
      <Section title="Long content scrolls inside the dialog">
        <Row>
          <Dialog trigger={<Button variant="outline">Long body</Button>} title="Terms" description="Scroll to read">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="mb-3">
                Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
              </p>
            ))}
          </Dialog>
        </Row>
      </Section>
      <Section title="Variations">
        <Row>
          <Dialog trigger={<Button variant="outline">Hidden title</Button>} title="Accessible name only" hideTitle hideClose>
            <DialogClose asChild>
              <Button>Close me</Button>
            </DialogClose>
          </Dialog>
          <Controlled />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}
