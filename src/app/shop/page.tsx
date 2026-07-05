"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid2X2, Grid3X3, X } from "lucide-react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const { currency } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [sortBy, setSortBy] = useState<string>("default");

  // Layout View State (2 columns vs 4 columns)
  const [gridCols, setGridCols] = useState<number>(3); // Default to 3, toggle between 2 and 4

  // Mobile Filters Drawer
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync filters from URL search params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }

    if (searchParam) {
      // If there is a direct search text, we can handle it via category or keep category as 'all'
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Handle category change
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Unique Colors and Sizes list for filters
  const colorsList = ["Ivory White", "Champagne Gold", "Crimson Red", "Emerald Green", "Sage Green", "Sand Beige", "Antique Gold", "Jade Green", "Dusty Rose"];
  const sizesList = ["XS", "S", "M", "L", "XL", "Unstitched"];

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Filter
    const searchVal = searchParams.get("search") || "";
    if (
      searchVal &&
      !product.name.toLowerCase().includes(searchVal.toLowerCase()) &&
      !product.collectionLabel.toLowerCase().includes(searchVal.toLowerCase())
    ) {
      return false;
    }

    // 2. Category Filter
    if (selectedCategory !== "all" && product.collection !== selectedCategory) {
      return false;
    }

    // 3. Size Filter
    if (selectedSize !== "all" && !product.sizes.includes(selectedSize)) {
      return false;
    }

    // 4. Color Filter
    if (selectedColor !== "all" && !product.colors.some((c) => c.name === selectedColor)) {
      return false;
    }

    // 5. Price Filter (Currency-sensitive)
    const price = currency === "PKR" ? product.pricePKR : product.priceUSD;
    const activeMaxPrice = currency === "PKR" ? maxPrice : maxPrice / 220; // Scale down for USD
    if (price > activeMaxPrice) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = currency === "PKR" ? a.pricePKR : a.priceUSD;
    const priceB = currency === "PKR" ? b.pricePKR : b.priceUSD;

    if (sortBy === "price-low") {
      return priceA - priceB;
    }
    if (sortBy === "price-high") {
      return priceB - priceA;
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0; // default (no sort)
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setMaxPrice(60000);
    setSortBy("default");
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide text-[#111111]">
          {selectedCategory === "all" ? "The Atelier" : `${selectedCategory} Collection`}
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light">
          Showing {sortedProducts.length} unique garments
        </p>
      </div>

      {/* Filter and View Toggles */}
      <div className="border-t border-b border-neutral-200/60 py-4 mb-8 flex items-center justify-between flex-wrap gap-4 text-[10px] tracking-widest font-semibold uppercase text-[#111111]">
        {/* Left: Filter Toggle Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center space-x-2 border border-neutral-200 px-4 py-2 hover:border-[#111111] transition-colors"
          >
            <SlidersHorizontal size={12} strokeWidth={1.5} />
            <span>Filter & Sort</span>
          </button>
          
          {(selectedCategory !== "all" || selectedSize !== "all" || selectedColor !== "all" || maxPrice < 60000) && (
            <button
              onClick={clearFilters}
              className="text-neutral-400 hover:text-luxury-crimson transition-colors font-medium"
            >
              Clear All ({[selectedCategory !== "all", selectedSize !== "all", selectedColor !== "all"].filter(Boolean).length})
            </button>
          )}
        </div>

        {/* Center/Right: Category Quick Filters (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6 text-[9px] font-medium tracking-[0.2em]">
          {["all", "pret", "festive", "coords", "unstitched"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`transition-colors pb-1 border-b ${
                selectedCategory === cat
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-neutral-400 hover:text-[#111111]"
              }`}
            >
              {cat === "all" ? "ALL OUTFITS" : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right: Grid Layout Column Selector (Desktop) */}
        <div className="hidden md:flex items-center space-x-3 text-neutral-400">
          <button
            onClick={() => setGridCols(2)}
            className={`p-1 hover:text-[#111111] transition-colors ${
              gridCols === 2 ? "text-[#111111]" : ""
            }`}
            aria-label="2 Columns View"
          >
            <Grid2X2 size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setGridCols(3)}
            className={`p-1 hover:text-[#111111] transition-colors ${
              gridCols === 3 ? "text-[#111111]" : ""
            }`}
            aria-label="3 Columns View"
          >
            <Grid3X3 size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {sortedProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <p className="font-serif text-lg text-neutral-400 italic font-light">
            No items found matching the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="border border-[#111111] text-[10px] tracking-[0.25em] font-medium uppercase px-8 py-3.5 hover:bg-[#111111] hover:text-background transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-x-6 gap-y-12 transition-all duration-300 ${
            gridCols === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile/Desktop Filter Drawer Overlay */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-start">
          {/* Backdrop */}
          <div
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-[#111111]/30 backdrop-blur-sm"
          />

          {/* Sidebar Drawer */}
          <div className="relative w-full max-w-[340px] bg-background h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-serif text-lg tracking-wider text-[#111111] uppercase">Filters</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 hover:text-luxury-gold transition-colors text-neutral-500"
                aria-label="Close filters"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-8 text-[10px] tracking-widest font-semibold uppercase text-neutral-700 flex-1">
              
              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="text-[11px] text-neutral-900 font-bold border-b border-neutral-100 pb-1">Collection</h4>
                <div className="flex flex-col space-y-2.5">
                  {["all", "pret", "festive", "coords", "unstitched"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left font-light tracking-widest transition-colors ${
                        selectedCategory === cat ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                      }`}
                    >
                      {cat === "all" ? "All Collections" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes Filter */}
              <div className="space-y-3">
                <h4 className="text-[11px] text-neutral-900 font-bold border-b border-neutral-100 pb-1">Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSize("all")}
                    className={`border text-[9px] px-3 py-1.5 rounded-sm transition-colors ${
                      selectedSize === "all"
                        ? "bg-[#111111] text-background border-[#111111]"
                        : "border-neutral-200 text-neutral-500 hover:border-[#111111]"
                    }`}
                  >
                    ALL
                  </button>
                  {sizesList.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`border text-[9px] px-3 py-1.5 rounded-sm transition-colors ${
                        selectedSize === sz
                          ? "bg-[#111111] text-background border-[#111111]"
                          : "border-neutral-200 text-neutral-500 hover:border-[#111111]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Filter */}
              <div className="space-y-3">
                <h4 className="text-[11px] text-neutral-900 font-bold border-b border-neutral-100 pb-1">Colors</h4>
                <div className="flex flex-col space-y-2.5">
                  <button
                    onClick={() => setSelectedColor("all")}
                    className={`text-left font-light tracking-widest transition-colors ${
                      selectedColor === "all" ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    All Colors
                  </button>
                  {colorsList.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`text-left font-light tracking-widest transition-colors ${
                        selectedColor === col ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter (PKR scale) */}
              <div className="space-y-3">
                <h4 className="text-[11px] text-neutral-900 font-bold border-b border-neutral-100 pb-1">
                  Max Price ({currency === "PKR" ? `PKR ${maxPrice.toLocaleString()}` : `USD $${Math.round(maxPrice / 220)}`})
                </h4>
                <input
                  type="range"
                  min="15000"
                  max="60000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-neutral-400 tracking-wider">
                  <span>{currency === "PKR" ? "PKR 15,000" : "USD $68"}</span>
                  <span>{currency === "PKR" ? "PKR 60,000" : "USD $272"}</span>
                </div>
              </div>

              {/* Sorting Filter */}
              <div className="space-y-3">
                <h4 className="text-[11px] text-neutral-900 font-bold border-b border-neutral-100 pb-1">Sort By</h4>
                <div className="flex flex-col space-y-2.5">
                  <button
                    onClick={() => setSortBy("default")}
                    className={`text-left font-light tracking-widest transition-colors ${
                      sortBy === "default" ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => setSortBy("price-low")}
                    className={`text-left font-light tracking-widest transition-colors ${
                      sortBy === "price-low" ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortBy("price-high")}
                    className={`text-left font-light tracking-widest transition-colors ${
                      sortBy === "price-high" ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => setSortBy("name")}
                    className={`text-left font-light tracking-widest transition-colors ${
                      sortBy === "name" ? "text-luxury-gold-dark font-bold" : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    Alphabetical: A-Z
                  </button>
                </div>
              </div>

            </div>

            {/* Apply Button */}
            <div className="pt-6 mt-6 border-t border-neutral-100">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-[#111111] text-background text-[10px] tracking-[0.25em] font-medium uppercase py-3.5 rounded-sm hover:bg-luxury-gold-dark transition-colors duration-300"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center font-serif uppercase tracking-[0.2em] text-[10px] text-neutral-400 space-y-4">
          <div className="w-6 h-6 border border-neutral-300 border-t-[#C5A880] rounded-full animate-spin" />
          <span>Loading Collections...</span>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
