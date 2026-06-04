import { tagsRepository } from "../repositories/tags.repository";
import type { TagJoin } from "../types/blog.types";
import { AppError } from "../utils/AppError";

export const tagsService = {
  async listAll(): Promise<TagJoin[]> {
    const { rows, error } = await tagsRepository.findAll();
    if (error) throw new AppError(500, "Failed to list tags");

    return rows.map(({ name, slug }) => ({ name, slug }));
  },
};
