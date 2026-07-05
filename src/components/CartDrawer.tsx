"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    currency,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  // Subtotal format
  const formatPrice = (amount: number) => {
    return currency === "PKR"
      ? `PKR ${amount.toLocaleString()}`
      : `USD $${amount.toFixed(2)}`;
  };

  // Free shipping threshold
  const freeShippingThreshold = currency === "PKR" ? 35000 : 150;
  const progressPercent = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#111111]/30 backdrop-blur-[2px]"
          />

          {/* Drawer Container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[420px] bg-background h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-neutral-700" />
                <h3 className="font-serif text-lg tracking-wider text-[#111111] uppercase">
                  Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:text-luxury-gold transition-colors text-neutral-500"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-luxury-sand/30 border-b border-neutral-100 space-y-2">
                <p className="text-[10px] tracking-wider uppercase font-medium text-[#111111]">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Add <span className="font-semibold text-luxury-gold-dark">{formatPrice(remainingForFreeShipping)}</span> more for Free Shipping
                    </>
                  ) : (
                    <span className="text-emerald-700 font-semibold">Your order qualifies for Free Shipping!</span>
                  )}
                </p>
                <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="bg-luxury-gold h-full transition-all duration-500 ease-out"
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif text-base text-neutral-400 italic font-light">
                    Your shopping bag is empty.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="border border-[#111111] text-[10px] tracking-[0.25em] font-medium uppercase px-6 py-3 hover:bg-[#111111] hover:text-background transition-colors duration-300"
                  >
                    Explore Collections
                  </Link>
                </div>
              ) : (
                cart.map((item) => {
                  const price = currency === "PKR" ? item.product.pricePKR : item.product.priceUSD;
                  return (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4 pb-6 border-b border-neutral-100 last:border-b-0"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/shop/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 bg-neutral-50 relative flex-shrink-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </Link>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/shop/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-sm text-[#111111] hover:text-luxury-gold transition-colors line-clamp-2 pr-2"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                              className="text-neutral-400 hover:text-luxury-crimson transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-x-3 text-[10px] tracking-wider text-neutral-400 mt-1 uppercase">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-neutral-200 rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                              }
                              className="p-1.5 text-neutral-500 hover:text-foreground transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-neutral-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                              }
                              className="p-1.5 text-neutral-500 hover:text-foreground transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-neutral-800">
                            {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-[#FAF9F6] space-y-4">
                <div className="flex justify-between text-[11px] font-medium tracking-widest uppercase">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-[#111111] font-semibold text-sm">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-[9px] text-neutral-400 tracking-wider uppercase font-light">
                  Taxes & Shipping calculated at checkout. Custom duties may apply for international shipping.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-[#111111] text-background text-[10px] tracking-[0.25em] font-medium uppercase py-4 rounded-sm hover:bg-luxury-gold-dark text-center transition-colors duration-300 shadow-sm"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-[10px] tracking-[0.25em] font-medium uppercase py-2 text-neutral-500 hover:text-foreground transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
