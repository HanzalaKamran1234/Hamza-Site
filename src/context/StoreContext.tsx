"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  currency: "PKR" | "USD";
  isCartOpen: boolean;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setCurrency: (currency: "PKR" | "USD") => void;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currency, setCurrencyState] = useState<"PKR" | "USD">("PKR");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load state from localStorage on client-side mount
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem("zariyah_cart");
    const storedWishlist = localStorage.getItem("zariyah_wishlist");
    const storedCurrency = localStorage.getItem("zariyah_currency");

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart storage:", e);
      }
    }
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist storage:", e);
      }
    }
    if (storedCurrency) {
      setCurrencyState(storedCurrency as "PKR" | "USD");
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("zariyah_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // Save wishlist changes to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("zariyah_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  // Save currency changes to localStorage
  const setCurrency = (newCurrency: "PKR" | "USD") => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("zariyah_currency", newCurrency);
    }
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, size, color, quantity }];
    });
    
    // Automatically slide open the shopping cart drawer for smooth UX feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart subtotal dynamically based on currency selection
  const cartTotal = cart.reduce((total, item) => {
    const price = currency === "PKR" ? item.product.pricePKR : item.product.priceUSD;
    return total + price * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        setCurrency,
        setIsCartOpen,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
