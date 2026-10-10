import type { Role } from "../config";

export const queryKeys = {
  session: ["session"] as const,
  notifications: ["notifications"] as const,
  settings: ["settings"] as const,
  home: (role: Role) => ["home", role] as const,
};
