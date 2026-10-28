"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Eye,
  ShoppingBag,
  MessageCircle,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addItem,
    toggleWishlist,
    isInWishlist,
    orderProductDirectWhatsApp,
    openQuickView,
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  const hasAlternateImage = product.images.length > 1;
  const currentImage =
    isHovered && hasAlternateImage ? product.images[1] : product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    orderProductDirectWhatsApp(product);
  };

  return (
    <div
      className="group relative bg-white rounded-xl border border-ivory-border overflow-hidden shadow-sm hover:shadow-luxury-hover transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Box with Image Hover Flip */}
      <div
        className="relative aspect-square overflow-hidden bg-ivory-300 cursor-pointer"
        onClick={() => openQuickView(product)}
      >
        <Image
          src={currentImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {/* Stock Fulfillment Badge */}
          {product.itemType === "READY_TO_SHIP" ? (
            <span className="px-2.5 py-1 bg-emerald/90 backdrop-blur-md text-ivory text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-sm flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span>Ready to Ship</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md text-gold text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-sm flex items-center space-x-1">
              <Clock className="w-3 h-3 text-gold" />
              <span>Made to Order ({product.leadTimeDays}d)</span>
            </span>
          )}

          {/* Discount Pill */}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-bold uppercase rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Hover Quick Action Icons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md ${
              isFavorite
                ? "bg-red-50 text-red-600"
                : "bg-white/90 text-charcoal hover:text-emerald"
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 text-charcoal hover:text-gold flex items-center justify-center transition-colors shadow-md"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 bg-ivory/95 border border-gold/40 text-charcoal text-[9px] font-bold uppercase tracking-wider rounded flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              <span>Bestseller</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-charcoal/50 font-mono">
            {product.category}
          </div>

          <h3
            onClick={() => openQuickView(product)}
            className="font-serif text-base sm:text-lg text-charcoal font-medium hover:text-emerald cursor-pointer transition-colors line-clamp-1 mt-0.5"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-[11px] text-charcoal/60 line-clamp-1 mt-1 font-sans">
            {product.platingType} • {product.baseMaterial}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-ivory-border/60">
          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-serif font-bold text-charcoal">
              {formatINR(product.price)}
            </span>
            <span className="text-xs text-charcoal/40 line-through">
              {formatINR(product.mrp)}
            </span>
            <span className="text-[10px] text-emerald font-semibold uppercase">
              Save {formatINR(product.mrp - product.price)}
            </span>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-5 gap-2 mt-3 pt-1">
            {/* Primary: Add to Bag */}
            <button
              onClick={handleAddToCart}
              className={`col-span-4 py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                justAdded
                  ? "bg-emerald text-ivory"
                  : "bg-emerald hover:bg-emerald-700 text-ivory"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Order Icon Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="col-span-1 py-2.5 bg-emerald/10 hover:bg-emerald hover:text-ivory text-emerald border border-emerald/20 rounded-lg flex items-center justify-center transition-all"
              title="Order directly on WhatsApp"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald group-hover:text-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
