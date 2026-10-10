import { Button } from "../../ui/button";
import { toast } from "../../ui/toast";
import { Row, Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "toast", title: "Toast", group: "Overlays", step: 3, description: "Transient notifications (sonner, themed by tokens). Toasts render in a single region, so this page uses the global theme and density switches." };

export default function Page() {
  return (
    <>
      <Section title="Tones">
        <Row>
          <Button variant="outline" onClick={() => toast("Draft saved")}>
            Default
          </Button>
          <Button variant="outline" tone="success" onClick={() => toast.success("Profile published", { description: "Your link is live." })}>
            Success
          </Button>
          <Button variant="outline" tone="info" onClick={() => toast.info("Scan queued")}>
            Info
          </Button>
          <Button variant="outline" tone="warning" onClick={() => toast.warning("Rate limit almost reached")}>
            Warning
          </Button>
          <Button variant="outline" tone="danger" onClick={() => toast.error("Could not save", { description: "The server returned 500." })}>
            Error
          </Button>
        </Row>
      </Section>
      <Section title="Actions">
        <Row>
          <Button variant="soft" tone="danger" onClick={() => toast.error("Upload failed", { action: { label: "Retry", onClick: () => toast.success("Retrying…") } })}>
            Error with retry
          </Button>
          <Button variant="soft" onClick={() => toast("Item archived", { action: { label: "Undo", onClick: () => toast.info("Restored") }, cancel: { label: "Dismiss", onClick: () => {} } })}>
            Undo
          </Button>
          <Button
            variant="soft"
            onClick={() => {
              const p = new Promise((res, rej) => setTimeout(() => (Math.random() > 0.5 ? res("ok") : rej(new Error("nope"))), 1500));
              toast.promise(p, { loading: "Scanning…", success: "Scan complete", error: "Scan failed" });
            }}
          >
            Promise
          </Button>
        </Row>
      </Section>
    </>
  );
}
