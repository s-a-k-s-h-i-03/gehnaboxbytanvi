"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Gem } from "lucide-react";
import { BRAND_PHONE } from "@/lib/utils";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-ivory-border/60">
      {/* Subtle Luxury Gradient Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs tracking-wider uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Couture Karigari • 24K Micro Gold Plating</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="block font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-dark font-semibold">
                Imitation Jewellery • Made to Embellish
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-charcoal font-normal">
                Regal Splendor for the{" "}
                <span className="italic font-normal text-emerald">Modern Muse</span>
              </h1>
            </motion.div>

            {/* Description Paragraph */}
            <motion.div variants={itemVariants}>
              <p className="text-charcoal/80 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Bridging generational Mewari Kundan-Polki craft and contemporary waterproof brass. Hand-finished with authentic semi-precious stone setting—designed to photograph with breathtaking royalty, without the fine gold ransom.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <a
                href="#catalog"
                className="px-8 py-4 bg-emerald hover:bg-emerald-700 text-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-none shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <span>Explore Bridal Sets</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                  "Namaste Tanvi! ✨ I would like to order jewellery and request bridal styling assistance for my outfit."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-ivory-300 hover:bg-gold/20 text-charcoal border border-gold/40 text-xs uppercase tracking-[0.2em] font-semibold rounded-none transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald" />
                <span>Order via WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust Pills Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-ivory-border/70 grid grid-cols-3 gap-4 text-charcoal/80"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 text-gold-dark">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal">Faceted Polki</div>
                  <div className="text-[10px] text-charcoal/60">Glass Uncut Stones</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 text-emerald">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal">Zero Nickel</div>
                  <div className="text-[10px] text-charcoal/60">100% Skin Safe</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center flex-shrink-0 text-charcoal">
                  <span className="font-serif text-sm font-bold">10K+</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal">Brides Styled</div>
                  <div className="text-[10px] text-charcoal/60">Pan-India & Global</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visuals Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Portrait Card */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-ivory-border bg-ivory-300">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
                  alt="gehnaboxbytanvi Luxury Bridal Choker Set"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-ivory">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 bg-gold text-charcoal text-[9px] font-bold tracking-widest uppercase rounded">
                      Bridal Edit
                    </span>
                    <span className="text-ivory/80 text-[11px] font-mono tracking-wide">
                      #GBT-BRD-001
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory font-normal leading-snug">
                    Padmavati Jadau Kundan Set
                  </h3>
                  <p className="text-xs text-ivory/80 font-light mt-0.5">
                    Russian Hydro Emeralds & Natural Seed Pearls
                  </p>
                </div>
              </div>

              {/* Floating Secondary Detail Accent Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 sm:-left-8 bg-ivory p-3.5 sm:p-4 rounded-xl shadow-luxury-hover border border-ivory-border max-w-[210px] hidden sm:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 border border-gold/40">
                    <Image
                      src="https://images.unsplash.com/photo-1611591475102-470e7960098f?auto=format&fit=crop&w=200&q=80"
                      alt="Temple Filigree Kada detail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald">
                      Ready to Ship ⚡
                    </div>
                    <div className="text-xs font-serif font-bold text-charcoal">
                      Temple Kadas (Pair)
                    </div>
                    <div className="text-[11px] font-semibold text-gold-dark mt-0.5">
                      ₹2,899
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Gold Emblem Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-emerald text-ivory p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-emerald-glow border-2 border-gold/40">
                <Sparkles className="w-4 h-4 text-gold mb-1" />
                <span className="font-serif text-[11px] font-medium leading-tight">
                  Handcrafted
                </span>
                <span className="text-[8px] uppercase tracking-widest text-gold-light mt-0.5">
                  Artisan Edition
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
