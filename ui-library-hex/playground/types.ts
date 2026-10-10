import type { ComponentType } from "react";

export interface PageMeta {
  id: string;
  title: string;
  /** Sidebar group, e.g. "Foundations". */
  group: string;
  /** Implementation step (§7) — orders the groups. */
  step: number;
  description?: string;
}

export interface PageModule {
  meta: PageMeta;
  default: ComponentType;
}
