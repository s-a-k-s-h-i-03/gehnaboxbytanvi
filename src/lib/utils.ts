import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, ProductVariant, CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND_PHONE = "919876543210";
export const BRAND_DISPLAY_PHONE = "+91 98765 43210";
export const BRAND_NAME = "gehnaboxbytanvi";
export const BRAND_TAGLINE = "Imitation Jewellery • Made to Embellish";

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppProductUrl(
  product: Product,
  variant?: ProductVariant,
  customInquiry?: string
): string {
  const variantText = variant ? `\n• Selected Variant: *${variant.name}*` : "";
  const leadTimeText =
    product.itemType === "MADE_TO_ORDER"
      ? `\n• Type: *Artisan Made-to-Order* (Lead time ~${product.leadTimeDays} days)`
      : `\n• Type: *Ready to Ship* (Dispatches within 24-48 hrs)`;

  const message = [
    `✨ *Namaste Tanvi!* I am interested in ordering from *gehnaboxbytanvi*:`,
    ``,
    `*${product.title}*`,
    `• Price: *${formatINR(product.price)}* (MRP: ${formatINR(product.mrp)})${variantText}${leadTimeText}`,
    `• Product ID: #${product.id}`,
    customInquiry ? `\n*Note/Inquiry:* ${customInquiry}` : ``,
    ``,
    `Please share order confirmation, payment UPI/details, and dispatch schedule. Thank you! ✨`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppCartCheckoutUrl(
  items: CartItem[],
  isGiftWrap: boolean,
  giftMessage?: string
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const giftWrapFee = isGiftWrap ? 150 : 0;
  const grandTotal = subtotal + giftWrapFee;

  const itemLines = items.map((item, idx) => {
    const varText = item.selectedVariant ? ` (${item.selectedVariant.name})` : "";
    const typeLabel =
      item.product.itemType === "MADE_TO_ORDER" ? " [Made-to-Order]" : " [Ready to Ship]";
    return `${idx + 1}. *${item.product.title}*${varText} x ${item.quantity} = ${formatINR(
      item.product.price * item.quantity
    )}${typeLabel}`;
  });

  const message = [
    `👑 *gehnaboxbytanvi • Luxury Order Request* 👑`,
    `Namaste Tanvi, I would like to place an order for the following curated pieces:`,
    ``,
    ...itemLines,
    ``,
    `-------------------------`,
    `• Subtotal: *${formatINR(subtotal)}*`,
    isGiftWrap
      ? `• Luxury Trousseau Gift Box (+₹150): *Included*${
          giftMessage ? `\n  *Note:* "${giftMessage}"` : ""
        }`
      : `• Packaging: Standard Luxury Velvet Pouch`,
    `• Delivery: *Pan-India Free Express Shipping*`,
    `• *Estimated Total: ${formatINR(grandTotal)}*`,
    `-------------------------`,
    ``,
    `Kindly share your UPI ID / payment link to confirm this order. My delivery address will follow. ✨`,
  ].join("\n");

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}
