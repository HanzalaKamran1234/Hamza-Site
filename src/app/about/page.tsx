"use client";

import React, { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "What is your standard stitching and delivery timeline?",
      a: "Our ready-to-wear Luxury Pret items are stitched and dispatched within 3-5 business days. Unstitched fabrics are processed and shipped within 2 business days. Custom stitching orders take 12-15 business days as they are customized by our senior tailors."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. ZARIYAH ships worldwide including the United Kingdom, United States, Canada, Australia, and the Middle East. Standard transit times are 5-7 business days via DHL Express. Free international shipping applies on orders above USD $150."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer exchanges on all Pret items within 7 days of delivery, provided the garment is unworn, the security tags remain attached, and the original rigid linen storage box is intact. Unstitched fabrics and custom stitched items are non-exchangeable."
    },
    {
      q: "Can I request custom measurements or design edits?",
      a: "For our pret collections, we follow the standard size chart (XS through XL). For bridal couture and heavy festive ensembles, we accommodate custom sizing and minor color modifications. Please get in touch using the bespoke styling form below."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setSubmitted(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-background min-h-screen text-[#111111] overflow-hidden">
      
      {/* 1. BRAND STORY HEADER */}
      <section className="px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-4 mb-20">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
          The Atelier Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide leading-tight">
          ZARIYAH | A Heritage Story
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
          Quiet luxury engineered with traditional Pakistani craft
        </p>
      </section>

      {/* 2. STORY NARRATIVE */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
        {/* Left Story Content */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl lg:text-3xl uppercase font-light tracking-wide text-neutral-900 border-b border-neutral-100 pb-3">
            The Philosophy of Patience
          </h2>
          <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
            Founded in 2026, ZARIYAH was born out of a desire to create clothing that is timeless, modest, and incredibly refined. In an era of disposable fashion, we stand for slow luxury.
          </p>
          <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
            We partner with lineage-trained embroidery master craftsmen (*karigars*) in Lahore and Karachi to recreate historical stitches. By pairing these exquisite, heavy hand-embellishments with minimalist, clean silhouettes, we deliver modern pret that can compete on the global stage of quiet luxury.
          </p>
          <p className="text-xs text-[#111111] tracking-widest font-semibold uppercase italic">
            &ldquo;Every thread carries a legacy. We sew history with modern elegance.&rdquo;
          </p>
        </div>

        {/* Right Story Visual */}
        <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden bg-neutral-50 rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/craft_artisans.png"
            alt="Traditional Pakistani gold embroidery work details"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. ARTISAN FOCUS SECTION */}
      <section id="crafts" className="bg-[#FAF9F6] border-t border-b border-neutral-200/50 py-20 px-6 lg:px-12 mb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
            Empowering Artisans
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase font-light tracking-wide text-neutral-950">
            Artisan Dignity & Ethics
          </h2>
          <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
            We believe that luxury cannot exist at the expense of human dignity. All ZARIYAH karigars are provided safe, beautifully lit, air-conditioned workshops, fair wages that exceed standard local embroidery averages, and healthcare support for their families.
          </p>
          <p className="text-xs text-neutral-500 tracking-wider leading-relaxed font-light">
            By shopping with us, you are directly supporting the preservation of traditional craft arts like Zardozi, Aari, and Gota work, ensuring these skills are passed down to younger generations.
          </p>
        </div>
      </section>

      {/* 4. ATELIER FAQS ACCORDION */}
      <section id="faq" className="px-6 lg:px-12 max-w-3xl mx-auto mb-24 space-y-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
            Customer Guidance
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl uppercase font-light tracking-wide text-[#111111]">
            Atelier Guidelines
          </h2>
        </div>

        <div className="border-t border-neutral-200/60 divide-y divide-neutral-200/30">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left text-[11px] tracking-widest font-semibold uppercase text-neutral-800"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 text-xs text-neutral-500 font-light tracking-wider leading-relaxed normal-case"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BESPOKE INQUIRIES / CONTACT */}
      <section id="contact" className="px-6 lg:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Coordinates */}
        <div className="lg:col-span-5 space-y-6 text-[10px] tracking-widest font-semibold uppercase text-neutral-700">
          <h3 className="font-serif text-xl text-[#111111] uppercase pb-2 border-b border-neutral-100 font-light">
            Contact Coordinate
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed normal-case pr-4">
            Our concierge team is available to assist you with sizing guidelines, shipment tracking, custom wedding bookings, or order modifications.
          </p>
          
          <div className="space-y-4 pt-4 text-xs font-normal tracking-wide text-neutral-500 normal-case">
            <div className="flex items-center gap-3">
              <Mail className="text-luxury-gold-dark flex-shrink-0" size={16} strokeWidth={1.5} />
              <span>concierge@zariyah.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-luxury-gold-dark flex-shrink-0" size={16} strokeWidth={1.5} />
              <span>+92 21 3456789 (Mon-Sat, 9AM-6PM PKT)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-luxury-gold-dark flex-shrink-0" size={16} strokeWidth={1.5} />
              <span>Building 4C, Lane 5, Bukhari Commercial, Phase 6, DHA, Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Bespoke Form */}
        <div className="lg:col-span-7 bg-[#FAF9F6] border border-neutral-200/50 p-6 md:p-8 rounded-sm">
          <h3 className="font-serif text-lg text-[#111111] uppercase tracking-wider mb-6 font-light">
            Bespoke Styling Enquiry
          </h3>
          
          <form onSubmit={handleContactSubmit} className="space-y-6 text-[10px] tracking-widest font-semibold uppercase text-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-background outline-none rounded-sm font-normal normal-case"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-background outline-none rounded-sm font-normal normal-case"
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contact-message">Enquiry Details</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-background outline-none rounded-sm font-normal normal-case"
                placeholder="Describe your inquiry (stitching request, bridal pret custom sizing, bulk festive order)..."
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#111111] text-background hover:bg-luxury-gold-dark text-[10px] tracking-[0.25em] font-semibold uppercase py-3.5 rounded-sm flex items-center justify-center gap-2 transition-all duration-300"
              >
                {submitted ? (
                  <span className="text-emerald-700 font-bold">Enquiry Dispatched</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      
    </div>
  );
}
