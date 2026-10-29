# Product Requirement Document (PRD)
## Brand: gehnaboxbytanvi
**Tagline:** *Imitation Jewellery • Made to Embellish*  
**Document Version:** 1.0.0  
**Status:** Approved & In-Development  
**Author:** Tanvi & Digital Product Engineering Team  

---

## 1. Executive Summary & Brand Positioning

### 1.1 Executive Summary
**gehnaboxbytanvi** is an artisanal, luxury direct-to-consumer (D2C) imitation jewellery label celebrating royal Indian heritage craftsmanship, modern minimalism, and effortless opulence. We bridge the gap between high-ticket bridal fine jewellery and accessible, premium-finish fashion adornments. 

By employing semi-precious stone setting, 18k–24k antique micro-gold plating, high-grade brass/copper alloys, and authentic artisan craftsmanship, gehnaboxbytanvi delivers bridal, festive, and contemporary lifestyle adornments that rival heirloom jewels without the luxury markup.

### 1.2 Brand Positioning & Aesthetic DNA
- **Brand Purpose:** Democratize regal adornment while honoring regional artisan traditions (Kundan karigari, Meenakari enameling, Jadau, temple filigree, and contemporary oxidised silverwork).
- **Core Value Proposition:** High-luster, nickel-free, hypoallergenic statement pieces with dual fulfillment models (instant dispatch vs. bespoke made-to-order).
- **Design Philosophy:** "Royal Heritage Meets Modern Poise."
- **Visual Identity System:**
  - **Background (Ivory Silk):** `#FBF8F3` (warm, tactile, editorial luxury canvas)
  - **Secondary / Heritage Accent (Deep Forest Emerald):** `#1C3B2B` (regal, timeless undertone)
  - **Metallic / Action Accent (Antique Gold):** `#C5A059` (prestige, festive warmth)
  - **Typography & Dark Contrast (Espresso Charcoal):** `#2B2625` (soft, high-end editorial readability)
  - **Headings Font:** *Cormorant Garamond* (poetic serifs, luxury editorial dignity)
  - **Body Font:** *Montserrat / Inter* (crisp, modern geometric readability at small scales)

---

## 2. Target Audience & User Personas

### 2.1 Persona 1: The Modern Indian Bride & Bridesmaid (Aanya, 27)
- **Profile:** IT Consultant, getting married in Udaipur; seeks heavy bridal choker sets, mathapattis, and haathphools that look 100% authentic in 4K photography and destination wedding lighting.
- **Pain Points:** Fine gold jewellery is stressful to travel with and prohibitively expensive for pre-wedding events (Mehendi, Sangeet). Cheap imitation looks artificial and turns green.
- **Needs:** Realistic Polki/Kundan luster, custom trousseau gift packaging, direct WhatsApp consultation for matching jewellery with lehenga swatches.

### 2.2 Persona 2: The Festive & Wedding Guest Gifter (Ritu, 34)
- **Profile:** Creative Director attending 5 weddings every winter season; seeks statement earrings (chandbalis, jhumkas) and gifting boxes for relatives.
- **Pain Points:** Generic packaging; inability to guarantee delivery dates before festive dates.
- **Needs:** "Ready-to-Ship" clear dispatch tags, Trousseau Box add-on option (+₹150) with handwritten gift notes, COD support with quick OTP verification.

### 2.3 Persona 3: The Contemporary Minimalist / Gen Z (Simran, 22)
- **Profile:** University student & lifestyle creator who mixes western blazers with oxidised silver chokers or anti-tarnish micro-plated daily hoops.
- **Pain Points:** Heavy traditional pieces don't suit western outfits; lack of styling inspiration.
- **Needs:** "Styled by You" shoppable reels, budget-friendly everyday brass/copper items, 1-click WhatsApp order.

---

## 3. Technical Architecture & Tech Stack

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  Next.js 14+ (App Router)  •  React 18/19  •  TypeScript  •  Tailwind CSS       |
|  Framer Motion (60fps Gestures)  •  Lucide Icons  •  Lenis Smooth Scrolling     |
+----------------------------------------+----------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                                APPLICATION API                                 |
|  Next.js Server Actions & Route Handlers (/api/checkout, /api/whatsapp-builder) |
|  Edge Middleware (Geo/Currency, SEO canonicalization, Rate-limiting)            |
+-------------------+--------------------+--------------------+-------------------+
                    |                    |                    |
                    v                    v                    v
