"use client";

import React, { useState } from "react";
import { Search, Loader2, PackageCheck, Scissors, ShieldCheck, Truck, ClipboardCheck } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setLoading(true);
    setSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      // Generate some dummy status details matching the order code
      setTrackingData({
        orderNumber: orderId.toUpperCase().startsWith("#") ? orderId.toUpperCase() : `#${orderId.toUpperCase()}`,
        datePlaced: "July 04, 2026",
        status: "artisan-embroidery", // Current stage
        stages: [
          {
            title: "Order Placed & Confirmed",
            desc: "Order received in the ZARIYAH system and queued for fabric sourcing.",
            date: "July 04, 2026 at 11:20 AM",
            completed: true,
            icon: ClipboardCheck
          },
          {
            title: "Fabric Sourcing & Laser-Cut",
            desc: "100% Pure Raw Silk selected, measured, and precision tailored panels cut.",
            date: "July 05, 2026 at 09:30 AM",
            completed: true,
            icon: PackageCheck
          },
          {
            title: "Artisan Hand-Embroidery",
            desc: "Active gold zari and mirror embellishments being woven by our karigars.",
            date: "Est. Completion: July 09, 2026",
            completed: false,
            active: true,
            icon: Scissors
          },
          {
            title: "Quality Assurance & Silk Packaging",
            desc: "Garment measurements verified against order specs, placed in custom rigid storage envelope.",
            date: "Pending",
            completed: false,
            icon: ShieldCheck
          },
          {
            title: "Dispatched via DHL / Local Logistics",
            desc: "Courier tracking code will be dispatched via SMS/Email.",
            date: "Pending",
            completed: false,
            icon: Truck
          }
        ]
      });
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-4xl mx-auto bg-background min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold-dark font-medium">
          Post-Purchase Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light uppercase tracking-wide text-[#111111]">
          Order Tracking Status
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
          Monitor the progression of your handcrafted luxury pret
        </p>
      </div>

      {/* Track Form */}
      <div className="bg-[#FAF9F6] border border-neutral-200/50 p-6 md:p-8 rounded-sm max-w-xl mx-auto mb-12">
        <form onSubmit={handleTrack} className="space-y-4 text-[10px] tracking-widest font-semibold uppercase text-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="order-id">Order ID</label>
              <input
                id="order-id"
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-background outline-none rounded-sm font-normal"
                placeholder="E.G. #Z-2026-9812"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-background outline-none rounded-sm font-normal normal-case"
                placeholder="EMAIL@DOMAIN.COM"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#111111] text-background hover:bg-luxury-gold-dark text-[10px] tracking-[0.25em] font-semibold uppercase py-3.5 rounded-sm flex items-center justify-center gap-2 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Locating Records...</span>
              </>
            ) : (
              <>
                <Search size={12} />
                <span>Track Progress</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Timeline */}
      {searched && !loading && trackingData && (
        <div className="border border-neutral-200/50 p-6 md:p-8 rounded-sm space-y-8 bg-background max-w-xl mx-auto shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4 flex-wrap gap-2 uppercase tracking-widest text-[10px] text-neutral-400">
            <span>Order: <strong className="text-neutral-800">{trackingData.orderNumber}</strong></span>
            <span>Date Placed: <strong className="text-neutral-800">{trackingData.datePlaced}</strong></span>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-8 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
            {trackingData.stages.map((stage: any, idx: number) => {
              const StageIcon = stage.icon;
              return (
                <div key={idx} className="relative space-y-1">
                  {/* Status Indicator Bullet */}
                  <span
                    className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-background z-10 transition-colors duration-300 ${
                      stage.completed
                        ? "border-[#111111] bg-[#111111]"
                        : stage.active
                        ? "border-luxury-gold bg-luxury-gold"
                        : "border-neutral-200"
                    }`}
                  >
                    {stage.completed && <span className="w-1.5 h-1.5 rounded-full bg-background" />}
                    {stage.active && <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />}
                  </span>

                  <div className="flex items-center gap-2">
                    <StageIcon size={14} className={stage.completed ? "text-neutral-800" : stage.active ? "text-luxury-gold-dark" : "text-neutral-300"} />
                    <h4
                      className={`text-[10px] tracking-widest uppercase font-bold ${
                        stage.completed
                          ? "text-neutral-800"
                          : stage.active
                          ? "text-luxury-gold-dark"
                          : "text-neutral-400"
                      }`}
                    >
                      {stage.title}
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-neutral-400 font-light tracking-wide leading-relaxed normal-case">
                    {stage.desc}
                  </p>
                  
                  <span className="text-[9px] tracking-wider text-neutral-400 block font-semibold">
                    {stage.date}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="border-t border-neutral-100 pt-6 text-center text-[9px] text-neutral-400 tracking-wider uppercase leading-relaxed font-light">
            <span>Stitching assistance: <strong>concierge@zariyah.com</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
