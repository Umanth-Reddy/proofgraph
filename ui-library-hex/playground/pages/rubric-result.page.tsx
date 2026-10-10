import { Button } from "../../ui/button";
import { RubricResult } from "../../ui/rubric-result";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "rubric-result", title: "RubricResult", group: "Flows", step: 6, description: "Criteria scores (1–5), feedback, overall score and a follow-up slot." };

const criteria = [
  { id: "c", label: "Correctness", score: 4, feedback: "Core idea is right; one edge case missed." },
  { id: "d", label: "Depth", score: 3, feedback: "Mentions LIMIT but not cursor pagination." },
  { id: "cl", label: "Clarity", score: 5 },
  { id: "e", label: "Evidence from the repo", score: 2, feedback: "Did not reference a specific file." },
];

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Full result with follow-up">
        <div className="max-w-xl">
          <RubricResult criteria={criteria} summary="Solid understanding, needs more repo-specific evidence." followUp={<div className="flex flex-wrap items-center justify-between gap-2"><span>How would you page through 10 million rows?</span><Button size="sm" variant="outline">Answer follow-up</Button></div>} />
        </div>
      </Section>
      <Section title="Scales and tones">
        <div className="grid max-w-xl gap-6">
          <RubricResult max={10} criteria={[{ id: "a", label: "Strong", score: 9 }, { id: "b", label: "Weak", score: 3 }]} showOverall={false} />
          <RubricResult criteria={[{ id: "a", label: "Everything", score: 1 }]} overall={1} overallLabel="Final grade" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
