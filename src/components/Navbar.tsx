"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cart, wishlist, currency, setCurrency, setIsCartOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Track scroll position for glassmorphism transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Search filter
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.collectionLabel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        {/* Announcement Bar */}
        <div className="bg-[#111111] text-[#FAF9F6] text-[10px] tracking-[0.2em] uppercase py-2 text-center font-light px-4 transition-all duration-300">
          Complimentary Worldwide Shipping on Orders Over $150 / PKR 35,000
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full py-4 lg:py-6 px-6 lg:px-12 flex items-center justify-between border-b transition-all duration-500 ${
            isScrolled
              ? "luxury-glass py-3 lg:py-4 border-neutral-200/50 shadow-sm"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1 text-foreground hover:opacity-75 transition-opacity"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Left Navigation: Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.2em] uppercase">
            <div className="group relative">
              <Link
                href="/shop"
                className="hover:text-luxury-gold transition-colors pb-2 flex items-center gap-1"
              >
                Collections <ChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              {/* Mega Menu */}
              <div className="absolute top-[28px] left-0 w-[240px] bg-background border border-neutral-200/50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-5 flex flex-col space-y-4">
                <Link href="/shop" className="hover:text-luxury-gold transition-colors text-[10px]">
                  All Outfits
                </Link>
                <Link href="/shop?category=pret" className="hover:text-luxury-gold transition-colors text-[10px]">
                  Luxury Pret
                </Link>
                <Link href="/shop?category=festive" className="hover:text-luxury-gold transition-colors text-[10px]">
                  Festive Couture
                </Link>
                <Link href="/shop?category=coords" className="hover:text-luxury-gold transition-colors text-[10px]">
                  Co-Ord Sets
                </Link>
                <Link href="/shop?category=unstitched" className="hover:text-luxury-gold transition-colors text-[10px]">
                  Unstitched Fabrics
                </Link>
              </div>
            </div>

            <Link href="/about" className="hover:text-luxury-gold transition-colors">
              Our Craft
            </Link>
            <Link href="/order-tracking" className="hover:text-luxury-gold transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Brand Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif text-2xl lg:text-3xl tracking-[0.25em] font-light uppercase text-[#111111]">
                ZARIYAH
              </span>
              <span className="text-[7px] tracking-[0.5em] uppercase font-light text-luxury-gold mt-1">
                Luxury Pret
              </span>
            </Link>
          </div>

          {/* Right Navigation: Search, Wishlist, Cart, Currency */}
          <div className="flex items-center space-x-4 lg:space-x-6 text-[#111111]">
            {/* Currency Selector (Desktop) */}
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-medium tracking-widest border border-neutral-200/60 px-2.5 py-1 rounded-sm">
              <button
                onClick={() => setCurrency("PKR")}
                className={`transition-colors ${
                  currency === "PKR" ? "text-luxury-gold-dark font-semibold" : "text-neutral-400"
                }`}
              >
                PKR
              </button>
              <span className="text-neutral-300">|</span>
              <button
                onClick={() => setCurrency("USD")}
                className={`transition-colors ${
                  currency === "USD" ? "text-luxury-gold-dark font-semibold" : "text-neutral-400"
                }`}
              >
                USD
              </button>
            </div>

            {/* Actions */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-luxury-gold transition-colors"
              aria-label="Search products"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <Link
              href="/wishlist"
              className="p-1 hover:text-luxury-gold transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-background text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:text-luxury-gold transition-colors relative"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-[#FCFBF7] text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col p-6 lg:p-12"
          >
            <div className="w-full flex justify-end">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:text-luxury-gold transition-colors"
                aria-label="Close search"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-w-3xl w-full mx-auto mt-12 lg:mt-24 flex-1 flex flex-col">
              <form onSubmit={handleSearchSubmit} className="relative w-full border-b border-neutral-300 pb-3 flex items-center">
                <input
                  type="text"
                  placeholder="SEARCH FOR SILK PRET, CO-ORDS, FESTIVE COUTURE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl lg:text-3xl font-serif tracking-wider uppercase border-none outline-none pr-10 placeholder-neutral-400"
                  autoFocus
                />
                <button type="submit" aria-label="Search submit">
                  <Search size={24} strokeWidth={1.5} className="text-neutral-500" />
                </button>
              </form>

              {/* Suggestions */}
              <div className="mt-8 flex flex-wrap gap-2 text-[10px] tracking-widest uppercase">
                <span className="text-neutral-400 mr-2 py-1">Trending:</span>
                {["Silk Pret", "Co-Ords", "Festive", "Unstitched"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      router.push(`/shop?category=${tag.toLowerCase().replace(" ", "")}`);
                      setIsSearchOpen(false);
                    }}
                    className="border border-neutral-200 hover:border-[#111111] px-3 py-1 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Results Preview */}
              {searchQuery.trim() && (
                <div className="mt-12 flex-1 overflow-y-auto max-h-[400px] space-y-6 pr-2">
                  <p className="text-[10px] tracking-widest text-neutral-400 uppercase">
                    Products ({filteredProducts.length})
                  </p>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 group p-2 hover:bg-luxury-sand/50 transition-colors"
                        >
                          <div className="w-16 h-20 relative bg-neutral-100 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm text-[#111111] group-hover:text-luxury-gold transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-[10px] tracking-wider text-neutral-400 mt-1">
                              {product.collectionLabel}
                            </p>
                            <p className="text-xs font-medium text-neutral-600 mt-1">
                              {currency === "PKR"
                                ? `PKR ${product.pricePKR.toLocaleString()}`
                                : `USD $${product.priceUSD}`}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic font-light text-neutral-400">
                      No collections found matching &quot;{searchQuery}&quot;.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#111111]/30 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-background p-6 flex flex-col shadow-2xl justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                  <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#111111]">
                    ZARIYAH
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:text-luxury-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="mt-8 flex flex-col space-y-6 text-[12px] font-medium tracking-[0.2em] uppercase">
                  <div className="flex flex-col space-y-4">
                    <span className="text-[10px] text-neutral-400 tracking-wider">Collections</span>
                    <Link
                      href="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-luxury-gold pl-2 border-l border-neutral-100"
                    >
                      All Outfits
                    </Link>
                    <Link
                      href="/shop?category=pret"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-luxury-gold pl-2 border-l border-neutral-100"
                    >
                      Luxury Pret
                    </Link>
                    <Link
                      href="/shop?category=festive"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-luxury-gold pl-2 border-l border-neutral-100"
                    >
                      Festive Couture
                    </Link>
                    <Link
                      href="/shop?category=coords"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-luxury-gold pl-2 border-l border-neutral-100"
                    >
                      Co-Ord Sets
                    </Link>
                    <Link
                      href="/shop?category=unstitched"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-luxury-gold pl-2 border-l border-neutral-100"
                    >
                      Unstitched Fabrics
                    </Link>
                  </div>

                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-luxury-gold pt-2 border-t border-neutral-100/60"
                  >
                    Our Craft
                  </Link>
                  <Link
                    href="/order-tracking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-luxury-gold"
                  >
                    Track Order
                  </Link>
                </nav>
              </div>

              {/* Currency & Info in Footer of Menu */}
              <div className="pt-6 border-t border-neutral-100 space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-medium tracking-widest border border-neutral-200 px-3 py-1.5 rounded-sm w-fit">
                  <button
                    onClick={() => setCurrency("PKR")}
                    className={`transition-colors ${
                      currency === "PKR" ? "text-luxury-gold-dark font-semibold" : "text-neutral-400"
                    }`}
                  >
                    PKR
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`transition-colors ${
                      currency === "USD" ? "text-luxury-gold-dark font-semibold" : "text-neutral-400"
                    }`}
                  >
                    USD
                  </button>
                </div>
                <p className="text-[9px] text-neutral-400 tracking-wider uppercase font-light">
                  © 2026 ZARIYAH Luxury. All rights reserved.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
