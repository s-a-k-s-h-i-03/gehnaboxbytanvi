"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Sparkles, SlidersHorizontal, Zap, Clock, Database as DatabaseIcon } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";
import { getProducts } from "@/lib/services/products";

interface ProductCatalogProps {
  selectedCategoryFilter?: string;
  onSelectCategoryFilter?: (cat: string) => void;
}

export function ProductCatalog({
  selectedCategoryFilter = "All",
  onSelectCategoryFilter,
}: ProductCatalogProps) {
  const { searchQuery, setSearchQuery } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategoryFilter
  );
  const [activeStockType, setActiveStockType] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Dynamic products state with graceful fallback initialization
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);
  const [dataSource, setDataSource] = useState<"supabase" | "fallback">("fallback");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync internal category filter if parent changes it
  useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  // Fetch live data from Supabase on mount with graceful fallback
  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setIsLoading(true);
      try {
        const response = await getProducts();
        if (isMounted) {
          setProducts(response.products);
          setDataSource(response.source);
        }
      } catch (err) {
        console.warn("Catalog fetch notice, using fallback:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    "Kundan & Polki Bridal",
    "Bangles & Kadas",
    "Oxidised Silver & Tribal",
    "Brass & Copper Daily Wear",
    "Western Minimal",
    "Hair Accessories",
  ];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(cat);
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by Stock Model
    if (activeStockType !== "ALL") {
      list = list.filter((p) => p.itemType === activeStockType);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.baseMaterial.toLowerCase().includes(q) ||
          p.platingType.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, activeStockType, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/15 rounded-full text-gold-dark text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Curated Boutique Collection</span>
          </div>

          {/* Supabase Connection Status Pill */}
          <div
            className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
              dataSource === "supabase"
                ? "bg-emerald/10 border-emerald/30 text-emerald"
                : "bg-charcoal/5 border-charcoal/15 text-charcoal/70"
            }`}
            title={
              dataSource === "supabase"
                ? "Streaming live from Supabase PostgreSQL & Storage"
                : "Using bundled fallback JSON. Set .env.local to stream live from Supabase"
            }
          >
            <DatabaseIcon className="w-3 h-3 text-gold" />
            <span>
              {dataSource === "supabase"
                ? "⚡ Supabase Live DB"
                : "Fallback Mode (Supabase Ready)"}
            </span>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
          Adornments Handcrafted for You
        </h2>
        <p className="mt-3 text-sm sm:text-base text-charcoal/70">
          Filter by fulfillment speed: select ready-to-dispatch designs or customize artisan made-to-order heirlooms.
        </p>
      </div>

      {/* Control Bar: Categories Scroll + Stock Model Filter + Sort */}
      <div className="space-y-4 mb-8">
        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 uppercase tracking-wider ${
                activeCategory === cat
                  ? "bg-emerald text-ivory shadow-sm font-semibold"
                  : "bg-white text-charcoal/70 hover:text-charcoal hover:bg-ivory-300 border border-ivory-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Line: Stock Model Toggle + Sort Selector + Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-ivory-border/60">
          {/* Dual Stock Model Filter Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold mr-1 hidden sm:inline">
              Stock Model:
            </span>
            <button
              onClick={() => setActiveStockType("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStockType === "ALL"
                  ? "bg-charcoal text-ivory"
                  : "bg-white text-charcoal/70 hover:bg-ivory-200 border border-ivory-border"
              }`}
            >
              All Pieces ({products.length})
            </button>

            <button
              onClick={() => setActiveStockType("READY_TO_SHIP")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeStockType === "READY_TO_SHIP"
                  ? "bg-emerald text-ivory shadow-sm"
                  : "bg-white text-emerald hover:bg-emerald/10 border border-emerald/30"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-gold" />
              <span>Ready to Ship ⚡</span>
            </button>

            <button
              onClick={() => setActiveStockType("MADE_TO_ORDER")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeStockType === "MADE_TO_ORDER"
                  ? "bg-gold text-charcoal shadow-sm font-semibold"
                  : "bg-white text-charcoal/70 hover:bg-gold/15 border border-gold/40"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span>Made to Order ✨</span>
            </button>
          </div>

          {/* Sort Selector & Active Search Display */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {searchQuery && (
              <div className="text-xs text-charcoal/70 flex items-center space-x-1">
                <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gold-dark underline hover:text-charcoal ml-1"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-ivory-border text-xs rounded-lg px-3 py-1.5 text-charcoal focus:outline-none focus:border-gold"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-ivory-border p-8">
          <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
          <h3 className="font-serif text-2xl text-charcoal">No Adornments Found</h3>
          <p className="text-sm text-charcoal/60 max-w-md mx-auto mt-2">
            We couldn&apos;t find any pieces matching your current filters. Try selecting a different category or clearing search parameters.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setActiveStockType("ALL");
              setSearchQuery("");
            }}
            className="mt-6 px-6 py-2.5 bg-emerald text-ivory text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
