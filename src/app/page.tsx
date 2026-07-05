"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Heart, Play } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  // Grab the first 3 bestsellers to feature
  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 3);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="w-full bg-background overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center bg-[#E5DFD9]">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero_model_ivory.png"
            alt="ZARIYAH Ivory Collection Model"
            className="w-full h-full object-cover object-[center_20%] opacity-90 brightness-[0.93]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] lg:text-xs tracking-[0.4em] uppercase font-light text-luxury-gold mb-3"
          >
            Zariyah Luxury Pret 2026
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide font-light uppercase leading-[1.1] mb-6 drop-shadow-sm"
          >
            Heritage in Threads, <br />
            <span className="italic font-normal">Modern in Spirit.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[11px] sm:text-xs tracking-[0.2em] font-light max-w-md mb-8 uppercase text-neutral-200"
          >
            Hand-embroidered pure raw silk tunic collections crafted by traditional Pakistani artisans.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/shop"
              className="bg-[#FCFBF7] text-[#111111] hover:bg-luxury-gold hover:text-white transition-all duration-500 text-[10px] tracking-[0.25em] font-semibold uppercase px-8 py-4 shadow-lg rounded-sm"
            >
              Discover Collection
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-300 font-light">Scroll</span>
          <div className="w-[1px] h-10 bg-neutral-300/40 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute w-full h-1/2 bg-luxury-gold top-0 left-0"
            />
          </div>
        </div>
      </section>

      {/* 2. THE BRAND VISION / STATEMENT */}
      <section className="py-24 px-6 lg:px-12 max-w-4xl mx-auto text-center border-b border-neutral-200/50">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-snug uppercase text-[#111111]">
            Quiet Luxury, Rooted in Tradition
          </h2>
          <p className="font-serif text-neutral-500 text-base lg:text-lg italic leading-relaxed max-w-2xl mx-auto font-light">
            &ldquo;We design for the modern woman who values the fine balance between contemporary silhouettes and ancestral craftsmanship. Each collection is a quiet testament to patience, heritage, and luxurious wear.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* 3. CATEGORY SHOWCASE (ASYNCHRONOUS EDITORIAL GRID) */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
            Shop by Category
          </span>
          <h3 className="font-serif text-2xl lg:text-3xl tracking-wide uppercase font-light text-[#111111]">
            Curated Chapters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pret */}
          <Link href="/shop?category=pret" className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero_model_ivory.png"
              alt="Luxury Pret"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Luxury Pret</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase font-light text-neutral-300 flex items-center gap-1">
                Shop Ready-To-Wear <ArrowRight size={10} />
              </p>
            </div>
          </Link>

          {/* Festive */}
          <Link href="/shop?category=festive" className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm mt-0 md:mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/category_festive.png"
              alt="Festive Wear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Festive Couture</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase font-light text-neutral-300 flex items-center gap-1">
                Explore Weddings <ArrowRight size={10} />
              </p>
            </div>
          </Link>

          {/* Co-Ords */}
          <Link href="/shop?category=coords" className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/category_coords.png"
              alt="Co-Ord Sets"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Co-Ord Sets</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase font-light text-neutral-300 flex items-center gap-1">
                Minimalist Linens <ArrowRight size={10} />
              </p>
            </div>
          </Link>

          {/* Unstitched */}
          <Link href="/shop?category=unstitched" className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm mt-0 md:mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/craft_artisans.png"
              alt="Unstitched"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Unstitched Fabrics</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase font-light text-neutral-300 flex items-center gap-1">
                Custom Tailoring <ArrowRight size={10} />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. SHOP BY OCCASION GRID */}
      <section className="py-24 px-6 lg:px-12 bg-background border-t border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              Seasonal Styling
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide uppercase font-light text-[#111111]">
              Shop by Occasion
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#111111]">
            <Link href="/shop?category=festive" className="group flex flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/category_festive.png"
                  alt="Wedding Festive"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Festive Weddings</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Gota & Zari Embellishments</p>
            </Link>

            <Link href="/shop?category=pret" className="group flex flex-col items-center mt-0 md:mt-8">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero_model_ivory.png"
                  alt="Daily Luxury Pret"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Atelier Eid Pret</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Timeless Modest Silhouettes</p>
            </Link>

            <Link href="/shop?category=coords" className="group flex flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/category_coords.png"
                  alt="Casual Soirees"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-lg tracking-wider uppercase font-light">Minimalist Soirées</h4>
              <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Monochromatic Co-Ord Sets</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EDITOR'S PICKS / BESTSELLERS */}
      <section className="py-24 px-6 lg:px-12 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
                Summer Edit
              </span>
              <h3 className="font-serif text-3xl lg:text-4xl tracking-wide uppercase font-light text-[#111111]">
                Bestselling Silhouettes
              </h3>
            </div>
            <Link
              href="/shop"
              className="luxury-btn-underline text-xs tracking-widest font-semibold uppercase flex items-center gap-2 hover:text-luxury-gold transition-colors pb-1"
            >
              View All Collections <ArrowRight size={12} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP FOCUS */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative aspect-[4/5] w-full overflow-hidden bg-neutral-50 rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/craft_artisans.png"
              alt="Artisanal Hand embroidery"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              Preserving Heritage
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase leading-tight text-[#111111]">
              The Master Artisans <br />
              of Zari and Dabka
            </h3>
            <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
              Each ZARIYAH garment is a living piece of cultural art. Our artisans in Karachi and Lahore spend upwards of 48 hours intricately weaving gold metallic threads (Zari) and delicate metallic coils (Dabka) into pure raw silks.
            </p>
            <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
              By blending minimal Scandinavian layout lines with centuries-old needlework, we deliver a premium editorial garment that feels valuable, elegant, and deeply authentic.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="border border-[#111111] text-[10px] tracking-[0.25em] font-medium uppercase px-8 py-3.5 hover:bg-[#111111] hover:text-background transition-colors duration-500"
              >
                Our Artisans Spotlight
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIDEO CAMPAIGN FILM SECTION */}
      <section className="relative py-32 w-full flex items-center justify-center bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/category_festive.png"
            alt="Miras Film Backdrop"
            className="w-full h-full object-cover scale-105 blur-[3px] brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.4em] uppercase font-light text-luxury-gold">
            Campaign Film 2026
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide leading-tight">
            Miras: The Inherited Grace
          </h3>
          <p className="text-[11px] tracking-[0.2em] font-light max-w-lg uppercase text-neutral-300 leading-relaxed">
            Watch the cinematic campaign captured in the historic courtyards of Lahore, detailing the connection between lineage and handcraft.
          </p>
          <div className="pt-4">
            <button
              onClick={() => alert("Loading video campaign film: MIRAS 2026...")}
              className="border border-white text-white hover:bg-white hover:text-[#111111] text-[9px] tracking-[0.25em] font-medium uppercase px-8 py-3.5 transition-all duration-300 flex items-center gap-2 rounded-sm"
            >
              <Play size={10} fill="currentColor" />
              Play Campaign Film
            </button>
          </div>
        </div>
      </section>

      {/* 8. BRAND PROMISES / VALUE GRID */}
      <section className="bg-luxury-sand/30 border-t border-b border-neutral-200/50 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-3">
            <ShieldCheck size={24} strokeWidth={1.2} className="text-luxury-gold-dark" />
            <h4 className="font-serif text-base tracking-widest uppercase font-medium text-[#111111]">
              Uncompromising Quality
            </h4>
            <p className="text-[10px] text-neutral-500 tracking-wider leading-relaxed font-light max-w-xs">
              We exclusively use 100% pure raw silk and fine Irish linen. No polyester blends. No shortcut embroidery.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <ShoppingBag size={24} strokeWidth={1.2} className="text-luxury-gold-dark" />
            <h4 className="font-serif text-base tracking-widest uppercase font-medium text-[#111111]">
              Linen Storage Envelopes
            </h4>
            <p className="text-[10px] text-neutral-500 tracking-wider leading-relaxed font-light max-w-xs">
              Each garment arrives in a bespoke linen storage box, preserving handcrafted gold embellishments for generations.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <Star size={24} strokeWidth={1.2} className="text-luxury-gold-dark" />
            <h4 className="font-serif text-base tracking-widest uppercase font-medium text-[#111111]">
              Seamless Delivery & Return
            </h4>
            <p className="text-[10px] text-neutral-500 tracking-wider leading-relaxed font-light max-w-xs">
              Complimentary shipping in Pakistan. Cash on Delivery (COD) and 7-day hassle-free editorial returns.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER REVIEWS */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              Testimonials
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide uppercase font-light text-[#111111]">
              Voices of Elegance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 border border-neutral-200/50 rounded-sm bg-[#FAF9F6] flex flex-col justify-between h-[200px]">
              <p className="font-serif text-sm italic text-neutral-600 leading-relaxed font-light">
                &ldquo;The raw silk weight is incredible, and the gold zari detailing on the neckline feels extremely premium. It is rare to find such understated luxury in Pret wear. Highly recommended!&rdquo;
              </p>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#111111]">Zainab K.</span>
                <span className="text-[9px] tracking-wider text-neutral-400 block mt-0.5">Lahore, Pakistan</span>
              </div>
            </div>

            <div className="p-8 border border-neutral-200/50 rounded-sm bg-[#FAF9F6] flex flex-col justify-between h-[200px]">
              <p className="font-serif text-sm italic text-neutral-600 leading-relaxed font-light">
                &ldquo;Zariyah has quickly become my go-to for Eid and family occasions. Their customer service accommodated my currency settings for overseas shipping seamlessly. Unrivalled quality.&rdquo;
              </p>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#111111]">Mariam A.</span>
                <span className="text-[9px] tracking-wider text-neutral-400 block mt-0.5">London, UK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM MUSE GALLERY GRID */}
      <section className="py-24 border-t border-neutral-200/50 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
              Zariyah Muses
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide uppercase font-light text-[#111111]">
              Shared Grace on Instagram
            </h3>
            <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 font-light">
              Follow our coordinates at @ZariyahLuxury
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "/images/hero_model_ivory.png",
              "/images/category_festive.png",
              "/images/category_coords.png",
              "/images/craft_artisans.png",
              "/images/hero_model_ivory.png"
            ].map((imgSrc, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-neutral-100 rounded-sm shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`Instagram Post ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-white border-b border-white pb-0.5">
                    Shop The Look
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
