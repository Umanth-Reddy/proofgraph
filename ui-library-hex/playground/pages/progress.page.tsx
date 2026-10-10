import { useEffect, useState } from "react";
import { Progress } from "../../ui/progress";
import { TONES } from "../../lib/tone";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "progress", title: "Progress", group: "Feedback", step: 2, description: "Linear progress, determinate or indeterminate. (Built early: FileDropzone uses it.)" };

function Live() {
  const [v, setV] = useState(10);
  useEffect(() => {
    const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 10)), 700);
    return () => clearInterval(t);
  }, []);
  return <Progress value={v} label="Uploading resume.pdf" showValue />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Determinate">
        <div className="max-w-md space-y-4">
          <Progress value={0} aria-label="Empty" />
          <Progress value={42} label="Scanning" showValue />
          <Progress value={100} tone="success" label="Done" showValue />
          <Live />
        </div>
      </Section>
      <Section title="Indeterminate">
        <div className="max-w-md space-y-4">
          <Progress label="Waiting for the server" />
          <Progress aria-label="Working" tone="info" size="sm" />
        </div>
      </Section>
      <Section title="Sizes and tones">
        <div className="max-w-md space-y-3">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Progress key={s} size={s} value={60} aria-label={s} />
          ))}
          {TONES.map((t) => (
            <Progress key={t} tone={t} value={55} aria-label={t} />
          ))}
        </div>
      </Section>
    </ThemeMatrix>
  );
}
