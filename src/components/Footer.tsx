"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  ShieldCheck,
  Truck,
  Sparkles,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { BRAND_DISPLAY_PHONE, BRAND_PHONE } from "@/lib/utils";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-charcoal text-ivory/80 pt-16 pb-12 border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Manifesto (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] uppercase text-ivory font-normal">
                gehnabox<span className="text-gold font-light">by</span>tanvi
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-gold-light mt-1 font-sans">
                Imitation Jewellery • Made to Embellish
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed max-w-sm font-light">
              We curate regal Indian imitation adornments crafted with 24K antique micro-gold plating, uncut Polki glass Karigari, and waterproof daily essentials. Heirloom perfection with modern poise.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                  "Namaste Tanvi! I would like to inquire about your collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>WhatsApp: {BRAND_DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-light font-sans">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Kundan & Polki Bridal
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Bangles & Kadas
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Anti-Tarnish Daily Chains
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Oxidised Silver Tribal
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Western Minimal
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition-colors">
                  Hair Accessories & Sheeshpattis
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-light font-sans">
              Care & Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trousseau" className="hover:text-gold transition-colors">
                  Trousseau Gifting Box
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-gold transition-colors">
                  Jewellery Care & Cleaning
                </a>
              </li>
              <li>
                <a href="#styled-by-you" className="hover:text-gold transition-colors">
                  Real Brides Video Wall
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-gold transition-colors">
                  Pan-India Shipping Policy
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-gold transition-colors">
                  COD Verification Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bridal VIP Club (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-light font-sans">
              The Tanvi VIP Circle
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-light">
              Receive secret drop alerts, styling guides, and festive pre-booking privileges directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald/20 border border-emerald/40 rounded-lg text-xs text-ivory flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Welcome to the VIP Circle! ✨</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-3 pr-10 py-2.5 rounded-lg bg-charcoal-700 border border-white/20 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-gold hover:bg-gold-light text-charcoal rounded-md transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-ivory/40">
                  Zero spam. Only royal adornment updates.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Trust Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-gold" />
              <span>Pan-India Free Express</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>COD & Phone Verification</span>
            </span>
            <span>•</span>
            <span>100% Hypoallergenic</span>
          </div>

          <div className="text-center sm:text-right text-[11px] font-light">
            © {new Date().getFullYear()} <strong className="text-ivory font-medium">gehnaboxbytanvi</strong>. All rights reserved.
            <span className="block text-[10px] text-ivory/40 mt-0.5">
              Imitation Jewellery • Made to Embellish
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
