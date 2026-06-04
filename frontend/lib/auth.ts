/** Admin profile from GET /api/auth/me and login response (API.md). */
export type AdminProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  phone: string | null;
  is_admin: boolean;
};

export type AdminSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  user: AdminProfile;
};

/** Single session blob used by this app (Express login → POST /api/auth/login). */
const STORAGE_KEY = "portfolio_admin_session";

/**
 * Keys this app does not write on login; cleared on sign-out if present.
 * - auth-token / refreshToken: common tutorial or hand-rolled JWT storage
 * - sb-*-auth-token: Supabase JS client (signInWithPassword in browser)
 */
const LEGACY_STORAGE_KEYS = ["auth-token", "refreshToken"] as const;

function clearSupabaseAuthStorage(): void {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith("sb-") && key.endsWith("-auth-token")) {
      localStorage.removeItem(key);
    }
  }
}

export function isAdminProfile(
  profile: AdminProfile | null | undefined
): profile is AdminProfile {
  return Boolean(profile?.is_admin);
}

export function isSessionValid(session: AdminSession | null): session is AdminSession {
  if (!session?.access_token || !session.expires_at) return false;
  if (!isAdminProfile(session.user)) return false;
  return session.expires_at * 1000 > Date.now();
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as AdminSession;
    if (!isSessionValid(session)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export const ADMIN_SESSION_EVENT = "admin-session-updated";

function notifySessionChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
  }
}

export function setAdminSession(session: AdminSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  notifySessionChange();
}

export function clearAdminSession(): void {
  localStorage.removeItem(STORAGE_KEY);
  for (const key of LEGACY_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  clearSupabaseAuthStorage();
  notifySessionChange();
}

export function getAccessToken(): string | null {
  return getAdminSession()?.access_token ?? null;
}

export function getAdminDisplayName(profile: AdminProfile): string {
  const parts = [profile.first_name, profile.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : profile.email;
}
