import { getSupabase } from "../lib/supabase";
import type { Tables, TablesInsert } from "../types/database.types";

const INSERT_RETURN_COLUMNS = "id" as const;

export const CONTACT_SUBMISSION_LIST_COLUMNS =
  "id, name, email, message, status, created_at" as const;

export type ContactSubmissionRow = Pick<
  Tables<"contact_submissions">,
  "id" | "name" | "email" | "message" | "status" | "created_at"
>;

export type ContactSubmissionInsert = Pick<
  TablesInsert<"contact_submissions">,
  "name" | "email" | "message"
>;

export const contactSubmissionsRepository = {
  async insert(
    row: ContactSubmissionInsert
  ): Promise<{ id: string } | { error: true }> {
    const { data, error } = await getSupabase()
      .from("contact_submissions")
      .insert(row)
      .select(INSERT_RETURN_COLUMNS)
      .single();

    if (error || !data) return { error: true };
    return { id: data.id };
  },

  async findPaginatedSince(params: {
    createdAfter: string;
    from: number;
    to: number;
  }): Promise<{
    rows: ContactSubmissionRow[];
    count: number;
    error: boolean;
  }> {
    const { data, error, count } = await getSupabase()
      .from("contact_submissions")
      .select(CONTACT_SUBMISSION_LIST_COLUMNS, { count: "exact" })
      .gte("created_at", params.createdAfter)
      .order("created_at", { ascending: false })
      .range(params.from, params.to);

    return {
      rows: (data ?? []) as ContactSubmissionRow[],
      count: count ?? 0,
      error: Boolean(error),
    };
  },
};
