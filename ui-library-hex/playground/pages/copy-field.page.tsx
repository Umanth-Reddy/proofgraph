import { CopyField } from "../../ui/copy-field";
import { Field } from "../../ui/field";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "copy-field", title: "CopyField", group: "Form controls", step: 2, description: "Read-only value with a copy button; optional secret reveal." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes">
        <div className="grid max-w-md gap-3">
          <CopyField size="sm" value="PG-7H2K-91XD" aria-label="Small code" />
          <CopyField value="PG-7H2K-91XD" aria-label="Medium code" />
          <CopyField size="lg" value="PG-7H2K-91XD" aria-label="Large code" />
        </div>
      </Section>
      <Section title="Share link and long value">
        <div className="grid max-w-md gap-3">
          <Field label="Verify link">
            <CopyField value="https://proofgraph.example/verify/9f3c2a77-41b0-4d0e-9a57-0c8c1d3a" />
          </Field>
        </div>
      </Section>
      <Section title="Secret (token)">
        <div className="max-w-md">
          <CopyField secret value="pgk_live_8f3a91c2d4e7b6a05f12" aria-label="API token" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
