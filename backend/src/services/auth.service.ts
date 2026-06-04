import { authRepository } from "../repositories/auth.repository";
import { usersRepository } from "../repositories/users.repository";
import type { UpdateProfileInput } from "../schemas/auth.schema";
import type { AdminAccessResult, AdminProfile } from "../types/user.types";
import type { TablesUpdate } from "../types/database.types";
import { AppError } from "../utils/AppError";

function toAdminProfile(
  row: Awaited<ReturnType<typeof usersRepository.findProfileById>>,
  phone: string | null
): AdminProfile | null {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    first_name: row.first_name,
    last_name: row.last_name,
    date_of_birth: row.date_of_birth,
    phone,
    is_admin: row.is_admin,
  };
}

export const authService = {
  async checkAdminAccess(userId: string): Promise<AdminAccessResult> {
    const result = await usersRepository.findIsAdmin(userId);
    if (!result.ok) return { allowed: false, reason: result.reason };
    if (!result.is_admin) return { allowed: false, reason: "not_admin" };
    return { allowed: true };
  },

  async userIsAdmin(userId: string): Promise<boolean> {
    const result = await this.checkAdminAccess(userId);
    return result.allowed;
  },

  async getAdminProfile(userId: string): Promise<AdminProfile | null> {
    const row = await usersRepository.findProfileById(userId);
    if (!row) return null;

    const { data: authData, error: authError } =
      await usersRepository.getAuthUserById(userId);

    if (authError || !authData.user) return null;

    return toAdminProfile(row, authData.user.phone ?? null);
  },

  adminAccessDeniedMessage(
    reason: Extract<AdminAccessResult, { allowed: false }>["reason"]
  ): string {
    if (reason === "no_profile") {
      return "Admin profile not found. Add a public.users row for this account.";
    }
    if (reason === "not_admin") {
      return "Not authorized for admin access";
    }
    return "Unable to verify admin access";
  },

  async login(email: string, password: string) {
    const { data, error } = await authRepository.signInWithPassword(
      email,
      password
    );

    if (error || !data.session || !data.user) {
      throw new AppError(401, "Invalid email or password");
    }

    const access = await this.checkAdminAccess(data.user.id);

    if (!access.allowed) {
      throw new AppError(
        403,
        this.adminAccessDeniedMessage(access.reason)
      );
    }

    const profile = await this.getAdminProfile(data.user.id);

    if (!profile) {
      throw new AppError(500, "Admin profile not found");
    }

    const { session, user } = data;

    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      expires_at: session.expires_at,
      user: profile,
    };
  },

  async getProfile(userId: string): Promise<AdminProfile> {
    const profile = await this.getAdminProfile(userId);
    if (!profile) {
      throw new AppError(404, "Profile not found");
    }
    return profile;
  },

  async updateProfile(
    userId: string,
    updates: UpdateProfileInput
  ): Promise<AdminProfile> {
    const dbUpdates: TablesUpdate<"users"> = {};
    if (updates.first_name !== undefined) {
      dbUpdates.first_name = updates.first_name;
    }
    if (updates.last_name !== undefined) {
      dbUpdates.last_name = updates.last_name;
    }
    if (updates.date_of_birth !== undefined) {
      dbUpdates.date_of_birth = updates.date_of_birth;
    }

    const { error: dbError } = await usersRepository.updateProfile(
      userId,
      dbUpdates
    );

    if (dbError) {
      throw new AppError(500, dbError);
    }

    const authPayload: {
      phone?: string;
      user_metadata?: Record<string, string | null>;
    } = {};

    if (updates.phone !== undefined) {
      authPayload.phone = updates.phone ?? undefined;
    }

    const metadataKeys = ["first_name", "last_name", "date_of_birth"] as const;
    const hasMetadataChange = metadataKeys.some((k) => updates[k] !== undefined);

    if (hasMetadataChange) {
      const { data: authUser, error: fetchError } =
        await usersRepository.getAuthUserById(userId);

      if (fetchError || !authUser.user) {
        throw new AppError(500, "Failed to load auth user");
      }

      const existing = (authUser.user.user_metadata ?? {}) as Record<
        string,
        unknown
      >;

      authPayload.user_metadata = {
        ...existing,
        ...(updates.first_name !== undefined
          ? { first_name: updates.first_name }
          : {}),
        ...(updates.last_name !== undefined
          ? { last_name: updates.last_name }
          : {}),
        ...(updates.date_of_birth !== undefined
          ? { date_of_birth: updates.date_of_birth }
          : {}),
      } as Record<string, string | null>;
    }

    if (authPayload.phone !== undefined || authPayload.user_metadata) {
      const { error: authUpdateError } =
        await usersRepository.updateAuthUserById(userId, authPayload);

      if (authUpdateError) {
        throw new AppError(500, "Failed to update auth profile");
      }
    }

    const profile = await this.getAdminProfile(userId);
    if (!profile) {
      throw new AppError(500, "Profile not found");
    }

    return profile;
  },
};

// Re-export for middleware
export const userIsAdmin = (userId: string) => authService.userIsAdmin(userId);
