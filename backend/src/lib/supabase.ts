import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

let client: SupabaseClient<Database> | null = null;

function readSupabaseEnv(): { url: string; serviceRoleKey: string } {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment"
    );
  }

  return { url: supabaseUrl, serviceRoleKey: supabaseServiceRoleKey };
}

function createServiceRoleClient(): SupabaseClient<Database> {
  const { url, serviceRoleKey } = readSupabaseEnv();

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Singleton service-role client for DB and auth.admin.* only.
 * Never call signInWithPassword on this instance — it replaces the service JWT
 * with the user session and breaks RLS-bypassed queries on public.users.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!client) client = createServiceRoleClient();
  return client;
}

/** Separate client per login so the singleton keeps service-role access. */
export async function signInWithPassword(email: string, password: string) {
  const ephemeral = createServiceRoleClient();
  return ephemeral.auth.signInWithPassword({ email, password });
}
