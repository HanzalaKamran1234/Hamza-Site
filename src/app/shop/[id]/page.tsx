"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, ChevronDown, Check, Ruler, RefreshCw, Truck } from "lucide-react";
import { products, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { currency, addToCart, toggleWishlist, isInWishlist } = useStore();

  // Find product
  const product = products.find((p) => p.id === id);

  // Component states
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("fabric");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sync state when product loads
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedColor(product.colors[0].name);
      if (product.sizes[0] === "Unstitched") {
        setSelectedSize("Unstitched");
      }
    }
  }, [product]);

  // Track scroll position to trigger sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const buyButton = document.getElementById("main-add-to-bag");
      if (buyButton) {
        const rect = buyButton.getBoundingClientRect();
        // If the main buy button is scrolled out of view, show sticky bar
        if (rect.bottom < 0) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center space-y-4 min-h-screen flex flex-col items-center justify-center">
        <p className="font-serif text-lg text-neutral-400 italic font-light">
          This piece cannot be found in the atelier.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="border border-[#111111] text-[10px] tracking-[0.25em] font-medium uppercase px-8 py-3.5 hover:bg-[#111111] hover:text-background transition-colors duration-300"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  // Price formatting
  const price = currency === "PKR"
    ? `PKR ${product.pricePKR.toLocaleString()}`
    : `USD $${product.priceUSD}`;

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to shopping bag.");
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  // Filter related products
  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3);

  // Toggle Accordion helper
  const toggleAccordion = (tab: string) => {
    setActiveAccordion(activeAccordion === tab ? null : tab);
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto bg-background min-h-screen">
      
      {/* Product Presentation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Images Layout (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails Sidebar */}
          <div className="flex md:flex-col gap-3 md:w-20 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-[3/4] md:w-20 w-16 bg-neutral-100 flex-shrink-0 border rounded-sm overflow-hidden ${
                  activeImage === img ? "border-[#111111]" : "border-neutral-200/50"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Visual Display (with hover scale) */}
          <div className="flex-1 aspect-[3/4] bg-luxury-sand/20 relative rounded-sm overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-zoom-in"
            />
          </div>
        </div>

        {/* Right: Buy Column (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          
          {/* Product Meta */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              {product.collectionLabel}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase font-light text-[#111111] leading-tight">
              {product.name}
            </h1>
            <p className="text-lg font-medium text-neutral-800 tracking-wide pt-1">
              {price}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
              Color: <span className="font-light text-neutral-500">{selectedColor}</span>
            </span>
            <div className="flex space-x-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.name ? "border-[#111111] scale-110" : "border-neutral-200"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check
                      size={12}
                      className={c.name === "Ivory White" ? "text-black" : "text-white"}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
                Size: <span className="font-light text-neutral-500">{selectedSize || "Select a Size"}</span>
              </span>
              
              {product.sizes[0] !== "Unstitched" && (
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] tracking-widest text-luxury-gold-dark hover:text-[#111111] transition-colors flex items-center gap-1 font-semibold uppercase"
                >
                  <Ruler size={12} />
                  <span>Size Chart</span>
                </button>
              )}
            </div>
            
            <div className="flex gap-2.5 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`border text-[10px] font-semibold w-12 h-12 rounded-sm transition-all flex items-center justify-center uppercase ${
                    selectedSize === sz
                      ? "border-[#111111] bg-[#111111] text-background"
                      : "border-neutral-200 text-neutral-500 hover:border-[#111111]"
                  } ${sz === "Unstitched" ? "w-28" : ""}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Main Cart Trigger */}
          <div className="flex gap-4 items-center">
            {/* Quantity */}
            <div className="flex items-center border border-neutral-200 rounded-sm py-2 px-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-neutral-500 hover:text-[#111111] transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-neutral-500 hover:text-[#111111] transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              id="main-add-to-bag"
              onClick={handleAddToBag}
              className="flex-1 bg-[#111111] text-background text-[10px] tracking-[0.25em] font-semibold uppercase py-4 rounded-sm hover:bg-luxury-gold-dark transition-colors duration-300 shadow-sm"
            >
              Add to Shopping Bag
            </button>

            {/* Favorite button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 border rounded-sm transition-colors ${
                isFavorite
                  ? "border-luxury-gold-dark text-luxury-gold-dark"
                  : "border-neutral-200 text-neutral-500 hover:border-[#111111] hover:text-[#111111]"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} strokeWidth={1.5} className={isFavorite ? "fill-luxury-gold-dark" : ""} />
            </button>
          </div>

          {/* Accordion Tabs for Craft, Fit, Care, Shipping */}
          <div className="border-t border-neutral-200/50 pt-6 space-y-4">
            
            {/* Fabric & Fit Accordion */}
            <div className="border-b border-neutral-200/30 pb-4">
              <button
                onClick={() => toggleAccordion("fabric")}
                className="w-full flex justify-between items-center text-left text-[10px] tracking-widest font-semibold uppercase text-neutral-800"
              >
                <span>Fabric & Silhouette Details</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeAccordion === "fabric" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeAccordion === "fabric" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 text-[11px] text-neutral-400 font-light tracking-wide leading-relaxed space-y-2"
                  >
                    <p><strong className="text-neutral-700">Composition:</strong> {product.fabric}</p>
                    <p><strong className="text-neutral-700">Details:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Embroidery Craftsmanship */}
            <div className="border-b border-neutral-200/30 pb-4">
              <button
                onClick={() => toggleAccordion("craft")}
                className="w-full flex justify-between items-center text-left text-[10px] tracking-widest font-semibold uppercase text-neutral-800"
              >
                <span>Artisanal Embroidery</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeAccordion === "craft" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeAccordion === "craft" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 text-[11px] text-neutral-400 font-light tracking-wide leading-relaxed"
                  >
                    <p>{product.embroidery}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Care Instructions */}
            <div className="border-b border-neutral-200/30 pb-4">
              <button
                onClick={() => toggleAccordion("care")}
                className="w-full flex justify-between items-center text-left text-[10px] tracking-widest font-semibold uppercase text-neutral-800"
              >
                <span>Garment Care</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeAccordion === "care" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeAccordion === "care" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 text-[11px] text-neutral-400 font-light tracking-wide leading-relaxed space-y-1"
                  >
                    {product.care.map((c, i) => (
                      <p key={i}>• {c}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping & Returns */}
            <div className="border-b border-neutral-200/30 pb-4">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex justify-between items-center text-left text-[10px] tracking-widest font-semibold uppercase text-neutral-800"
              >
                <span>Shipping & Heritage Returns</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeAccordion === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 text-[11px] text-neutral-400 font-light tracking-wide leading-relaxed space-y-2"
                  >
                    <p className="flex items-start gap-1.5"><Truck size={14} className="text-luxury-gold-dark mt-0.5 flex-shrink-0" />
                      <span>Complimentary shipping in Pakistan. Dispatch within 3-5 business days for Pret. Custom-stitched takes 15 business days.</span>
                    </p>
                    <p className="flex items-start gap-1.5"><RefreshCw size={14} className="text-luxury-gold-dark mt-0.5 flex-shrink-0" />
                      <span>Easy 7-day returns on unworn items. Garment tag and custom linen packaging box must be fully intact.</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>

      {/* Related Outfits Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-neutral-200/50 pt-16">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              Recommendations
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide uppercase font-light text-[#111111] mt-2">
              Complete the Aesthetic
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Drawer / Modal Popup */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-[#111111]/30 backdrop-blur-sm"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-background p-6 md:p-8 rounded-sm shadow-2xl z-10"
            >
              <h3 className="font-serif text-xl tracking-wider text-[#111111] uppercase mb-4 text-center">
                Atelier Measurements (Inches)
              </h3>
              <p className="text-[10px] text-neutral-400 tracking-wider leading-relaxed text-center uppercase mb-6 font-light">
                Please measure your chest and hips carefully to determine the perfect ZARIYAH pret size.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[10px] tracking-widest uppercase">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400">
                      <th className="py-2.5">Size</th>
                      <th className="py-2.5">Chest</th>
                      <th className="py-2.5">Waist</th>
                      <th className="py-2.5">Hips</th>
                      <th className="py-2.5">Shirt Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeChart.map((row) => (
                      <tr key={row.size} className="border-b border-neutral-100 last:border-0 hover:bg-luxury-sand/30 transition-colors">
                        <td className="py-3 font-semibold text-neutral-900">{row.size}</td>
                        <td className="py-3">{row.chest}</td>
                        <td className="py-3">{row.waist}</td>
                        <td className="py-3">{row.hip}</td>
                        <td className="py-3">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 border-t border-neutral-100 pt-6 flex justify-between items-center text-[9px] text-neutral-400 tracking-wider uppercase font-light">
                <span>All sizes follow standard designer pret dimensions.</span>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="border border-[#111111] text-[#111111] px-4 py-2 hover:bg-[#111111] hover:text-background transition-colors rounded-sm font-semibold"
                >
                  Close Chart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Purchase Bar (CRO) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-md border-t border-neutral-200 z-30 py-3.5 px-6 shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-10 h-12 object-cover rounded-sm border"
              />
              <div className="hidden sm:block">
                <h4 className="font-serif text-xs font-semibold text-neutral-800 line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-[9px] text-neutral-400 tracking-wider mt-0.5">
                  {price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Size Select Quick Dropdown */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-transparent border border-neutral-300 text-[10px] tracking-widest font-semibold uppercase px-2 py-2 rounded-sm focus:outline-none focus:border-[#111111]"
              >
                <option value="" disabled>SIZE</option>
                {product.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToBag}
                className="bg-[#111111] text-background text-[9px] tracking-[0.2em] font-semibold uppercase px-6 py-2.5 rounded-sm hover:bg-luxury-gold-dark transition-colors duration-300"
              >
                Add to Bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
