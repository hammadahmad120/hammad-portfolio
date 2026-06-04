export type AdminProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  phone: string | null;
  is_admin: boolean;
};

export type AdminAccessDeniedReason = "no_profile" | "not_admin" | "db_error";

export type AdminAccessResult =
  | { allowed: true }
  | { allowed: false; reason: AdminAccessDeniedReason };

export type ProfileFieldUpdates = {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string | null;
  phone?: string | null;
};
