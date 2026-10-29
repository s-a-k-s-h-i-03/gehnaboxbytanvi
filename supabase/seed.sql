-- =========================================================================
-- gehnaboxbytanvi: Seed Data for Supabase
-- Populates all 6 core categories, 8 signature products, variants & media
-- =========================================================================

-- Clear existing data if reseeding
TRUNCATE TABLE order_items, orders, product_media, product_variants, products, categories CASCADE;

-- 1. Insert Categories
INSERT INTO categories (id, slug, name, description, banner_image_url, display_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'kundan-polki-bridal', 'Kundan & Polki Bridal', 'Uncut Glass Polki, Jadau Chokers & Banarasi Meenakari', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', 1),
('c1000000-0000-0000-0000-000000000002', 'bangles-kadas', 'Bangles & Kadas', 'Openable Screw Filigree, Temple Nakshi & Rajwadi Cuffs', 'https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=800&q=80', 2),
('c1000000-0000-0000-0000-000000000003', 'oxidised-silver', 'Oxidised Silver & Tribal', 'Vintage Dual-Tone Haslis, Ghungroo Chokers & Boho Cuffs', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', 3),
('c1000000-0000-0000-0000-000000000004', 'daily-wear', 'Brass & Copper Daily Wear', 'Anti-Tarnish 18K PVD Waterproof Chains & Minimal Pave Hoops', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 4),
('c1000000-0000-0000-0000-000000000005', 'western-minimal', 'Western Minimal', 'Baroque Freshwater Pearls, Baguette Tennis Bands & Sleek Drops', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', 5),
('c1000000-0000-0000-0000-000000000006', 'hair-accessories', 'Hair Accessories & Mathapattis', 'Architectural Sheeshpattis, Velvet-Lined Passas & Bridal Combs', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80', 6);

-- 2. Insert Products
INSERT INTO products (
    id, category_id, sku, slug, title, subtitle, description, price_inr, mrp_inr, item_type, lead_time_days, base_material, plating_type, stone_type, is_gift_wrappable, is_featured, is_trending
) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'GBT-BRD-001',
    'padmavati-jadau-kundan-bridal-choker-set',
    'Padmavati Jadau Kundan Bridal Choker Set',
    'Handcrafted Uncut Glass Polki with Russian Hydro Emerald Drops',
    'Inspired by royal Mewari court heirlooms, the Padmavati Choker Set features intricate Meenakari enameling on reverse, dual-tier Jadau setting, matching statement chandelier earrings (chandbalis), and a majestic matching maang tikka. Hypoallergenic, tarnish-resistant, and tailored for big-day grandeur.',
    5499.00,
    8999.00,
    'MADE_TO_ORDER',
    8,
    'High-Density Brass Alloy',
    '24K Antique Micro Gold Plating',
    'Faceted Uncut Kundan, Hand-carved Hydro Emeralds & Natural Seed Pearls',
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'GBT-BNG-002',
    'surya-dev-temple-filigree-kada-pair',
    'Surya Dev Temple Filigree Kada (Pair)',
    'Openable Screw Heritage Bangles with Nakshi Carvings',
    'Exquisite temple jewellery craftsmanship depicting solar motifs and divine peacock flourishes. Crafted with an ergonomic screw clasp to comfortably fit multiple wrist sizes with effortless grace. Nickel-safe and anti-allergic finish.',
    2899.00,
    4500.00,
    'READY_TO_SHIP',
    1,
    'Pure Copper & Brass Composite',
    'Matte Temple Gold with Antique Patina',
    'Cabochon Kemp Stones & Freshwater Seed Pearls',
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000003',
    'GBT-OXI-003',
    'chandrika-dual-tone-oxidised-ghungroo-hasli',
    'Chandrika Dual-Tone Oxidised Ghungroo Hasli',
    'Tribal Silver Collar with Melodic Mini Ghungroos',
    'A striking statement rigid collar (hasli) that sits elegantly on the collarbone. Accentuated with chime-ready miniature ghungroos and traditional Rajasthani mirror glass work. Pairs seamlessly with handloom sarees, linen kurtas, or sharp black blazers.',
    1950.00,
    3200.00,
    'READY_TO_SHIP',
    1,
    'Sterling-Grade German Silver Base',
    'Oxidised Vintage Silver & Antique Brass Dual Tone',
    'Mirror Glass & Carved Floral Motifs',
    true,
    false,
    false
),
(
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000004',
    'GBT-DLY-004',
    'lumina-anti-tarnish-celestial-paperclip-chain',
    'Lumina Anti-Tarnish Celestial Paperclip Chain',
    'Waterproof 18K PVD Gold Daily Layering Essential',
    'Built for the woman on the move. Shower-safe, sweat-safe, and perfume-resilient. Features an elongated paperclip chain link accompanied by a detachable celestial coin medallion embedded with star-cut cubic zirconia.',
    1499.00,
    2400.00,
    'READY_TO_SHIP',
    1,
    'Hypoallergenic Surgical Brass Core',
    '18K PVD Physical Vapor Deposition (Waterproof)',
    'Micro-Pavé AAA Grade Cubic Zirconia',
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000005',
    'GBT-WST-005',
    'noor-baroque-pearl-droplet-modern-hoops',
    'Noor Baroque Pearl Droplet Modern Hoops',
    'Artisanal Organic Freshwater Pearls on Sculpted Gold',
    'Every single baroque pearl is hand-selected for its distinctive organic silhouette and rainbow orient luster. Suspended from brushed gold demi-hoops with secure click-shut hinge posts. Effortlessly transitions from office presentations to cocktail evenings.',
    1699.00,
    2850.00,
    'READY_TO_SHIP',
    1,
    'Solid Eco-Brass',
    'Thick 2.5 Micron 18K Yellow Gold Dip',
    'Cultured Baroque Pearls (100% Unique Silhouette)',
    true,
    false,
    false
),
(
    'p1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000006',
    'GBT-HAR-006',
    'gulmohar-royal-jadau-sheeshpatti-mathapatti',
    'Gulmohar Royal Jadau Sheeshpatti Mathapatti',
    'Architectural Bridal Hair Jewellery with Kashmiri Pearls',
    'A crowning glory for Indian bridal couture. The Gulmohar Sheeshpatti features a flexible curved band lined with velvet on the underside for hours of pin-free comfort. Encrusted with brilliant faceted Kundan stones and delicate pearl cluster drops framing the forehead.',
    3799.00,
    5999.00,
    'MADE_TO_ORDER',
    10,
    'Jeweller''s Copper & Brass Alloy',
    '22K High-Luster Antique Micro-Plating',
    'Polki Kundan, Ruby Quartz & Hand-Strung Pearls',
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000007',
    'c1000000-0000-0000-0000-000000000001',
    'GBT-BRD-007',
    'meera-meenakari-peacock-chandbalis',
    'Meera Hand-Enamelled Meenakari Chandbalis',
    'Traditional Banarasi Karigari with Jhumki Clusters',
    'Hand-painted by generational karigars in Varanasi, these crescent moon earrings (chandbalis) showcase vibrant floral meenakari on the reverse and shimmering kundan on the front, edged with natural seed pearl bunches. Lightweight ear-supports included.',
    2499.00,
    3999.00,
    'READY_TO_SHIP',
    2,
    'Brass and Copper Base',
    '22K Antique Gold with Lacquer Coating',
    'Kundan Stones with Hand-painted Green & Pink Enamel',
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000008',
    'c1000000-0000-0000-0000-000000000005',
    'GBT-WST-008',
    'aurora-baguette-solitaire-tennis-bracelet',
    'Aurora Baguette Solitaire Tennis Bracelet',
    'Couture Diamond-Alternative with Double Safety Clasp',
    'Precision prong-set with alternating round brilliant and baguette-cut simulated diamonds that sparkle intensely under candlelight and flash photography. Features an authentic double-safety jewelry latch for worry-free luxury wear.',
    2199.00,
    3600.00,
    'READY_TO_SHIP',
    1,
    'Hypoallergenic Pure Brass Alloy',
    'Rhodium Platinum & 18K White Gold Dual Dipped',
    'Heart & Arrow Flawless 5A Cubic Zirconia',
    true,
    false,
    false
);

-- 3. Insert Product Variants
INSERT INTO product_variants (product_id, variant_name, sku_modifier, stock_quantity, color_code) VALUES
-- Padmavati variants
('p1000000-0000-0000-0000-000000000001', 'Emerald Green Drops', 'EMR', 4, '#1C3B2B'),
('p1000000-0000-0000-0000-000000000001', 'Ruby Crimson Drops', 'RBY', 3, '#8B1E2D'),
('p1000000-0000-0000-0000-000000000001', 'Pastel Mint Drops', 'MNT', 5, '#A4C3B2'),
-- Surya Dev Kada variants
('p1000000-0000-0000-0000-000000000002', 'Size 2.4 (Small - 57.2mm)', 'SZ-24', 12, NULL),
('p1000000-0000-0000-0000-000000000002', 'Size 2.6 (Medium - 60.3mm)', 'SZ-26', 18, NULL),
('p1000000-0000-0000-0000-000000000002', 'Size 2.8 (Large - 63.5mm)', 'SZ-28', 9, NULL),
-- Chandrika Hasli variants
('p1000000-0000-0000-0000-000000000003', 'Vintage Dual Tone (Silver & Gold)', 'DT', 15, NULL),
('p1000000-0000-0000-0000-000000000003', 'Full Antique Silver Patina', 'SIL', 11, NULL),
-- Lumina Chain variants
('p1000000-0000-0000-0000-000000000004', '16 inch + 2 inch Extender', '16IN', 25, NULL),
('p1000000-0000-0000-0000-000000000004', '18 inch + 2 inch Extender', '18IN', 20, NULL),
-- Noor Hoops variants
('p1000000-0000-0000-0000-000000000005', 'Warm Gold Clasp', 'GLD', 14, NULL),
('p1000000-0000-0000-0000-000000000005', 'Rose Gold Clasp', 'RSG', 8, NULL),
-- Gulmohar Sheeshpatti variants
('p1000000-0000-0000-0000-000000000006', 'Ruby & Kundan White', 'RBY-WHT', 6, NULL),
('p1000000-0000-0000-0000-000000000006', 'Monochrome Royal Ivory Kundan', 'IVY-KUN', 8, NULL),
-- Meera Chandbalis variants
('p1000000-0000-0000-0000-000000000007', 'Emerald Meenakari & Pearl', 'EMR-PRL', 16, NULL),
('p1000000-0000-0000-0000-000000000007', 'Rani Pink Meenakari & Pearl', 'RNI-PRL', 10, NULL),
-- Aurora Tennis Bracelet variants
('p1000000-0000-0000-0000-000000000008', 'Platinum Rhodium Silver', 'PLT', 18, NULL),
('p1000000-0000-0000-0000-000000000008', 'Champagne Warm Gold', 'CHM', 14, NULL);

-- 4. Insert Product Media Gallery (Linked to Unsplash or Supabase Storage)
INSERT INTO product_media (product_id, media_url, media_type, display_order, alt_text) VALUES
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Padmavati Kundan Bridal Choker Set main view'),
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Padmavati Chandbali earrings detail'),
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 3, 'Padmavati Karigari reverse Meenakari detail'),
('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Surya Dev Temple Kada pair front'),
('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Surya Dev Temple Kada openable clasp detail'),
('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Chandrika Dual Tone Oxidised Hasli collar'),
('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Chandrika Ghungroo chime cluster detail'),
('p1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Lumina Waterproof Paperclip Chain on model'),
('p1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Lumina celestial medallion coin close-up'),
('p1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Noor Baroque Pearl Modern Hoops pair'),
('p1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Noor organic freshwater pearl luster view'),
('p1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Gulmohar Jadau Sheeshpatti bridal crown'),
('p1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Gulmohar velvet-lined underside and seed pearls'),
('p1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Meera Enamelled Meenakari Chandbalis'),
('p1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Meera reverse side floral meenakari art'),
('p1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 1, 'Aurora Baguette Solitaire Tennis Bracelet wrist view'),
('p1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80', 'IMAGE', 2, 'Aurora double safety clasp mechanism');
