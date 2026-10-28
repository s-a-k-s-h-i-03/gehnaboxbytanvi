"use client";

import React from "react";
import Image from "next/image";
import { Gift, Sparkles, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { BRAND_PHONE } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export function TrousseauSection() {
  const { setIsGiftWrap, setIsCartOpen } = useCart();

  const handleActivateGiftBox = () => {
    setIsGiftWrap(true);
    setIsCartOpen(true);
  };

  return (
    <section id="trousseau" className="py-16 sm:py-24 bg-emerald text-ivory relative overflow-hidden">
      {/* Decorative Gold Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-gold/20 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-gold/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold-light text-xs uppercase tracking-widest font-semibold">
              <Gift className="w-3.5 h-3.5 text-gold" />
              <span>Bridal Gifting & Trousseau Boxes</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight">
              Unbox Pure Heirloom Emotion with our{" "}
              <span className="italic text-gold-light">Signature Trousseau Box</span>
            </h2>

            <p className="text-ivory/80 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Elevate your bridal adornments or festive gifts. For just <strong className="text-gold-light font-semibold">+₹150</strong>, receive our rigid magnetic emerald keepsake box, gold-foil embossed logo, royal emerald velvet pouch, and a bespoke handwritten calligraphy card.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs text-ivory/90">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Rigid Magnetic Keepsake Box</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Gold-Foil Embossed Luxury Monogram</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Heavy Velvet Pouch (Anti-Scratch)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Handwritten Calligraphy Card Note</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={handleActivateGiftBox}
                className="px-7 py-3.5 bg-gold hover:bg-gold-light text-charcoal text-xs uppercase tracking-[0.2em] font-bold rounded-none shadow-gold-glow transition-all flex items-center justify-center space-x-2"
              >
                <span>Add Trousseau Box (+₹150)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                  "Namaste Tanvi! I would like to inquire about bulk wedding gifting and curated Bridesmaid Trousseau boxes."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-emerald-700/60 hover:bg-emerald-700 border border-gold/40 text-ivory text-xs uppercase tracking-widest font-semibold rounded-none transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>Bridesmaid Bulk Inquiry</span>
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-charcoal">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Trousseau Gift Packaging Box"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-ivory">
                <div className="text-[10px] uppercase tracking-widest text-gold-light font-mono">
                  Gifting Experience
                </div>
                <div className="font-serif text-xl sm:text-2xl font-normal text-ivory mt-0.5">
                  The Royal Trousseau Keepsake
                </div>
                <div className="text-xs text-ivory/80 mt-1">
                  Ready to present to brides, mothers, and soul sisters.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
