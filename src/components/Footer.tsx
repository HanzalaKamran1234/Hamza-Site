"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#FAF9F6] border-t border-neutral-200/60 pt-16 lg:pt-24 pb-8 px-6 lg:px-12 text-[#111111] mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Editorial Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-200/50">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide font-light text-[#111111] uppercase">
              Become a Part of Our Story
            </h3>
            <p className="text-xs text-neutral-500 max-w-md tracking-wider leading-relaxed font-light">
              Subscribe to receive private invitations to campaign launches, digital lookbooks, and exclusive pre-orders.
            </p>
          </div>
          
          <div className="lg:col-span-6 flex items-center">
            <form onSubmit={handleSubscribe} className="w-full relative flex items-center border-b border-neutral-300 pb-2">
              <Mail className="text-neutral-400 mr-3 flex-shrink-0" size={16} strokeWidth={1.5} />
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-[11px] tracking-widest uppercase border-none outline-none pr-10 placeholder-neutral-400"
                required
              />
              <button
                type="submit"
                className="absolute right-0 p-1 hover:text-luxury-gold transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <span className="text-[10px] text-green-700 font-medium tracking-widest">SUBSCRIBED</span>
                ) : (
                  <ArrowRight size={16} strokeWidth={1.5} />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-[11px] font-medium tracking-[0.2em] uppercase">
          
          {/* Column 1: Collections */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-luxury-gold-dark font-semibold tracking-[0.25em]">Collections</h4>
            <div className="flex flex-col space-y-3 font-light text-neutral-500">
              <Link href="/shop?category=pret" className="hover:text-luxury-gold transition-colors">
                Luxury Pret
              </Link>
              <Link href="/shop?category=festive" className="hover:text-luxury-gold transition-colors">
                Festive Couture
              </Link>
              <Link href="/shop?category=coords" className="hover:text-luxury-gold transition-colors">
                Co-Ord Sets
              </Link>
              <Link href="/shop?category=unstitched" className="hover:text-luxury-gold transition-colors">
                Unstitched Fabrics
              </Link>
            </div>
          </div>

          {/* Column 2: Our Brand */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-luxury-gold-dark font-semibold tracking-[0.25em]">Our Brand</h4>
            <div className="flex flex-col space-y-3 font-light text-neutral-500">
              <Link href="/about" className="hover:text-luxury-gold transition-colors">
                Heritage & Story
              </Link>
              <Link href="/about#crafts" className="hover:text-luxury-gold transition-colors">
                The Artisans
              </Link>
              <Link href="/about#sustainability" className="hover:text-luxury-gold transition-colors">
                Modesty & Ethics
              </Link>
              <Link href="/about#journal" className="hover:text-luxury-gold transition-colors">
                The Journal
              </Link>
            </div>
          </div>

          {/* Column 3: Customer Care */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-luxury-gold-dark font-semibold tracking-[0.25em]">Customer Care</h4>
            <div className="flex flex-col space-y-3 font-light text-neutral-500">
              <Link href="/order-tracking" className="hover:text-luxury-gold transition-colors">
                Track Your Order
              </Link>
              <Link href="/about#faq" className="hover:text-luxury-gold transition-colors">
                Shipping & Returns
              </Link>
              <Link href="/about#faq" className="hover:text-luxury-gold transition-colors">
                Size Guidelines
              </Link>
              <Link href="/about#contact" className="hover:text-luxury-gold transition-colors">
                Contact Assistance
              </Link>
            </div>
          </div>

          {/* Column 4: Experience */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-luxury-gold-dark font-semibold tracking-[0.25em]">Bespoke Care</h4>
            <div className="flex flex-col space-y-3 font-light text-neutral-500">
              <p className="text-[10px] tracking-wide text-neutral-400 capitalize normal-case leading-relaxed font-light">
                ZARIYAH products are packaged in custom linen envelopes and rigid storage boxes, designed to preserve the heritage embroidery for generations.
              </p>
              <span className="text-[9px] text-[#111111] font-medium mt-2">
                ASSISTANCE: CARE@ZARIYAH.COM
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Payments */}
        <div className="pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 tracking-widest uppercase">
          <div>
            <p className="font-light text-center md:text-left">
              © 2026 ZARIYAH Luxury Pret. Crafted with honor and tradition.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>COD</span>
            <span className="text-neutral-300">|</span>
            <span>Bank Transfer</span>
            <span className="text-neutral-300">|</span>
            <span>Visa & MC</span>
            <span className="text-neutral-300">|</span>
            <span>AMEX</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
