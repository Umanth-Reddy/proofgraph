import { useState } from "react";
import { Mic } from "lucide-react";
import { Button } from "../../ui/button";
import { CountdownTimer } from "../../ui/countdown-timer";
import { QuestionCard } from "../../ui/question-card";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "question-card", title: "QuestionCard", group: "Flows", step: 6, description: "Prompt, answer slot (text, choice or custom such as voice), timer slot and result state." };

const choices = [
  { value: "a", label: "A race condition between two requests", description: "Both read the row before either writes" },
  { value: "b", label: "A missing index" },
  { value: "c", label: "An N+1 query" },
];

function TextDemo() {
  const [res, setRes] = useState<"correct" | "partial" | undefined>();
  return (
    <QuestionCard
      index={2}
      total={5}
      prompt="Explain how the pagination in products.py avoids loading every row."
      hint="Answer in 2–3 sentences."
      timer={<CountdownTimer durationMs={60_000} warnAtMs={20_000} dangerAtMs={10_000} size="sm" showBar={false} />}
      onSubmit={async () => { await new Promise((r) => setTimeout(r, 600)); setRes("partial"); }}
      onSkip={() => setRes(undefined)}
      result={res ? { verdict: res, feedback: "You covered LIMIT but not the cursor approach." } : undefined}
    />
  );
}

function ChoiceDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [val, setVal] = useState("c");
  return (
    <QuestionCard
      prompt="What is the most likely cause of the slow list endpoint?"
      mode="choice"
      choices={choices}
      value={val}
      onValueChange={setVal}
      onSubmit={() => setSubmitted(true)}
      result={submitted ? { verdict: val === "a" ? "correct" : "incorrect", correctValue: "a", feedback: "The row is read before the write, so two requests can interleave." } : undefined}
    />
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Text answer with timer, async submit and partial result">
        <div className="max-w-2xl">
          <TextDemo />
        </div>
      </Section>
      <Section title="Choice answer with correct / incorrect marking (picks the wrong one first)">
        <div className="max-w-2xl">
          <ChoiceDemo />
        </div>
      </Section>
      <Section title="Custom answer slot (e.g. voice) and verdict variants">
        <div className="grid max-w-2xl gap-4">
          <QuestionCard prompt="Walk me through the data model." mode="custom" answer={<Button variant="outline" leading={<Mic className="size-4" />}>Record answer</Button>} onSubmit={() => {}} />
          <QuestionCard prompt="Correct example" mode="text" defaultValue="Because of LIMIT/OFFSET." result={{ verdict: "correct", feedback: "Nicely put." }} />
          <QuestionCard prompt="Incorrect example" mode="text" defaultValue="It doesn't." result={{ verdict: "incorrect" }} />
          <QuestionCard prompt="Pending review" mode="text" defaultValue="Waiting on the grader." result={{ verdict: "pending" }} />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
