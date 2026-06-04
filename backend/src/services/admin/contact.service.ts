import { contactSubmissionsRepository } from "../../repositories/contactSubmissions.repository";
import type { ListContactSubmissionsQueryInput } from "../../schemas/admin/contact.schema";
import type { PaginatedContactSubmissions } from "../../types/contact.types";
import { AppError } from "../../utils/AppError";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function createdAfterIso(days: number): string {
  return new Date(Date.now() - days * MS_PER_DAY).toISOString();
}

function emptyPage(
  query: ListContactSubmissionsQueryInput
): PaginatedContactSubmissions {
  return {
    items: [],
    page: query.page,
    limit: query.limit,
    total: 0,
    totalPages: 0,
    days: query.days,
  };
}

export const adminContactService = {
  async list(
    query: ListContactSubmissionsQueryInput
  ): Promise<PaginatedContactSubmissions> {
    const { page, limit, days } = query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const createdAfter = createdAfterIso(days);

    const { rows, count, error } =
      await contactSubmissionsRepository.findPaginatedSince({
        createdAfter,
        from,
        to,
      });

    if (error) {
      throw new AppError(500, "Failed to list contact submissions");
    }

    const total = count;
    if (total === 0) return emptyPage(query);

    const totalPages = Math.ceil(total / limit);

    return {
      items: rows,
      page,
      limit,
      total,
      totalPages,
      days,
    };
  },
};
