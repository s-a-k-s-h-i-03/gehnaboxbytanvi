"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  Truck,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { ProductVariant } from "@/types";

export function QuickViewModal() {
  const {
    activeQuickViewProduct,
    closeQuickView,
    addItem,
    orderProductDirectWhatsApp,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Sync initial variant when product changes
  React.useEffect(() => {
    if (activeQuickViewProduct && activeQuickViewProduct.variants.length > 0) {
      setSelectedVariant(activeQuickViewProduct.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setActiveImageIdx(0);
    setQuantity(1);
  }, [activeQuickViewProduct]);

  if (!activeQuickViewProduct) return null;

  const product = activeQuickViewProduct;
  const isFavorite = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  const handleAdd = () => {
    addItem(product, selectedVariant, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeQuickView();
    }, 1200);
  };

  const handleWhatsApp = () => {
    orderProductDirectWhatsApp(product, selectedVariant);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-ivory rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-ivory-border z-10 my-8">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-charcoal flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-ivory-100/60 border-b md:border-b-0 md:border-r border-ivory-border flex flex-col justify-between">
            {/* Main Stage */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-ivory-300 border border-ivory-border shadow-inner">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                fill
                className="object-cover transition-all duration-300"
              />

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md text-charcoal hover:text-red-500"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIdx === i
                        ? "border-emerald shadow-sm scale-105"
                        : "border-ivory-border hover:border-gold/60 opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Specs & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {/* Category & Stock Pill */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/60">
                  {product.category}
                </span>
                <span className="text-charcoal/40">•</span>
                {product.itemType === "READY_TO_SHIP" ? (
                  <span className="px-2 py-0.5 bg-emerald/15 text-emerald text-[10px] font-bold uppercase rounded-full">
                    ⚡ Ready to Ship (24h)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-gold/20 text-charcoal text-[10px] font-bold uppercase rounded-full">
                    ✨ Made to Order (~{product.leadTimeDays}d)
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-charcoal/70 italic">
                {product.tagline}
              </p>

              {/* Price & MRP */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-2xl font-serif font-bold text-charcoal">
                  {formatINR(product.price)}
                </span>
                <span className="text-sm text-charcoal/40 line-through">
                  {formatINR(product.mrp)}
                </span>
                <span className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-bold uppercase rounded">
                  {discountPercent}% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-charcoal/80 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 pb-1 border-t border-b border-ivory-border/70">
                <div>
                  <span className="text-charcoal/50 block">Base Material:</span>
                  <span className="font-medium text-charcoal">
                    {product.baseMaterial}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal/50 block">Plating Type:</span>
                  <span className="font-medium text-charcoal">
                    {product.platingType}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-charcoal/50 block">Stone Setting:</span>
                  <span className="font-medium text-charcoal">
                    {product.stoneType}
                  </span>
                </div>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-semibold uppercase text-charcoal mb-2">
                    Select Option / Size:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedVariant?.id === v.id
                            ? "bg-emerald text-ivory border-emerald shadow-sm"
                            : "bg-white text-charcoal border-ivory-border hover:bg-ivory-300"
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions & WhatsApp Direct */}
            <div className="space-y-3 pt-3">
              <div className="grid grid-cols-5 gap-3">
                <button
                  onClick={handleAdd}
                  className={`col-span-4 py-3 px-4 text-xs uppercase tracking-widest font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all shadow-luxury ${
                    justAdded
                      ? "bg-emerald text-ivory"
                      : "bg-emerald hover:bg-emerald-700 text-ivory"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-gold" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Add to Bag • {formatINR(product.price)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="col-span-1 py-3 bg-emerald/10 hover:bg-emerald hover:text-ivory text-emerald border border-emerald/20 rounded-lg flex items-center justify-center transition-all"
                  title="Direct WhatsApp Order"
                >
                  <MessageCircle className="w-5 h-5 text-emerald group-hover:text-gold" />
                </button>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-between text-[10px] text-charcoal/60 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                  <span>Hypoallergenic & Nickel Free</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Pan-India Free Express</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
