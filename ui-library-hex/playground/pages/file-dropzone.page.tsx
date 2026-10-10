import { useState } from "react";
import { FileDropzone, type UploadItem } from "../../ui/file-dropzone";
import { Field } from "../../ui/field";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "file-dropzone", title: "FileDropzone", group: "Form controls", step: 2, description: "Drag, click or keyboard to add files; accept/size validation, progress and per-file state." };

const demo: UploadItem[] = [
  { id: "1", name: "resume-final.pdf", size: 482_113, status: "done" },
  { id: "2", name: "linkedin-export.zip", size: 3_482_113, status: "uploading", progress: 64 },
  { id: "3", name: "notes.csv", size: 12_113, status: "error", error: "Server rejected the file" },
];

function Simulated() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const upload = (_: File[], added: UploadItem[]) => {
    for (const it of added) {
      let p = 0;
      const t = setInterval(() => {
        p += 20;
        setItems((cur) => cur.map((c) => (c.id === it.id ? { ...c, status: p >= 100 ? "done" : "uploading", progress: p } : c)));
        if (p >= 100) clearInterval(t);
      }, 400);
    }
  };
  return <FileDropzone accept={[".pdf", ".zip", "image/*"]} maxSize={5_000_000} value={items} onValueChange={setItems} onFilesAdded={upload} />;
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Simulated upload" hint="Drop or pick PDF, ZIP or images up to 5 MB. Others are rejected with a message.">
        <div className="max-w-xl">
          <Simulated />
        </div>
      </Section>
      <Section title="List states (done, uploading, error)">
        <div className="max-w-xl">
          <FileDropzone defaultValue={demo} />
        </div>
      </Section>
      <Section title="Single file, invalid, disabled">
        <div className="grid max-w-xl gap-4">
          <Field label="Resume" hint="Only one file" error="A resume is required">
            <FileDropzone multiple={false} accept={[".pdf"]} />
          </Field>
          <FileDropzone disabled title="Uploads are disabled" />
        </div>
      </Section>
    </ThemeMatrix>
  );
}