+-----------------------+ +--------------------+ +-------------------------------+
|  DATABASE (POSTGRES)  | |  COMMERCE INTEGR.  | |    SUPABASE MEDIA STORAGE     |
|  Supabase PostgreSQL  | |  Razorpay / Cashfree| |  Supabase Storage (1GB Free) |
|  Row Level Security   | |  WhatsApp Business | |  Bucket: `product-media`     |
|  @supabase/supabase-js| |  Interakt / Wati   | |  WebP Standard • Edge CDN     |
+-----------------------+ +--------------------+ +-------------------------------+
```

### 3.1 Stack Breakdown & Cloud Services
- **Frontend Framework:** Next.js (App Router, Server & Client Components) with TypeScript.
- **Styling Engine:** Tailwind CSS with custom HSL token architecture matching `#FBF8F3` (Ivory), `#1C3B2B` (Emerald), `#C5A059` (Antique Gold), and `#2B2625` (Charcoal).
- **Animation Suite:** Framer Motion for staggered hero reveals, micro-interactions, spring drawers, and reel modals.
- **Icons & Typography:** Lucide React, Google Fonts (`Cormorant Garamond`, `Montserrat`).
- **Database Layer (Supabase PostgreSQL):** Hosted PostgreSQL database on Supabase with granular Row Level Security (RLS) policies isolating read/write privileges.
- **Media & Asset Storage (Supabase Storage):** Dedicated `product-media` storage bucket (1 GB Free Tier quota) serving high-resolution product imagery compressed to modern WebP standards with public read CDN delivery.
- **Client Architecture & Resilient Dual-Mode Data Access:** `@supabase/supabase-js` client with an automatic graceful fallback mechanism to `data/products.json` when Supabase credentials are absent or database is in provisioning.
- **Deployment & Hosting:** Vercel Edge Network with automated CI/CD from GitHub.

---

## 4. Feature Specifications

### 4.1 Curated Category Browsing
The platform organizes its collection into 6 distinct luxury verticals:
1. **Kundan & Polki Bridal:** Uncut glass stone chokers, jadau bridal sets, mathapattis, and hathphools.
2. **Brass & Copper Daily Wear:** Hypoallergenic, anti-tarnish micro-gold plated chains, minimalist hoops, and stackable rings.
3. **Oxidised Silver & Tribal:** Handcrafted dual-tone temple necklaces, ghungroo chokers, and boho statement cuffs.
4. **Western Minimal:** Clean geometric pendants, pearl drop studs, sleek tennis bracelets for corporate and evening attire.
5. **Hair Accessories & Mathapattis:** Passa, bridal combs, sheeshpatti, and crystal hairpins.
6. **Bangles & Kadas:** Openable screws, temple kadas, chooda accents, and meenakari bangles (sizes 2.4, 2.6, 2.8).

### 4.2 Dual Stock Model
Every product explicitly discloses its inventory fulfillment paradigm:
- **`READY_TO_SHIP` (Mass-Stocked):** Dispatches in 24–48 hours. Green/Emerald badge indicator (`"In Stock • Dispatches Tomorrow"`).
- **`MADE_TO_ORDER` (Artisan Handcrafted):** Requires 7–12 business days karigari lead time. Amber/Gold badge indicator (`"Artisan Made to Order • 7-10 Days Karigari"`). Clear lead-time estimation in cart and product pages.

### 4.3 Hybrid Purchase Flow (Online Checkout + Instant WhatsApp Commerce)
Recognizing high purchase conversion dynamics in the Indian boutique jewellery ecosystem:
1. **Online Payment Gateway Flow:**
   - Multi-tier checkout supporting UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Cash on Delivery (COD).
   - COD orders trigger an automated OTP confirmation SMS to deter RTO (Return to Origin).
2. **Instant WhatsApp Order & Concierge Inquiry:**
   - Every product card and cart drawer features a dedicated **"Order via WhatsApp"** button.
   - Automatically builds an encoded deep link directly to the brand’s WhatsApp business number (`+91 98765 43210`) with product title, SKU, variant, price, current page link, and custom inquiries.
   - Example template:
     > *"Namaste Tanvi! ✨ I would like to order the **Royal Padmavati Kundan Choker Set** (SKU: GBT-BRD-001) in Emerald Green. Price: ₹4,499. Please share payment details & delivery schedule to Pincode: [____]. Link: https://gehnaboxbytanvi.com/products/royal-padmavati-kundan-choker-set"*

### 4.4 Luxury Gifting & Trousseau Add-ons
- One-click checkbox in Cart Drawer: **"Add Luxury Trousseau Gift Packaging (+₹150)"**.
- Includes velvet keepsake jewellery pouch, rigid magnetic gift box embossed with gold foil logo, and a customizable handwritten calligraphy card note.

### 4.5 Shoppable Reels & "Styled by You" Video Wall
- 9:16 vertical video card marquee featuring real brides, influencers, and Tanvi’s styling tutorials.
- Hover playback simulation with interactive **"Shop This Look"** overlay trigger.
- Clicking opens a micro-modal previewing the featured jewellery pieces with direct "Add to Bag" and WhatsApp consult actions.

