"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Gift,
  ShieldCheck,
  MessageCircle,
  Truck,
  Sparkles,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    isGiftWrap,
    setIsGiftWrap,
    giftMessage,
    setGiftMessage,
    cartSubtotal,
    giftWrapFee,
    cartTotal,
    checkoutViaWhatsApp,
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("ONLINE");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isCartOpen) return null;

  const handleOnlineCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setTimeout(() => {
      // Clear after simulation
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory shadow-2xl flex flex-col border-l border-ivory-border">
          {/* Drawer Header */}
          <div className="p-5 border-b border-ivory-border bg-ivory-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-emerald" />
              <h2 className="font-serif text-xl text-charcoal font-medium">
                Your Curated Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald/15 text-emerald rounded-full">
                {cart.length} {cart.length === 1 ? "piece" : "pieces"}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-ivory-border transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pan-India Express Banner */}
          <div className="bg-emerald/10 border-b border-emerald/20 px-4 py-2 flex items-center justify-center space-x-2 text-xs text-emerald font-medium">
            <Truck className="w-4 h-4 text-gold flex-shrink-0" />
            <span>Unlocked: Free Express Pan-India Delivery!</span>
          </div>

          {/* Drawer Body: Line Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-charcoal/30 mx-auto" />
                <h3 className="font-serif text-xl text-charcoal">Your Bag is Empty</h3>
                <p className="text-xs text-charcoal/60 max-w-xs mx-auto">
                  Explore our royal Kundan chokers, temple kadas, and anti-tarnish daily chains to fill your box.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-emerald text-ivory text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-ivory-border/70">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedVariant?.id || "default"}`}
                      className="py-4 flex space-x-3.5"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-ivory-300 border border-ivory-border flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-sm font-medium text-charcoal line-clamp-1 pr-2">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.selectedVariant?.id)
                              }
                              className="text-charcoal/40 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {item.selectedVariant && (
                            <div className="text-[11px] text-charcoal/60 font-medium">
                              Variant: {item.selectedVariant.name}
                            </div>
                          )}

                          <div className="text-[10px] text-emerald font-semibold uppercase tracking-wider mt-0.5">
                            {item.product.itemType === "READY_TO_SHIP"
                              ? "⚡ Dispatches in 24h"
                              : `✨ Karigari lead time ~${item.product.leadTimeDays}d`}
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-ivory-border rounded bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedVariant?.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 text-charcoal hover:text-emerald"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedVariant?.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 text-charcoal hover:text-emerald"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-serif font-bold text-charcoal">
                            {formatINR(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Luxury Trousseau Gift Packaging Add-on */}
                <div className="p-4 rounded-xl bg-ivory-200/90 border border-gold/40 space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="giftWrap"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gold text-emerald focus:ring-gold cursor-pointer accent-emerald"
                    />
                    <label htmlFor="giftWrap" className="cursor-pointer">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-charcoal">
                        <Gift className="w-4 h-4 text-gold-dark" />
                        <span>Add Luxury Trousseau Gift Packaging (+₹150)</span>
                      </div>
                      <p className="text-[11px] text-charcoal/70 mt-0.5">
                        Rigid gold-foil magnetic box, velvet keepsake pouch, and personalized handwritten calligraphy note.
                      </p>
                    </label>
                  </div>

                  {isGiftWrap && (
                    <div className="pt-2 animate-fade-in">
                      <textarea
                        rows={2}
                        placeholder="Write your gift message for the calligraphy note..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-gold/40 bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                        maxLength={180}
                      />
                      <div className="text-[10px] text-charcoal/50 text-right mt-0.5">
                        {giftMessage.length}/180 chars
                      </div>
                    </div>
                  )}
                </div>

                {/* Trust & COD Indicator */}
                <div className="bg-white p-3 rounded-xl border border-ivory-border flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-emerald flex-shrink-0" />
                  <div className="text-[11px] text-charcoal/80">
                    <span className="font-bold text-charcoal">COD Available</span> with instant phone verification. Guaranteed zero-tarnish replacement policy.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer: Order Summary & Dual Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-ivory-border bg-white space-y-3">
              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">
                    {formatINR(cartSubtotal)}
                  </span>
                </div>

                {isGiftWrap && (
                  <div className="flex justify-between text-gold-dark font-medium">
                    <span>Luxury Trousseau Packaging</span>
                    <span>+{formatINR(giftWrapFee)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald font-semibold uppercase text-[11px]">
                    Free (Express Pan-India)
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-charcoal pt-2 border-t border-ivory-border">
                  <span>Estimated Total</span>
                  <span className="text-emerald font-serif">
                    {formatINR(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Primary: Checkout via WhatsApp */}
              <button
                onClick={checkoutViaWhatsApp}
                className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald-700 text-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-lg flex items-center justify-center space-x-2 shadow-luxury transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>Checkout via WhatsApp</span>
              </button>

              {/* Secondary: Online Gateway / COD Modal trigger */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-2.5 px-4 bg-ivory-300 hover:bg-gold/20 text-charcoal border border-gold/40 text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Pay Online / Cash on Delivery</span>
              </button>

              <div className="text-center text-[10px] text-charcoal/50">
                🔒 256-Bit SSL Encrypted Checkout • 100% Secure Payment
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Online & COD Checkout Modal Simulation */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-ivory rounded-2xl max-w-md w-full p-6 border border-gold/40 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCheckoutModalOpen(false);
                setOrderConfirmed(false);
              }}
              className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl text-charcoal">
                  Order Received with Honour!
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Thank you for placing your trust in **gehnaboxbytanvi**. Our concierge team has logged your dispatch queue. An SMS confirmation with your tracking link is on its way.
                </p>
                <div className="p-3 bg-emerald/10 rounded-lg text-emerald text-xs font-semibold">
                  Order ID: #GBT-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setIsCartOpen(false);
                    setOrderConfirmed(false);
                  }}
                  className="w-full py-3 bg-emerald text-ivory text-xs uppercase tracking-wider font-semibold rounded-lg"
                >
                  Continue Exploring
                </button>
              </div>
            ) : (
              <form onSubmit={handleOnlineCheckoutSubmit} className="space-y-4">
                <div className="text-center pb-2 border-b border-ivory-border">
                  <h3 className="font-serif text-2xl text-charcoal">
                    Express Checkout
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    Deliver to your doorstep in 3-5 business days
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-charcoal/70 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aanya Singhania"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-ivory-border bg-white text-charcoal focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-charcoal/70 mb-1">
                      Phone Number (For COD & Delivery OTP)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-ivory-300 border border-r-0 border-ivory-border rounded-l-lg text-charcoal font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-r-lg border border-ivory-border bg-white text-charcoal focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-charcoal/70 mb-1">
                      Full Shipping Address & Pincode
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Flat No, Landmark, City, State, Pincode"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-ivory-border bg-white text-charcoal focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-charcoal/70 mb-1.5">
                      Select Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("ONLINE")}
                        className={`p-2.5 rounded-lg text-xs font-semibold border flex flex-col items-center justify-center text-center transition-all ${
                          paymentMethod === "ONLINE"
                            ? "bg-emerald text-ivory border-emerald shadow-sm"
                            : "bg-white text-charcoal border-ivory-border hover:bg-ivory-200"
                        }`}
                      >
                        <span>UPI / Card / NetBanking</span>
                        <span className="text-[10px] opacity-80 mt-0.5">
                          Instant Discount
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("COD")}
                        className={`p-2.5 rounded-lg text-xs font-semibold border flex flex-col items-center justify-center text-center transition-all ${
                          paymentMethod === "COD"
                            ? "bg-gold text-charcoal border-gold shadow-sm font-bold"
                            : "bg-white text-charcoal border-ivory-border hover:bg-ivory-200"
                        }`}
                      >
                        <span>Cash on Delivery (COD)</span>
                        <span className="text-[10px] opacity-80 mt-0.5">
                          Phone Verification
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald hover:bg-emerald-700 text-ivory text-xs uppercase tracking-widest font-semibold rounded-lg shadow-luxury transition-all"
                  >
                    Confirm Order • {formatINR(cartTotal)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
