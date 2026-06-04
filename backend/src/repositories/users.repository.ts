import type { Tables, TablesUpdate } from "../types/database.types";
import { getSupabase } from "../lib/supabase";

const USER_PROFILE_COLUMNS =
  "id, email, first_name, last_name, date_of_birth, is_admin" as const;

export type UserProfileRow = Pick<
  Tables<"users">,
  "id" | "email" | "first_name" | "last_name" | "date_of_birth" | "is_admin"
>;

export const usersRepository = {
  async findIsAdmin(
    userId: string
  ): Promise<
    | { ok: true; is_admin: boolean }
    | { ok: false; reason: "db_error" | "no_profile" }
  > {
    const { data, error } = await getSupabase()
      .from("users")
      .select("is_admin")
      .eq("id", userId)
      .maybeSingle();

    if (error) return { ok: false, reason: "db_error" };
    if (!data) return { ok: false, reason: "no_profile" };
    return { ok: true, is_admin: data.is_admin };
  },

  async findProfileById(userId: string): Promise<UserProfileRow | null> {
    const { data, error } = await getSupabase()
      .from("users")
      .select(USER_PROFILE_COLUMNS)
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) return null;
    return data;
  },

  async updateProfile(
    userId: string,
    updates: TablesUpdate<"users">
  ): Promise<{ error: string | null }> {
    if (Object.keys(updates).length === 0) {
      return { error: null };
    }

    const { error } = await getSupabase()
      .from("users")
      .update(updates)
      .eq("id", userId);

    return { error: error ? "Failed to update profile" : null };
  },

  async getAuthUserById(userId: string) {
    return getSupabase().auth.admin.getUserById(userId);
  },

  async updateAuthUserById(
    userId: string,
    payload: {
      phone?: string;
      user_metadata?: Record<string, string | null>;
    }
  ) {
    return getSupabase().auth.admin.updateUserById(userId, payload);
  },
};
