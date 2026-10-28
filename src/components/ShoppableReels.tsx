"use client";

import React from "react";
import Image from "next/image";
import { Play, Heart, ShoppingBag, Sparkles, Volume2 } from "lucide-react";
import { SHOOPABLE_REELS } from "@/data/reels";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export function ShoppableReels() {
  const { openReelModal, openQuickView } = useCart();

  const handleShopLook = (slug: string) => {
    const product = (productsData as Product[]).find((p) => p.slug === slug);
    if (product) {
      openQuickView(product);
    }
  };

  return (
    <section id="styled-by-you" className="py-16 sm:py-24 bg-ivory-100/70 border-b border-ivory-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Real Brides & Tastemakers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Styled by You • Video Wall
            </h2>
            <p className="mt-2 text-sm text-charcoal/70 max-w-xl">
              Tap any reel to see our imitation pieces in natural movement and 4K celebration lighting.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald">
            <span>Scroll horizontally to discover</span>
            <span>→</span>
          </div>
        </div>

        {/* Horizontal Marquee / Scrollable Reel Wall */}
        <div className="flex space-x-5 overflow-x-auto pb-6 pt-2 hide-scrollbar snap-x snap-mandatory">
          {SHOOPABLE_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => openReelModal(reel)}
              className="group cursor-pointer relative flex-shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border-2 border-ivory-border bg-charcoal transition-all duration-300 snap-center"
            >
              {/* Vertical 9:16 Image / Video Simulation */}
              <Image
                src={reel.videoPlaceholder}
                alt={reel.creatorName}
                fill
                sizes="(max-width: 640px) 256px, 288px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-charcoal/40" />

              {/* Top Controls: Tag & Sound Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-ivory text-[10px] font-semibold uppercase tracking-widest rounded-full border border-white/20">
                  {reel.tag}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-ivory">
                  <Volume2 className="w-3.5 h-3.5 text-gold-light" />
                </div>
              </div>

              {/* Center Play Button Pulse */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-ivory/80 backdrop-blur-md flex items-center justify-center text-charcoal group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all shadow-lg">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Creator Meta & Quick "Shop This Look" */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-ivory text-xs mb-1">
                    <span className="font-semibold">{reel.creatorName}</span>
                    <span className="flex items-center space-x-1 text-[11px] text-ivory/80">
                      <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                      <span>{reel.likes}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-gold-light font-mono mb-1">
                    {reel.handle}
                  </div>
                  <p className="text-xs text-ivory/90 line-clamp-2 font-light leading-snug">
                    {reel.caption}
                  </p>
                </div>

                {/* Shop This Look Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShopLook(reel.featuredProductSlug);
                  }}
                  className="w-full py-2 px-3 bg-gold hover:bg-gold-dark text-charcoal text-[11px] uppercase tracking-wider font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-charcoal" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
