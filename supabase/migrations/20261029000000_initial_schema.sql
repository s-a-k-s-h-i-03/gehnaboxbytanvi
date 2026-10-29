-- =========================================================================
-- gehnaboxbytanvi: Initial Supabase Schema Migration
-- Database: Supabase PostgreSQL with Row Level Security (RLS)
-- Storage: `product-media` Public Bucket
-- =========================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Enums
DO $$ BEGIN
    CREATE TYPE item_stock_type AS ENUM ('READY_TO_SHIP', 'MADE_TO_ORDER');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'IN_MAKING', 'DISPATCHED', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_channel AS ENUM ('ONLINE_RAZORPAY', 'COD', 'WHATSAPP_MANUAL');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(80) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    banner_image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    sku VARCHAR(64) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    mrp_inr NUMERIC(10, 2) NOT NULL,
    item_type item_stock_type DEFAULT 'READY_TO_SHIP',
    lead_time_days INT DEFAULT 2,
    base_material VARCHAR(100) NOT NULL,
    plating_type VARCHAR(100) NOT NULL,
    stone_type VARCHAR(120),
    is_gift_wrappable BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Product Variants Table (Sizes, Colorways)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(100) NOT NULL,
    sku_modifier VARCHAR(30),
    stock_quantity INT DEFAULT 10,
    price_delta_inr NUMERIC(10, 2) DEFAULT 0.00,
    color_code VARCHAR(30)
);

-- 6. Product Media Gallery Table
CREATE TABLE IF NOT EXISTS product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(20) DEFAULT 'IMAGE',
    display_order INT DEFAULT 0,
    alt_text VARCHAR(255)
);

-- 7. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(60) UNIQUE NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(150),
    shipping_address JSONB NOT NULL,
    subtotal_inr NUMERIC(10, 2) NOT NULL,
    gift_wrap_selected BOOLEAN DEFAULT FALSE,
    gift_wrap_fee_inr NUMERIC(10, 2) DEFAULT 0.00,
    gift_message TEXT,
    total_inr NUMERIC(10, 2) NOT NULL,
    status order_status DEFAULT 'PENDING',
    payment_mode payment_channel DEFAULT 'ONLINE_RAZORPAY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price_inr NUMERIC(10, 2) NOT NULL
);

-- 9. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_item_type ON products(item_type);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_media_product ON product_media(product_id);
CREATE INDEX IF NOT EXISTS idx_categories_display ON categories(display_order);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 11. Storefront Public Read Policies
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
CREATE POLICY "Public categories are viewable by everyone"
    ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public products are viewable by everyone" ON products;
CREATE POLICY "Public products are viewable by everyone"
    ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public variants are viewable by everyone" ON product_variants;
CREATE POLICY "Public variants are viewable by everyone"
    ON product_variants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public media is viewable by everyone" ON product_media;
CREATE POLICY "Public media is viewable by everyone"
    ON product_media FOR SELECT USING (true);

-- 12. Customer Orders Creation Policies (Insert only, select restricted)
DROP POLICY IF EXISTS "Anyone can create customer orders" ON orders;
CREATE POLICY "Anyone can create customer orders"
    ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create order line items" ON order_items;
CREATE POLICY "Anyone can create order line items"
    ON order_items FOR INSERT WITH CHECK (true);

-- 13. Supabase Storage Bucket Initialization (`product-media`)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-media',
    'product-media',
    true,
    5242880, -- 5 MB per asset
    ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/avif'];

-- Storage Public Read Access
DROP POLICY IF EXISTS "Product media images are publicly accessible" ON storage.objects;
CREATE POLICY "Product media images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-media');
