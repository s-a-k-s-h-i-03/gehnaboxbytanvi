"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";

export function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addItem,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = (productsData as Product[]).filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory shadow-2xl flex flex-col border-l border-ivory-border">
          {/* Header */}
          <div className="p-5 border-b border-ivory-border bg-ivory-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="font-serif text-xl text-charcoal font-medium">
                Saved Wishlist
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                {wishlist.length}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-ivory-border transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Heart className="w-12 h-12 text-charcoal/20 mx-auto" />
                <h3 className="font-serif text-xl text-charcoal">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-charcoal/60 max-w-xs mx-auto">
                  Click the heart icon on any piece to save your favorite bridal sets and daily chains here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-ivory-border/70">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="py-4 flex space-x-3.5">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-ivory-300 border border-ivory-border flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-medium text-charcoal line-clamp-1 pr-2">
                            {product.title}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-charcoal/40 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs font-serif font-bold text-charcoal mt-1">
                          {formatINR(product.price)}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            addItem(product);
                            toggleWishlist(product.id);
                          }}
                          className="w-full py-1.5 px-3 bg-emerald hover:bg-emerald-700 text-ivory text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center space-x-1.5 shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3 text-gold" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
