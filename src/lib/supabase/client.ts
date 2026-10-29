import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-media";

/**
 * Checks whether valid Supabase configuration is present in environment variables.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      !supabaseUrl.includes("your_supabase_project_url") &&
      !supabaseAnonKey.includes("your_supabase_anon_key") &&
      supabaseUrl.startsWith("http")
  );
}

let cachedClient: SupabaseClient<Database> | null = null;

/**
 * Returns a Supabase client instance if configured, or null if using mock fallback.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!cachedClient && supabaseUrl && supabaseAnonKey) {
    cachedClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return cachedClient;
}

/**
 * Helper to construct a public URL from the Supabase `product-media` storage bucket.
 * If the provided path is already an absolute HTTP/HTTPS URL, it returns it untouched.
 */
export function getProductMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const client = getSupabaseClient();
  if (client) {
    const { data } = client.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(pathOrUrl.replace(/^\/+/, ""));
    return data.publicUrl;
  }

  // Fallback direct URL format if client not initialized
  if (supabaseUrl && !supabaseUrl.includes("your_supabase")) {
    return `${supabaseUrl}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${pathOrUrl.replace(/^\/+/, "")}`;
  }

  return pathOrUrl;
}
