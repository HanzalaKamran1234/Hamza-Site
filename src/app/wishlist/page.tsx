"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide text-[#111111]">
          My Wishlist
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light">
          Your saved luxury pieces
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-24 text-center space-y-6">
          <p className="font-serif text-base text-neutral-400 italic font-light">
            Your wishlist is empty. Add items from the collections to save them.
          </p>
          <Link
            href="/shop"
            className="inline-block border border-[#111111] text-[10px] tracking-[0.25em] font-medium uppercase px-8 py-3.5 hover:bg-[#111111] hover:text-background transition-colors duration-300"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
