import { randomUUID } from "crypto";
import { storageRepository } from "../repositories/storage.repository";
import {
  MIME_TO_EXT,
  type UploadedFileInput,
} from "../schemas/upload.schema";
import { AppError } from "../utils/AppError";

export const uploadService = {
  async uploadBlogImage(file: UploadedFileInput): Promise<{ url: string }> {
    const ext = MIME_TO_EXT[file.mimetype];
    const path = `${randomUUID()}.${ext}`;

    const { error } = await storageRepository.uploadObject(
      path,
      file.buffer,
      file.mimetype
    );

    if (error) {
      throw new AppError(500, "Failed to upload image");
    }

    return { url: storageRepository.getPublicUrl(path) };
  },
};
