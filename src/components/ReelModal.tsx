"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Play,
  Heart,
  ShoppingBag,
  MessageCircle,
  Volume2,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";

export function ReelModal() {
  const {
    activeReel,
    closeReelModal,
    addItem,
    orderProductDirectWhatsApp,
    openQuickView,
  } = useCart();

  if (!activeReel) return null;

  const taggedProduct = (productsData as Product[]).find(
    (p) => p.slug === activeReel.featuredProductSlug
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeReelModal}
        className="fixed inset-0 bg-charcoal/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Reel Card Container */}
      <div className="relative bg-charcoal rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-gold/30 z-10 flex flex-col aspect-[9/16]">
        {/* Close Button */}
        <button
          onClick={closeReelModal}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video / Visual Simulation */}
        <div className="relative w-full h-full">
          <Image
            src={activeReel.videoPlaceholder}
            alt={activeReel.creatorName}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-transparent to-charcoal/40" />

          {/* Top Info */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <span className="px-2.5 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-wider rounded-full shadow">
              {activeReel.tag}
            </span>
          </div>

          {/* Center Play Simulation */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl animate-pulse">
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </div>
          </div>

          {/* Bottom Overlay & Tagged Product Card */}
          <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3">
            {/* Creator Caption */}
            <div className="text-ivory space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">
                  {activeReel.creatorName}
                </span>
                <span className="flex items-center space-x-1 text-xs text-ivory/80">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{activeReel.likes}</span>
                </span>
              </div>
              <div className="text-[11px] text-gold-light font-mono">
                {activeReel.handle}
              </div>
              <p className="text-xs text-ivory/90 leading-relaxed font-light">
                {activeReel.caption}
              </p>
            </div>

            {/* Tagged Product Highlight Card */}
            {taggedProduct && (
              <div className="p-3 rounded-xl bg-ivory/95 backdrop-blur-md border border-ivory-border shadow-2xl flex items-center justify-between">
                <div
                  className="flex items-center space-x-2.5 cursor-pointer flex-1 mr-2"
                  onClick={() => {
                    closeReelModal();
                    openQuickView(taggedProduct);
                  }}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gold/40">
                    <Image
                      src={taggedProduct.images[0]}
                      alt={taggedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald">
                      Featured Piece
                    </div>
                    <div className="font-serif text-xs font-bold text-charcoal line-clamp-1">
                      {taggedProduct.title}
                    </div>
                    <div className="text-xs font-serif font-bold text-gold-dark">
                      {formatINR(taggedProduct.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => addItem(taggedProduct)}
                    className="p-2 bg-emerald hover:bg-emerald-700 text-ivory rounded-lg shadow-sm"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold" />
                  </button>

                  <button
                    onClick={() => orderProductDirectWhatsApp(taggedProduct)}
                    className="p-2 bg-emerald/10 text-emerald hover:bg-emerald hover:text-ivory rounded-lg border border-emerald/30"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
