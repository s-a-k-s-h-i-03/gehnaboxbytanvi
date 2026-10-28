"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductVariant, CartItem, ReelItem } from "@/types";
import { buildWhatsAppCartCheckoutUrl, buildWhatsAppProductUrl } from "@/lib/utils";

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isGiftWrap: boolean;
  setIsGiftWrap: (wrap: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  giftWrapFee: number;
  cartTotal: number;
  checkoutViaWhatsApp: () => void;
  orderProductDirectWhatsApp: (product: Product, variant?: ProductVariant) => void;
  activeQuickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  activeReel: ReelItem | null;
  openReelModal: (reel: ReelItem) => void;
  closeReelModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "gehnabox_cart_v1";
const WISHLIST_STORAGE_KEY = "gehnabox_wishlist_v1";
const GIFT_WRAP_FEE = 150;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isGiftWrap, setIsGiftWrap] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Hydrate from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch {
      // ignore JSON parse errors
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore quota errors
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, isMounted]);

  const addItem = (
    product: Product,
    variant?: ProductVariant,
    quantity: number = 1
  ) => {
    const selectedVariant = variant || (product.variants.length > 0 ? product.variants[0] : undefined);
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === selectedVariant?.id
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          selectedVariant,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant?.id === variantId
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    variantId: string | undefined,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant?.id === variantId
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const giftWrapFee = isGiftWrap ? GIFT_WRAP_FEE : 0;
  const cartTotal = cartSubtotal + giftWrapFee;

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) return;
    const url = buildWhatsAppCartCheckoutUrl(cart, isGiftWrap, giftMessage);
    window.open(url, "_blank");
  };

  const orderProductDirectWhatsApp = (
    product: Product,
    variant?: ProductVariant
  ) => {
    const activeVar = variant || (product.variants.length > 0 ? product.variants[0] : undefined);
    const url = buildWhatsAppProductUrl(product, activeVar);
    window.open(url, "_blank");
  };

  const openQuickView = (product: Product) => {
    setActiveQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setActiveQuickViewProduct(null);
  };

  const openReelModal = (reel: ReelItem) => {
    setActiveReel(reel);
  };

  const closeReelModal = () => {
    setActiveReel(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isGiftWrap,
        setIsGiftWrap,
        giftMessage,
        setGiftMessage,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        cartCount,
        cartSubtotal,
        giftWrapFee,
        cartTotal,
        checkoutViaWhatsApp,
        orderProductDirectWhatsApp,
        activeQuickViewProduct,
        openQuickView,
        closeQuickView,
        activeReel,
        openReelModal,
        closeReelModal,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
