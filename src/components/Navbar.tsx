"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Search,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_DISPLAY_PHONE, BRAND_PHONE } from "@/lib/utils";

export function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bridal Sets", href: "#catalog" },
    { label: "Bangles & Kadas", href: "#catalog" },
    { label: "Anti-Tarnish Daily", href: "#catalog" },
    { label: "Styled By You", href: "#styled-by-you" },
    { label: "Trousseau Gifting", href: "#trousseau" },
    { label: "Why Tanvi", href: "#trust" },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-emerald text-ivory text-xs font-medium py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2 text-ivory/80 text-[11px] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Handcrafted in India • 24K Micro Gold Plating</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center space-x-2 text-center text-xs tracking-wide">
            <Truck className="w-3.5 h-3.5 text-gold hidden xs:inline" />
            <span className="font-serif italic font-normal tracking-wide text-sm text-gold-light">
              Made to Embellish
            </span>
            <span className="text-ivory/50">•</span>
            <span>Pan-India Express Delivery</span>
            <span className="text-ivory/50">•</span>
            <span className="text-gold-light font-medium">COD Available</span>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-[11px] tracking-wider">
            <a
              href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                "Namaste Tanvi! I would like bridal styling consultation for an upcoming event."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-ivory/90 hover:text-gold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>WhatsApp Concierge: {BRAND_DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/90 backdrop-blur-md shadow-luxury border-b border-ivory-border"
            : "bg-ivory/95 border-b border-ivory-border/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Trigger + Search Trigger */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-charcoal hover:text-emerald rounded-md transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Left Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal/80 hover:text-emerald transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Center Brand Identity */}
            <div className="text-center flex-1 lg:flex-none">
              <Link href="/" className="inline-block group">
                <span className="block font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-[0.18em] font-normal uppercase text-charcoal group-hover:text-emerald transition-colors">
                  gehnabox<span className="text-gold font-light">by</span>tanvi
                </span>
                <span className="block text-[9px] uppercase tracking-[0.35em] text-charcoal/60 mt-0.5 font-sans">
                  Imitation Jewellery • Made to Embellish
                </span>
              </Link>
            </div>

            {/* Right Desktop Nav Links + Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <nav className="hidden xl:flex items-center space-x-6">
                {navLinks.slice(3).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal/80 hover:text-emerald transition-colors relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>

              {/* Desktop Search Bar */}
              <div className="hidden lg:flex items-center relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search kundan, hoops, bangles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 xl:w-56 pl-9 pr-4 py-1.5 text-xs bg-ivory-300/60 border border-ivory-border focus:border-gold focus:outline-none rounded-full transition-all focus:w-64 text-charcoal placeholder:text-charcoal/40"
                  />
                  <Search className="w-3.5 h-3.5 text-charcoal/50 absolute left-3 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2 text-[10px] text-charcoal/50 hover:text-charcoal"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-charcoal hover:text-emerald transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                  "Namaste Tanvi! I would like to inquire about your jewellery collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-emerald bg-emerald/10 hover:bg-emerald hover:text-ivory border border-emerald/20 rounded-full transition-all"
                title="Direct WhatsApp Inquiry"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] tracking-wide">Inquire</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-emerald transition-colors flex items-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartCount > 0 ? (
                  <span className="absolute top-1 right-1 bg-emerald text-ivory text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpen && (
          <div className="lg:hidden px-4 pb-3 border-t border-ivory-border bg-ivory-100 animate-fade-in">
            <div className="relative pt-2">
              <input
                type="text"
                placeholder="Search jewellery (e.g. Kundan, Mathapatti, Kada)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-ivory-border focus:border-gold focus:outline-none rounded-lg text-charcoal"
              />
              <Search className="w-4 h-4 text-charcoal/50 absolute left-3 top-4" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3.5 text-xs text-charcoal/50"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-ivory-border bg-ivory shadow-xl animate-fade-in">
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-ivory-border/60">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-wider font-medium text-charcoal hover:text-gold py-1.5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-2 flex flex-col space-y-3">
                <a
                  href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                    "Namaste Tanvi! I am looking for jewellery recommendations."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald text-ivory text-xs uppercase tracking-widest font-medium rounded-lg flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>Chat With Stylist Tanvi</span>
                </a>
                <p className="text-center text-[10px] text-charcoal/60 uppercase tracking-widest">
                  Pan-India Delivery • Free Shipping on Prepaid Orders
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
