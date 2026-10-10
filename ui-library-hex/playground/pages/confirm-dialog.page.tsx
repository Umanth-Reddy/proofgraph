import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { ConfirmDialog } from "../../ui/confirm-dialog";
import { toast } from "../../ui/toast";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "confirm-dialog", title: "ConfirmDialog", group: "Overlays", step: 3, description: "Alert dialog with an async confirm: loading while it runs, closes on success, shows the error on failure." };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Inline() {
  const [log, setLog] = useState("");
  return (
    <Row label={log || "—"}>
      <ConfirmDialog
        trigger={<Button variant="outline">Basic confirm</Button>}
        title="Publish changes?"
        description="Everyone with the link will see the update."
        confirmLabel="Publish"
        onConfirm={() => setLog("confirmed")}
      />
    </Row>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Danger, async (1 s)">
        <Row>
          <ConfirmDialog
            tone="danger"
            trigger={
              <Button tone="danger" variant="soft" leading={<Trash2 className="size-4" />}>
                Revoke consent
              </Button>
            }
            title="Revoke consent?"
            description="Employers will immediately lose access to your profile. This cannot be undone."
            confirmLabel="Revoke"
            onConfirm={async () => {
              await wait(1000);
              toast.success("Consent revoked");
            }}
          />
        </Row>
      </Section>
      <Section title="Failure keeps the dialog open">
        <Row>
          <ConfirmDialog
            tone="danger"
            trigger={<Button variant="outline">Delete (fails)</Button>}
            title="Delete data?"
            confirmLabel="Delete"
            onConfirm={async () => {
              await wait(600);
              throw { status: 500, detail: "The server could not delete this record." };
            }}
          />
        </Row>
      </Section>
      <Section title="Sync handler">
        <Inline />
      </Section>
    </ThemeMatrix>
  );
}
