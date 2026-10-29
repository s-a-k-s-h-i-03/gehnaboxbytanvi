import { Product, ProductVariant, Category } from "@/types";
import { getSupabaseClient, isSupabaseConfigured, getProductMediaUrl } from "@/lib/supabase/client";
import mockProducts from "@/data/products.json";
import { CATEGORIES as mockCategories } from "@/data/categories";

export interface ProductsResponse {
  products: Product[];
  source: "supabase" | "fallback";
  error?: string;
}

/**
 * Maps a Supabase row with joined relations into the frontend Product interface.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseProductToUI(row: any): Product {
  const mediaList = Array.isArray(row.product_media)
    ? [...row.product_media].sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )
    : [];

  const images =
    mediaList.length > 0
      ? mediaList.map((m) => getProductMediaUrl(m.media_url))
      : [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
        ];

  const variantsList = Array.isArray(row.product_variants)
    ? row.product_variants.map(
        (v: { id: string; variant_name: string; color_code?: string; stock_quantity?: number }) => ({
          id: v.id,
          name: v.variant_name,
          color: v.color_code || undefined,
          stock: v.stock_quantity ?? 10,
        })
      )
    : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.subtitle || "Handcrafted Luxury Adornment",
    category: row.categories?.name || "Boutique Collection",
    categorySlug: row.categories?.slug || "all",
    price: Number(row.price_inr),
    mrp: Number(row.mrp_inr),
    itemType: row.item_type || "READY_TO_SHIP",
    leadTimeDays: row.lead_time_days ?? 2,
    baseMaterial: row.base_material,
    platingType: row.plating_type,
    stoneType: row.stone_type || "Semi-precious stone setting",
    isGiftWrappable: row.is_gift_wrappable ?? true,
    isBestseller: row.is_featured ?? false,
    rating: 4.9,
    reviewCount: 95,
    description: row.description,
    images,
    variants: variantsList,
  };
}

/**
 * Fetches all products from Supabase database.
 * If credentials are not yet set or database query fails, seamlessly falls back to mock products JSON.
 */
export async function getProducts(): Promise<ProductsResponse> {
  const supabase = getSupabaseClient();

  if (!supabase || !isSupabaseConfigured()) {
    return {
      products: mockProducts as Product[],
      source: "fallback",
    };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories:category_id (
          id,
          name,
          slug
        ),
        product_variants (*),
        product_media (*)
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn("Notice: Supabase product fetch error, falling back to mock JSON:", error.message);
      }
      return {
        products: mockProducts as Product[],
        source: "fallback",
        error: error?.message,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedProducts = (data as any[]).map(mapSupabaseProductToUI);
    return {
      products: mappedProducts,
      source: "supabase",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("Supabase query exception, fallback engaged:", message);
    return {
      products: mockProducts as Product[],
      source: "fallback",
      error: message,
    };
  }
}

/**
 * Fetches a single product by its slug with automatic fallback.
 */
export async function getProductBySlug(slug: string): Promise<{ product: Product | null; source: "supabase" | "fallback" }> {
  const supabase = getSupabaseClient();

  if (!supabase || !isSupabaseConfigured()) {
    const match = (mockProducts as Product[]).find((p) => p.slug === slug) || null;
    return { product: match, source: "fallback" };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories:category_id (
          id,
          name,
          slug
        ),
        product_variants (*),
        product_media (*)
      `)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const match = (mockProducts as Product[]).find((p) => p.slug === slug) || null;
      return { product: match, source: "fallback" };
    }

    return {
      product: mapSupabaseProductToUI(data),
      source: "supabase",
    };
  } catch {
    const match = (mockProducts as Product[]).find((p) => p.slug === slug) || null;
    return { product: match, source: "fallback" };
  }
}

/**
 * Fetches categories with fallback to local curated categories.
 */
export async function getCategories(): Promise<{ categories: Category[]; source: "supabase" | "fallback" }> {
  const supabase = getSupabaseClient();

  if (!supabase || !isSupabaseConfigured()) {
    return { categories: mockCategories, source: "fallback" };
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || (data as unknown[]).length === 0) {
      return { categories: mockCategories, source: "fallback" };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped: Category[] = (data as any[]).map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      subtitle: c.description || "",
      badge: "Curated",
      image: c.banner_image_url,
    }));

    return { categories: mapped, source: "supabase" };
  } catch {
    return { categories: mockCategories, source: "fallback" };
  }
}
