import { getSupabase } from "../lib/supabase";

const BUCKET = "blog-images";

export const storageRepository = {
  async uploadObject(
    path: string,
    buffer: Buffer,
    contentType: string
  ): Promise<{ error: boolean }> {
    const { error } = await getSupabase()
      .storage.from(BUCKET)
      .upload(path, buffer, {
        contentType,
        upsert: false,
      });

    return { error: Boolean(error) };
  },

  getPublicUrl(path: string): string {
    const { data } = getSupabase().storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },
};
