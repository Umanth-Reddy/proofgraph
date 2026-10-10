import { Button } from "../../ui/button";
import { Alert } from "../../ui/alert";
import { TONES } from "../../lib/tone";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "alert", title: "Alert / Callout", group: "Feedback", step: 3, description: "Inline messages: five tones, three variants, actions and dismiss." };

export default function Page() {
  return (
    <ThemeMatrix>
      {(["subtle", "outline", "callout"] as const).map((v) => (
        <Section key={v} title={v}>
          <div className="grid max-w-2xl gap-2">
            {TONES.map((t) => (
              <Alert key={t} tone={t} variant={v} title={`${t[0].toUpperCase()}${t.slice(1)} title`}>
                Supporting text that explains what happened and what to do next.
              </Alert>
            ))}
          </div>
        </Section>
      ))}
      <Section title="Actions, dismiss, no title, no icon">
        <div className="grid max-w-2xl gap-2">
          <Alert tone="warning" title="Integrity notice" actions={<><Button size="sm" tone="warning" variant="soft">Review</Button><Button size="sm" variant="ghost" tone="neutral">Later</Button></>} onDismiss={() => {}}>
            Two repositories look similar to another submission.
          </Alert>
          <Alert tone="success">Only a message, no title.</Alert>
          <Alert tone="info" icon={false} title="No icon">
            The icon can be hidden.
          </Alert>
        </div>
      </Section>
    </ThemeMatrix>
  );
}
