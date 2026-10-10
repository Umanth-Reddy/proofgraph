import { useEffect, useState } from "react";
import { ThoughtLine } from "../../blocks/motion";
import { Button } from "../../ui/button";
import { Section } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "thought-line", title: "ThoughtLine", group: "Motion", step: 10, description: "An agent’s thinking line that settles into “Thought for N s”." };

const STEPS = ["Reading the question", "Searching your notes", "Drafting an answer"];

function Demo() {
  const [run, setRun] = useState(0);
  const [steps, setSteps] = useState([STEPS[0]]);
  const [working, setWorking] = useState(true);
  useEffect(() => {
    setSteps([STEPS[0]]);
    setWorking(true);
    const ids = [setTimeout(() => setSteps(STEPS.slice(0, 2)), 1400), setTimeout(() => setSteps(STEPS), 2800), setTimeout(() => setWorking(false), 4200)];
    return () => ids.forEach(clearTimeout);
  }, [run]);
  return (
    <div className="grid max-w-xl gap-3">
      <ThoughtLine key={run} working={working} steps={steps} fontSize={14} />
      <div><Button size="sm" variant="outline" onClick={() => setRun((r) => r + 1)}>Run again</Button></div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="grid gap-2">
      <Section title="Live run" hint="Steps arrive one by one, then the line settles and folds the steps away (click to reopen).">
        <Demo />
      </Section>
    </div>
  );
}
