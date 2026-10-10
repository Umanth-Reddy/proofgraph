// All elements on one scrolling page. Run `npm run dev`, open /showcase.html. Theme: toggle at top.
import "../tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SkinProvider } from "../lib/skin";
import { ThemeToggle } from "../ui/theme-toggle";
import { groups } from "./registry";

function Showcase() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg px-4 py-2">
        <strong>UI Library — all elements</strong>
        <ThemeToggle />
      </header>
      <div className="mx-auto max-w-5xl space-y-16 p-4">
        {groups.map((g) => (
          <div key={g.group} className="space-y-10">
            <h1 className="border-b border-border pb-2 text-2xl font-semibold">{g.group}</h1>
            {g.items.map(({ id, title, Component }) => (
              <section key={id} id={id} className="scroll-mt-16">
                <h2 className="mb-3 text-lg font-semibold">{title}</h2>
                <Component />
              </section>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkinProvider>
      <Showcase />
    </SkinProvider>
  </StrictMode>,
);
