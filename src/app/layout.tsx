import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ReelModal } from "@/components/ReelModal";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "gehnaboxbytanvi • Imitation Jewellery | Made to Embellish",
  description:
    "Artisanal luxury imitation jewellery curated by Tanvi. Kundan polki bridal sets, anti-tarnish daily wear, oxidised temple silver, and bespoke wedding trousseau adornments.",
  keywords: [
    "imitation jewellery",
    "kundan bridal set",
    "polki choker",
    "gehnaboxbytanvi",
    "anti tarnish jewellery",
    "wedding trousseau",
    "indian jewellery online",
    "temple bangles",
  ],
  authors: [{ name: "Tanvi Sharma" }],
  openGraph: {
    title: "gehnaboxbytanvi • Imitation Jewellery • Made to Embellish",
    description:
      "Handcrafted luxury imitation jewellery for the modern bride and contemporary tastemaker. Pan-India delivery & WhatsApp concierge.",
    type: "website",
    locale: "en_IN",
    siteName: "gehnaboxbytanvi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-ivory text-charcoal font-sans antialiased selection:bg-gold/30 selection:text-charcoal min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <ReelModal />
        </CartProvider>
      </body>
    </html>
  );
}
