"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { CuratedCategories } from "@/components/CuratedCategories";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ShoppableReels } from "@/components/ShoppableReels";
import { TrousseauSection } from "@/components/TrousseauSection";
import { TrustBadges } from "@/components/TrustBadges";
import { MessageCircle, Sparkles } from "lucide-react";
import { BRAND_PHONE } from "@/lib/utils";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Curated Categories Grid */}
      <CuratedCategories onSelectCategory={handleCategorySelect} />

      {/* 3. Product Catalog with Dual Stock Badges & WhatsApp Actions */}
      <ProductCatalog
        selectedCategoryFilter={selectedCategory}
        onSelectCategoryFilter={setSelectedCategory}
      />

      {/* 4. Shoppable Reels Wall ("Styled by You") */}
      <ShoppableReels />

      {/* 5. Gifting / Trousseau Add-ons Feature Section */}
      <TrousseauSection />

      {/* 6. Craftsmanship & Trust Badges */}
      <TrustBadges />

      {/* Floating Sticky WhatsApp Concierge Button */}
      <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
            "Namaste Tanvi! ✨ I am browsing gehnaboxbytanvi and would love some jewellery advice/help with placing an order."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2.5 px-4 py-3 bg-emerald hover:bg-emerald-700 text-ivory rounded-full shadow-2xl border-2 border-gold/40 hover:scale-105 transition-all duration-300"
          title="Chat with Stylist Tanvi on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-gold" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
          </div>
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            Stylist Chat
          </span>
        </a>
      </aside>
    </div>
  );
}
