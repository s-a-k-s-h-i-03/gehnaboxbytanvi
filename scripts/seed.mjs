/**
 * gehnaboxbytanvi: Supabase Data Seeder Script
 * Usage: node scripts/seed.mjs
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Attempt to load .env.local if present
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...values] = trimmed.split("=");
      const val = values.join("=").replace(/^["']|["']$/g, "").trim();
      process.env[key.trim()] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("----------------------------------------------------------------");
console.log("✨ gehnaboxbytanvi: Supabase Database Seeder");
console.log("----------------------------------------------------------------");

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your_supabase_project_url")) {
  console.error("❌ Error: Missing Supabase credentials.");
  console.log("Please create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  console.log("You can also run the SQL script directly in your Supabase SQL Editor:");
  console.log("-> supabase/schema.sql (or supabase/migrations/20261029000000_initial_schema.sql)");
  console.log("-> supabase/seed.sql\n");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Connecting to: ${supabaseUrl}`);

  // 1. Read categories and products
  const productsPath = path.resolve(__dirname, "../data/products.json");
  const productsRaw = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

  const categories = [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      slug: "kundan-polki-bridal",
      name: "Kundan & Polki Bridal",
      description: "Uncut Glass Polki, Jadau Chokers & Banarasi Meenakari",
      banner_image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      display_order: 1,
    },
    {
      id: "c1000000-0000-0000-0000-000000000002",
      slug: "bangles-kadas",
      name: "Bangles & Kadas",
      description: "Openable Screw Filigree, Temple Nakshi & Rajwadi Cuffs",
      banner_image_url: "https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=800&q=80",
      display_order: 2,
    },
    {
      id: "c1000000-0000-0000-0000-000000000003",
      slug: "oxidised-silver",
      name: "Oxidised Silver & Tribal",
      description: "Vintage Dual-Tone Haslis, Ghungroo Chokers & Boho Cuffs",
      banner_image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      display_order: 3,
    },
    {
      id: "c1000000-0000-0000-0000-000000000004",
      slug: "daily-wear",
      name: "Brass & Copper Daily Wear",
      description: "Anti-Tarnish 18K PVD Waterproof Chains & Minimal Pave Hoops",
      banner_image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      display_order: 4,
    },
    {
      id: "c1000000-0000-0000-0000-000000000005",
      slug: "western-minimal",
      name: "Western Minimal",
      description: "Baroque Freshwater Pearls, Baguette Tennis Bands & Sleek Drops",
      banner_image_url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      display_order: 5,
    },
    {
      id: "c1000000-0000-0000-0000-000000000006",
      slug: "hair-accessories",
      name: "Hair Accessories & Mathapattis",
      description: "Architectural Sheeshpattis, Velvet-Lined Passas & Bridal Combs",
      banner_image_url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80",
      display_order: 6,
    },
  ];

  console.log("📦 Seeding 6 categories...");
  const { error: catErr } = await supabase.from("categories").upsert(categories, { onConflict: "slug" });
  if (catErr) {
    console.warn("Category insert notice:", catErr.message);
  } else {
    console.log("✅ Categories seeded successfully.");
  }

  // Map category slugs to ids
  const catSlugToId = {};
  categories.forEach((c) => {
    catSlugToId[c.slug] = c.id;
  });

  console.log(`💎 Seeding ${productsRaw.length} products with variants and media...`);

  for (let i = 0; i < productsRaw.length; i++) {
    const item = productsRaw[i];
    const categoryId = catSlugToId[item.categorySlug] || categories[0].id;

    const productPayload = {
      id: `b1000000-0000-0000-0000-${String(i + 1).padStart(12, "0")}`,
      sku: `GBT-${item.categorySlug.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
      slug: item.slug,
      title: item.title,
      subtitle: item.tagline,
      description: item.description,
      price_inr: item.price,
      mrp_inr: item.mrp,
      item_type: item.itemType,
      lead_time_days: item.leadTimeDays,
      base_material: item.baseMaterial,
      plating_type: item.platingType,
      stone_type: item.stoneType,
      is_gift_wrappable: item.isGiftWrappable ?? true,
      is_featured: item.isBestseller ?? false,
      is_trending: item.isBestseller ?? false,
      category_id: categoryId,
    };

    const { data: prodData, error: prodErr } = await supabase
      .from("products")
      .upsert(productPayload, { onConflict: "slug" })
      .select("id")
      .single();

    if (prodErr) {
      console.warn(`Product notice (${item.slug}):`, prodErr.message);
      continue;
    }

    const productId = prodData.id;

    // Variants
    if (item.variants && item.variants.length > 0) {
      const variantPayload = item.variants.map((v) => ({
        product_id: productId,
        variant_name: v.name,
        color_code: v.color || null,
        stock_quantity: v.stock || 10,
        price_delta_inr: 0,
      }));
      await supabase.from("product_variants").insert(variantPayload);
    }

    // Media
    if (item.images && item.images.length > 0) {
      const mediaPayload = item.images.map((imgUrl, idx) => ({
        product_id: productId,
        media_url: imgUrl,
        media_type: "IMAGE",
        display_order: idx + 1,
        alt_text: `${item.title} image ${idx + 1}`,
      }));
      await supabase.from("product_media").insert(mediaPayload);
    }

    console.log(`  ✓ ${item.title}`);
  }

  console.log("\n🎉 Supabase seeding complete!");
}

seed().catch((err) => {
  console.error("Seeder execution error:", err);
});
