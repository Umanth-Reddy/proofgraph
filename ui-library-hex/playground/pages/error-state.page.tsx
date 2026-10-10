import { useState } from "react";
import { Button } from "../../ui/button";
import { ErrorState } from "../../ui/error-state";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "error-state", title: "ErrorState", group: "State blocks", step: 4, description: "Failure with retry. Understands thrown values, including `{detail}` API errors." };

function Retry() {
  const [retrying, setRetrying] = useState(false);
  return <ErrorState bordered error={{ status: 503, detail: "Upstream scan service unavailable" }} retrying={retrying} onRetry={() => { setRetrying(true); setTimeout(() => setRetrying(false), 1200); }} />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="From different error shapes">
        <div className="grid gap-3">
          <ErrorState bordered error={new Error("Network request failed")} onRetry={() => {}} />
          <ErrorState bordered error={{ status: 403, detail: "You do not have access to this college." }} title="Access denied" />
          <ErrorState bordered size="sm" title="Could not load evidence" description="Check your connection." onRetry={() => {}} actions={<Button size="sm" variant="ghost">Report</Button>} />
        </div>
      </Section>
      <Section title="Retrying and technical detail">
        <div className="grid gap-3">
          <Retry />
          <ErrorState showDetail error={Object.assign(new Error("Unexpected token < in JSON"), { name: "SyntaxError" })} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