---

## 5. Database Schema & Data Models (PostgreSQL / Supabase)

```sql
-- Enums
CREATE TYPE item_stock_type AS ENUM ('READY_TO_SHIP', 'MADE_TO_ORDER');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'IN_MAKING', 'DISPATCHED', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_channel AS ENUM ('ONLINE_RAZORPAY', 'COD', 'WHATSAPP_MANUAL');

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(80) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    banner_image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
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
    base_material VARCHAR(100) NOT NULL, -- e.g., 'Brass alloy', 'Silver 92.5 base', 'Copper'
    plating_type VARCHAR(100) NOT NULL,  -- e.g., '22K Micro Gold Plated', 'Antique Silver'
    stone_type VARCHAR(120),             -- e.g., 'Faceted Glass Kundan, Hydro Emeralds'
    is_gift_wrappable BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Media Gallery
CREATE TABLE product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(20) DEFAULT 'IMAGE', -- 'IMAGE' | 'VIDEO'
    display_order INT DEFAULT 0,
    alt_text VARCHAR(255)
);

-- Variants (e.g., Bangle Size, Stone Colorways)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(100) NOT NULL, -- e.g. 'Size 2.6', 'Ruby Pink'
    sku_modifier VARCHAR(30),
    stock_quantity INT DEFAULT 10,
    price_delta_inr NUMERIC(10, 2) DEFAULT 0.00
);

-- Orders
CREATE TABLE orders (
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

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price_inr NUMERIC(10, 2) NOT NULL
);

-- =========================================================================
-- Supabase Row Level Security (RLS) Policies
-- =========================================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public Read-Only Access for Storefront Browsing
CREATE POLICY "Public categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Public variants are viewable by everyone" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public media is viewable by everyone" ON product_media FOR SELECT USING (true);

-- Customer Order Creation (Public insert, restricted view)
CREATE POLICY "Anyone can create customer orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order line items" ON order_items FOR INSERT WITH CHECK (true);

-- =========================================================================
-- Supabase Storage Configuration (product-media Bucket)
-- =========================================================================
-- Create public storage bucket for product media assets (WebP format recommended)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-media',
    'product-media',
    true,
    5242880, -- 5 MB per asset max
    ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/avif']
) ON CONFLICT (id) DO NOTHING;

-- Storage Public Read Policy
CREATE POLICY "Product media images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-media');
```

---

## 6. Non-Functional Requirements & Performance Targets

| Metric | Target | Verification Method |
|---|---|---|
| **Largest Contentful Paint (LCP)** | < 1.8 seconds on 4G Mobile | Next.js Image Optimization, WebP/AVIF assets |
| **First Input Delay / INP** | < 100 ms | React 18 concurrent transitions, zero heavy JS locks |
| **Cumulative Layout Shift (CLS)** | < 0.05 | Explicit image aspect-ratio boxes |
| **Animation Performance** | Locked 60 FPS | Hardware-accelerated CSS & Framer Motion `transform/opacity` |
| **Accessibility (a11y)** | WCAG 2.1 AA | Accessible modal focus traps, aria labels on icon buttons |
| **SEO & OpenGraph** | 100/100 Lighthouse SEO | Structured JSON-LD schemas (`Product`, `BreadcrumbList`, `Store`) |
| **Mobile-First UX** | 100% thumb-zone reachable | Sticky bottom checkout bar, tap-friendly 48px touch targets |

---

## 7. Milestones & Future Roadmap

- **Phase 1 (Current Release - MVP Launch):**
  - High-luxury brand storefront with Next.js App Router, Tailwind CSS, Framer Motion.
  - 6 Core Categories with dynamic filtering & sorting.
  - Dual Stock Model with distinct badges & lead times.
  - Hybrid checkout: Reactive sliding cart drawer + Luxury Gift Packaging add-on + WhatsApp Direct Order Link Builder.
  - Shoppable "Styled by You" video reels marquee.
  - Production-ready Git repo initialization & deployment readiness.

- **Phase 2 (Post-Launch Expansion):**
  - Direct Razorpay/Cashfree Webhooks & automated COD OTP verification.
  - Augmented Reality (AR) "Try-on Choker & Earrings" via WebXR / Camera filter.
  - Custom Bridal Trousseau Curate-Your-Own Box 3D configurator.
  - Multi-currency switcher (USD, GBP, AED, CAD) with DHL Express international shipping calculator.

---

## 8. Living Document Protocol & Architecture Directive

> **LIVING DOCUMENT DIRECTIVE:** Whenever any system architectural change, database schema modification, API contract update, or core business logic change is introduced, this `PRD.md` MUST be automatically updated in the same commit to maintain strict synchronization with the codebase.

