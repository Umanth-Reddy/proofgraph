/**
 * The live API client. This is the ONLY file in the app that calls fetch (enforced by eslint no-restricted-globals).
 * Requests go to /api/*, which next.config.ts rewrites to the FastAPI backend. Every response is validated with zod.
 * Endpoint paths are provisional until the backend is final.
 */
import { z } from "zod";
import { errorFromResponse } from "./errors";
import { HomeSummarySchema, NotificationListSchema, SessionSchema, SettingsSchema, type SettingsPatch, type SignInInput } from "./schemas";
import type { Api } from "./types";

const BASE = "/api";

async function request<S extends z.ZodType>(path: string, schema: S, init: { method?: string; body?: unknown } = {}): Promise<z.infer<S>> {
  const response = await fetch(`${BASE}${path}`, {
    method: init.method ?? "GET",
    credentials: "include",
    headers: init.body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  if (!response.ok) throw await errorFromResponse(response);
  if (response.status === 204) return schema.parse(undefined);
  return schema.parse(await response.json());
}

const Empty = z.undefined();

export const liveApi: Api = {
  getSession: () => request("/session", SessionSchema),
  signIn: (input: SignInInput) => request("/session", SessionSchema, { method: "POST", body: input }),
  signOut: () => request("/session", Empty, { method: "DELETE" }),
  switchRole: (role) => request("/session/role", SessionSchema, { method: "PUT", body: { role } }),
  listNotifications: () => request("/notifications", NotificationListSchema),
  markNotificationRead: (id) => request(`/notifications/${encodeURIComponent(id)}/read`, Empty, { method: "POST" }),
  markAllNotificationsRead: () => request("/notifications/read-all", Empty, { method: "POST" }),
  getSettings: () => request("/settings", SettingsSchema),
  updateSettings: (patch: SettingsPatch) => request("/settings", SettingsSchema, { method: "PATCH", body: patch }),
  getHome: (role) => request(`/home/${role}`, HomeSummarySchema),
};
