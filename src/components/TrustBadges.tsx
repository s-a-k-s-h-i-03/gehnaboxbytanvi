"use client";

import React from "react";
import { Sparkles, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { BRAND_PHONE } from "@/lib/utils";

export function TrustBadges() {
  const pillars = [
    {
      icon: Sparkles,
      title: "24K Antique Micro-Plating",
      desc: "Up to 3x thicker lacquer micro-coating. Crafted with pure brass/copper alloys for authentic heirloom gold glow without flaking.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Nickel • 100% Hypoallergenic",
      desc: "Lead-free and certified skin-safe. Wear heavy bridal chokers and festive jhumkas for 12+ hours with zero itching or discoloration.",
    },
    {
      icon: Clock,
      title: "Transparent Stock Paradigm",
      desc: "Mass-stocked pieces dispatch in 24 hours. Custom artisan Made-to-Order designs provide real-time karigari tracking and realistic lead times.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Karigari Concierge",
      desc: "Send your lehenga swatch or saree photo directly to Tanvi on WhatsApp (+91 98765 43210) for 1-on-1 jewellery pairing recommendations.",
    },
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 bg-ivory border-b border-ivory-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-ivory-border hover:border-gold/50 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald mb-5">
                    <Icon className="w-6 h-6 text-gold-dark" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
