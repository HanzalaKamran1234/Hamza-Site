"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { currency, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizes, setShowSizes] = useState(false);

  const favorite = isInWishlist(product.id);

  // Format active currency price
  const price = currency === "PKR"
    ? `PKR ${product.pricePKR.toLocaleString()}`
    : `USD $${product.priceUSD}`;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes[0] === "Unstitched") {
      addToCart(product, "Unstitched", product.colors[0].name);
    } else {
      setShowSizes(true);
    }
  };

  const handleSizeSelect = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, product.colors[0].name);
    setShowSizes(false);
  };

  return (
    <div
      className="group relative flex flex-col w-full bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-sand/30 rounded-sm mb-4">
        <Link href={`/shop/${product.id}`} className="block w-full h-full">
          {/* Main Image */}
          <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
          </div>

          {/* Hover Swapped Image */}
          {product.images[1] && (
            <div
              className={`absolute inset-0 transition-opacity duration-750 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[1]}
                alt={`${product.name} alternate`}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              />
            </div>
          )}
        </Link>

        {/* Best Seller / Trending Tag */}
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-luxury-gold text-background text-[8px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 shadow-sm">
            Bestseller
          </span>
        )}
        {!product.isBestSeller && product.isTrending && (
          <span className="absolute top-4 left-4 bg-[#111111] text-[#FAF9F6] text-[8px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 shadow-sm">
            Trending
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-full shadow-sm text-[#111111] hover:text-luxury-gold-dark transition-all duration-300 backdrop-blur-sm"
          aria-label="Add to wishlist"
        >
          <motion.div whileTap={{ scale: 1.3 }} transition={{ duration: 0.15 }}>
            <Heart
              size={15}
              strokeWidth={1.5}
              className={favorite ? "fill-luxury-gold-dark text-luxury-gold-dark" : ""}
            />
          </motion.div>
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 flex flex-col justify-end bg-gradient-to-t from-black/40 via-black/10 to-transparent">
          {showSizes ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background/95 backdrop-blur-md p-3 rounded-sm flex flex-col space-y-2"
            >
              <p className="text-[9px] tracking-widest text-neutral-400 text-center uppercase font-medium">
                Select Size
              </p>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeSelect(e, size)}
                    className="border border-neutral-200 hover:border-[#111111] hover:bg-[#111111] hover:text-background text-[9px] font-medium w-8 h-8 rounded-sm transition-all duration-200 flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <button
              onClick={handleQuickAddClick}
              className="w-full bg-background/95 hover:bg-[#111111] text-[#111111] hover:text-background text-[9px] tracking-[0.2em] font-medium uppercase py-3 rounded-sm flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm transition-all duration-300"
            >
              <ShoppingBag size={12} strokeWidth={1.5} />
              Quick Add
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow text-center px-2">
        <span className="text-[9px] tracking-[0.25em] text-luxury-gold-dark uppercase font-medium mb-1">
          {product.collectionLabel}
        </span>
        <h4 className="font-serif text-sm text-[#111111] leading-snug group-hover:text-luxury-gold-dark transition-colors line-clamp-1">
          <Link href={`/shop/${product.id}`}>{product.name}</Link>
        </h4>
        <p className="text-xs text-neutral-600 font-medium tracking-wide mt-1.5">
          {price}
        </p>
      </div>
    </div>
  );
}
