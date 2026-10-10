import "../tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SkinProvider } from "../lib/skin";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkinProvider>
      <App />
    </SkinProvider>
  </StrictMode>,
);
