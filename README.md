# gehnaboxbytanvi ✨
> **Imitation Jewellery • Made to Embellish**

A luxury direct-to-consumer (D2C) boutique web storefront for **gehnaboxbytanvi**, celebrating royal Indian heritage craftsmanship, modern minimalism, and effortless opulence. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🎨 Brand Identity & Visual Language

- **Brand Name:** gehnaboxbytanvi
- **Brand Tagline:** *"Imitation Jewellery • Made to Embellish"*
- **Color Palette:**
  - **Ivory Silk (Canvas):** `#FBF8F3` (Soft luxury background)
  - **Heritage Emerald (Accent):** `#1C3B2B` (Royal timeless green)
  - **Antique Gold (Metallic CTA):** `#C5A059` (Festive warmth & button accents)
  - **Espresso Charcoal (Typography):** `#2B2625` (Editorial dark contrast)
- **Typography:**
  - **Headings:** *Cormorant Garamond* (Google Font serif)
  - **Body / Subtitles:** *Montserrat / Inter* (Crisp geometric sans)

---

## 👑 Core Features & Highlights

1. **Curated Signature Collections (6 Verticals):**
   - Kundan & Polki Bridal
   - Bangles & Kadas (Openable screw filigree)
   - Oxidised Silver & Tribal Haslis
   - Brass & Copper Daily Wear (Anti-Tarnish 18K PVD Waterproof)
   - Western Minimal (Baroque pearls & baguette tennis bracelets)
   - Hair Accessories & Sheeshpattis

2. **Dual Stock Fulfillment Model:**
   - **`Ready-to-Ship` (⚡ 24h Dispatch):** Mass-stocked essentials with emerald stock badges.
   - **`Made-to-Order` (✨ 7–10 Days Lead Time):** Custom artisan karigari with clear timeline disclosure.

3. **Hybrid Purchase Flow:**
   - **WhatsApp Commerce Concierge:** Direct 1-click WhatsApp order generation with pre-populated product SKU, variant, price, and custom inquiry notes.
   - **Cart Drawer & Checkout:** Slide-over cart drawer with live subtotal, Pan-India free delivery indicator, and online/COD order placement.

4. **Signature Trousseau Gift Packaging (+₹150):**
   - One-click cart checkbox for magnetic rigid keepsake box, gold-foil monogram, royal velvet pouch, and personalized handwritten calligraphy card.

5. **Shoppable Reels Wall ("Styled by You"):**
   - 9:16 vertical video marquee featuring real brides, influencers, and Tanvi’s styling tutorials.
   - Interactive **"Shop This Look"** modal with 1-click bag additions.

6. **Interactive Quick View & Wishlist:**
   - Multi-image gallery with hover-flip preview on product cards.
   - Persistent wishlist and cart state synced with `localStorage`.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom brand color tokens & luxury shadows
- **Animations:** Framer Motion (60fps staggered reveals, gestures, spring drawers)
- **Icons:** Lucide React
- **Typography:** Next.js Google Fonts (`Cormorant_Garamond`, `Montserrat`)
- **Database & Storage:** Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage (`product-media` bucket)
- **Resilient Dual-Mode Data Access:** Live query via `@supabase/supabase-js` with automatic, seamless fallback to `data/products.json` if credentials are unconfigured

---

## ⚡ Supabase Setup & Seeding

### 1. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=product-media
```

### 2. Database Migration & RLS
Run `supabase/schema.sql` (or `supabase/migrations/20261029000000_initial_schema.sql`) in your Supabase SQL Editor. It automatically:
- Creates `categories`, `products`, `product_variants`, `product_media`, `orders`, and `order_items`.
- Enables Row Level Security (RLS) with public read policies.
- Initializes the `product-media` storage bucket (WebP standard).

### 3. Seed Database
Run the seed script either via SQL or Node:
- **SQL Editor:** Run `supabase/seed.sql`
- **CLI / NPM:** Run `npm run db:seed` (reads `.env.local`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 24)
- npm or pnpm or yarn

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Production Build
npm run build
npm run start
```

---

## 📂 Project Structure

```
gehnaboxbytanvi/
├── PRD.md                         # Full Product Requirement Document (Living Doc)
├── README.md                      # Project Overview & Setup Guide
├── .env.example                   # Supabase environment variables template
├── package.json                   # Dependencies and scripts (incl. db:seed)
├── tailwind.config.ts             # Custom brand colors & typography tokens
├── tsconfig.json                  # TypeScript configuration & paths
├── next.config.mjs                # Next.js image domain configuration (Unsplash + Supabase)
├── supabase/
│   ├── schema.sql                 # Complete database schema, RLS & storage bucket
│   ├── migrations/
│   │   └── 20261029000000_initial_schema.sql  # Versioned migration
│   └── seed.sql                   # SQL seed data for categories, products & media
├── scripts/
│   └── seed.mjs                   # CLI seed runner (`npm run db:seed`)
├── data/
│   └── products.json              # Mock fallback dataset in root
└── src/
    ├── app/
    │   ├── globals.css            # Brand base styles & gold shimmer animations
    │   ├── layout.tsx             # Root layout with fonts, drawers & providers
    │   └── page.tsx               # Homepage assembling all sections
    ├── components/
    │   ├── Navbar.tsx             # Sticky blurred header, announcement, search
    │   ├── Hero.tsx               # Split hero with CTAs & floating trust badges
    │   ├── CuratedCategories.tsx  # 6-Category hover zoom grid
    │   ├── ProductCard.tsx        # Image hover flip, stock badges, dual CTAs
    │   ├── ProductCatalog.tsx     # Filterable product grid (live Supabase + fallback)
    │   ├── ShoppableReels.tsx     # 9:16 vertical video marquee
    │   ├── ReelModal.tsx          # Shop-this-look reel modal
    │   ├── QuickViewModal.tsx     # Multi-image preview modal with variants
    │   ├── CartDrawer.tsx         # Slide-over cart with Trousseau add-on & WhatsApp
    │   ├── WishlistDrawer.tsx     # Saved items drawer
    │   ├── TrousseauSection.tsx   # Bridal trousseau box showcase
    │   ├── TrustBadges.tsx        # 4 Core craftsmanship pillars
    │   └── Footer.tsx             # Brand manifesto, VIP club & care links
    ├── context/
    │   └── CartContext.tsx        # Global state for cart, wishlist & modals
    ├── data/
    │   ├── categories.ts          # Curated categories metadata
    │   ├── products.json          # 8 core products data
    │   └── reels.ts               # Shoppable video reels metadata
    ├── lib/
    │   ├── services/
    │   │   └── products.ts        # Resilient Supabase data service + fallback
    │   ├── supabase/
    │   │   └── client.ts          # Supabase client & storage URL constructor
    │   └── utils.ts               # WhatsApp link builders, formatINR, cn helper
    └── types/
        ├── database.types.ts      # Supabase PostgreSQL schema types
        └── index.ts               # TypeScript models (Product, Variant, Reel, etc.)
```

---

## 💍 Contact & Concierge
- **Brand:** gehnaboxbytanvi
- **WhatsApp Concierge:** `+91 98765 43210`
- **Location:** Rajasthan / Mumbai, India
