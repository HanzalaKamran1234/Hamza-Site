"use client";

import type { Metadata } from "next";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, CreditCard, Landmark, Truck, Gift } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, currency, cartTotal, clearCart } = useStore();
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [giftBox, setGiftBox] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Credit Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Order Success Modal state
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (cart.length === 0 && !isSuccessOpen) {
    return (
      <div className="pt-32 pb-24 px-6 text-center space-y-4 min-h-screen flex flex-col items-center justify-center">
        <p className="font-serif text-lg text-neutral-400 italic font-light">
          Your shopping bag is empty. Please add items before checking out.
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

  // Calculate pricing values
  const freeShippingThreshold = currency === "PKR" ? 35000 : 150;
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : currency === "PKR" ? 250 : 10;
  const grandTotal = cartTotal + shippingFee;

  const formatPrice = (amount: number) => {
    return currency === "PKR"
      ? `PKR ${amount.toLocaleString()}`
      : `USD $${amount.toFixed(2)}`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify fields
    if (!email || !firstName || !lastName || !phone || !address || !city) {
      alert("Please complete all shipping address fields.");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      alert("Please complete credit card details.");
      return;
    }

    // Generate simulated order number
    const generatedOrderNo = `Z-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNo);
    setIsSuccessOpen(true);

    // Run premium confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#C5A880", "#B8976C", "#111111", "#FCFBF7"],
    });

    // Clear shopping cart
    clearCart();
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-light uppercase tracking-wide text-[#111111]">
          Checkout Atelier
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light mt-1">
          Complete your luxury acquisition
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Form: Details & Address (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-8 text-[10px] tracking-widest font-semibold uppercase text-neutral-700">
            
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm text-[#111111] border-b border-neutral-100 pb-2">
                1. Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="EMAIL@DOMAIN.COM"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone">Phone Number (For Delivery Alerts)</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-sm text-[#111111] border-b border-neutral-100 pb-2">
                2. Shipping Coordinates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="FIRST NAME"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="LAST NAME"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="address">Address (House, Street, Area)</label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                  placeholder="STREET ADDRESS, APARTMENT UNIT"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="KARACHI / LAHORE / ISLAMABAD"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="postal-code">Postal Code (Optional)</label>
                  <input
                    id="postal-code"
                    type="text"
                    className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                    placeholder="75500"
                  />
                </div>
              </div>
            </div>

            {/* Packaging & Gift Options */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-sm text-[#111111] border-b border-neutral-100 pb-2">
                3. Premium Packaging
              </h3>
              <div className="border border-neutral-200 p-4 rounded-sm space-y-4 bg-luxury-sand/20">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="accent-luxury-gold mt-0.5"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-800 font-bold block">
                      Complimentary Gift Wrapping (Rigid Gold-foil Box)
                    </span>
                    <span className="text-[9px] text-neutral-400 block font-light leading-relaxed normal-case">
                      Garments will be packed in ZARIYAH&apos;s heritage rigid storage envelope with custom embossed tissue and silk ribbons.
                    </span>
                  </div>
                </label>
                
                {giftBox && (
                  <div className="flex flex-col space-y-2 pt-2">
                    <label htmlFor="gift-message">Hand-written Calligraphy Note Message</label>
                    <textarea
                      id="gift-message"
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal normal-case"
                      placeholder="Enter the message you want our calligrapher to write..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Payments */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-sm text-[#111111] border-b border-neutral-100 pb-2">
                4. Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`border p-4 rounded-sm flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#111111] bg-luxury-sand/35"
                      : "border-neutral-200 hover:border-[#111111]"
                  }`}
                >
                  <Truck size={18} strokeWidth={1.5} className="text-luxury-gold-dark" />
                  <span className="text-[9px]">Cash on Delivery</span>
                </button>

                {/* Bank Transfer Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`border p-4 rounded-sm flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                    paymentMethod === "bank"
                      ? "border-[#111111] bg-luxury-sand/35"
                      : "border-neutral-200 hover:border-[#111111]"
                  }`}
                >
                  <Landmark size={18} strokeWidth={1.5} className="text-luxury-gold-dark" />
                  <span className="text-[9px]">Bank Transfer</span>
                </button>

                {/* Credit Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`border p-4 rounded-sm flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-[#111111] bg-luxury-sand/35"
                      : "border-neutral-200 hover:border-[#111111]"
                  }`}
                >
                  <CreditCard size={18} strokeWidth={1.5} className="text-luxury-gold-dark" />
                  <span className="text-[9px]">Credit Card</span>
                </button>
              </div>

              {/* Payment Details Panel */}
              <div className="pt-2">
                {paymentMethod === "cod" && (
                  <p className="text-[9px] text-neutral-400 font-light leading-relaxed normal-case p-4 bg-luxury-sand/10 border border-neutral-100 rounded-sm">
                    <strong>Cash on Delivery (COD) Info:</strong> Pay with cash upon package receipt at your doorstep. Standard COD dispatch terms apply. Available across all cities in Pakistan.
                  </p>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-4 bg-luxury-sand/20 border border-neutral-100 rounded-sm text-[9px] font-normal leading-relaxed text-neutral-600 space-y-1">
                    <p className="font-semibold text-neutral-900">Direct Bank Transfer coordinates:</p>
                    <p>Bank Name: Bank Alfalah Limited (Islamic)</p>
                    <p>Account Title: ZARIYAH LUXURY PRET</p>
                    <p>Account Number: 1024-8895-100412</p>
                    <p>IBAN: PK42 ALFH 1024 8895 1004 1200</p>
                    <p className="italic text-neutral-400 mt-2 font-light normal-case">
                      * Kindly email a screenshot of your bank receipt transfer to care@zariyah.com along with order number to initiate stitching/shipping.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-4 border border-neutral-200 rounded-sm space-y-3 bg-[#FCFBF7]">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="card-number">Card Number</label>
                      <input
                        id="card-number"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                        placeholder="4000 1234 5678 9010"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="card-expiry">Expiry Date</label>
                        <input
                          id="card-expiry"
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="card-cvc">CVC</label>
                        <input
                          id="card-cvc"
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="border border-neutral-200 focus:border-[#111111] p-3 text-xs bg-transparent outline-none rounded-sm font-normal"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form submit button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#111111] text-background text-[10px] tracking-[0.25em] font-semibold uppercase py-4 rounded-sm hover:bg-luxury-gold-dark transition-colors duration-300 shadow-sm"
              >
                Place Luxury Order ({formatPrice(grandTotal)})
              </button>
            </div>

          </form>
        </div>

        {/* Right Summary Column: Items & Total (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-[#FAF9F6] border border-neutral-200/50 p-6 rounded-sm space-y-6 self-start">
          <h3 className="font-serif text-base text-[#111111] border-b border-neutral-200/50 pb-2 uppercase tracking-wider">
            Order Review
          </h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => {
              const priceVal = currency === "PKR" ? item.product.pricePKR : item.product.priceUSD;
              return (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 items-center">
                  <div className="w-12 h-16 bg-neutral-100 relative flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs text-neutral-800 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[9px] text-neutral-400 mt-0.5 tracking-wider uppercase font-light">
                      SIZE: {item.size} • COLOR: {item.color} • QTY: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-700">
                    {formatPrice(priceVal * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-neutral-200/60 pt-4 space-y-3 text-[10px] tracking-widest font-semibold uppercase text-neutral-500">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span className="text-neutral-800">{formatPrice(cartTotal)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Stitching & Delivery</span>
              <span className="text-neutral-800">
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>

            {giftBox && (
              <div className="flex justify-between items-center text-luxury-gold-dark font-medium gap-1.5">
                <div className="flex items-center gap-1">
                  <Gift size={12} />
                  <span>Calligraphy Gift Wrapping</span>
                </div>
                <span>Free</span>
              </div>
            )}

            <div className="border-t border-neutral-200/60 pt-4 flex justify-between text-neutral-800 font-bold text-sm tracking-widest">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Customer Trust Signals */}
          <div className="border-t border-neutral-200/50 pt-4 text-[8px] text-neutral-400 tracking-wider uppercase leading-relaxed font-light space-y-1.5">
            <p>✔ SSL Secure 256-bit encrypted checkout.</p>
            <p>✔ Tracked door-step delivery with local courier partners.</p>
            <p>✔ Understated luxury packaging with signature gift sleeve.</p>
          </div>
        </div>

      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isSuccessOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#111111]/40 backdrop-blur-md"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-lg bg-background p-8 rounded-sm shadow-2xl z-10 text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle2 size={48} strokeWidth={1.2} className="text-luxury-gold" />
              </div>
              
              <h2 className="font-serif text-2xl tracking-wide uppercase font-light text-[#111111]">
                Order Received with Honor
              </h2>

              <p className="text-[10px] text-neutral-400 tracking-widest leading-relaxed uppercase font-light">
                Thank you for your purchase from ZARIYAH. A confirmation message containing your tracking details has been sent to your phone/email.
              </p>

              <div className="bg-luxury-sand/30 p-4 border border-neutral-100 rounded-sm text-xs font-semibold text-neutral-800 uppercase tracking-widest">
                Order Number: <span className="font-bold text-luxury-gold-dark">{orderNumber}</span>
              </div>

              <p className="text-[9px] text-neutral-400 tracking-wider leading-relaxed font-light uppercase">
                Expected stitching and courier transit takes 5-7 business days for Pret items, and 12-15 business days for bridal couture.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/order-tracking"
                  className="flex-1 bg-[#111111] text-background text-[10px] tracking-[0.25em] font-semibold uppercase py-3.5 rounded-sm hover:bg-luxury-gold-dark transition-colors duration-300 text-center"
                >
                  Track Order
                </Link>
                <Link
                  href="/shop"
                  className="flex-1 border border-neutral-200 text-[#111111] text-[10px] tracking-[0.25em] font-semibold uppercase py-3.5 rounded-sm hover:border-[#111111] transition-colors duration-300 text-center"
                >
                  Return to Atelier
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
