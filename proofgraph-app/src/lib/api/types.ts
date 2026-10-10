import type { Role } from "../config";
import type { HomeSummary, Notification, Session, Settings, SettingsPatch, SignInInput } from "./schemas";

/** The one surface pages and hooks talk to. `client.ts` implements it over HTTP, `mock-client.ts` over fixtures. */
export interface Api {
  getSession(): Promise<Session>;
  signIn(input: SignInInput): Promise<Session>;
  signOut(): Promise<void>;
  /** Demo convenience (see FEATURES.demoWorkspaceSwitcher): re-issue the session for another role. */
  switchRole(role: Role): Promise<Session>;
  listNotifications(): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<void>;
  markAllNotificationsRead(): Promise<void>;
  getSettings(): Promise<Settings>;
  updateSettings(patch: SettingsPatch): Promise<Settings>;
  getHome(role: Role): Promise<HomeSummary>;
}
