"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

interface CuratedCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
}

export function CuratedCategories({ onSelectCategory }: CuratedCategoriesProps) {
  const handleClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const catalogElem = document.getElementById("catalog");
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-ivory-100/60 border-b border-ivory-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Shop by Signature Category
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70">
            From majestic Mewari bridal heirlooms to sweat-safe daily wear chains, explore our six core karigari collections.
          </p>
        </div>

        {/* 6 Category Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.name)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] bg-ivory-300 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 border border-ivory-border"
            >
              {/* Image with smooth zoom */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dynamic Gradient Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Top Tag Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 bg-ivory/90 backdrop-blur-md text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {cat.badge}
                </span>
                <span className="w-8 h-8 rounded-full bg-ivory/80 backdrop-blur-md flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-white transition-colors duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 text-ivory">
                <div className="text-[10px] font-mono tracking-widest uppercase text-gold-light mb-1">
                  Collection 0{idx + 1}
                </div>
                <h3 className="font-serif text-2xl font-normal text-ivory group-hover:text-gold-light transition-colors duration-300 leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-ivory/70 line-clamp-1 mt-1 font-light group-hover:text-ivory transition-colors">
                  {cat.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-gold-light">
                  <span>Explore Pieces</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
