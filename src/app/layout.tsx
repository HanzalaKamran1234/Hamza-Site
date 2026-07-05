import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZARIYAH | Luxury Pakistani Pret, Festive Wear & Co-Ords",
  description: "Experience quiet luxury with ZARIYAH. Exquisite hand-embroidered pret, festive wear, and contemporary co-ord sets showcasing timeless Pakistani craftsmanship, heritage, and modern elegance.",
  keywords: "Pakistani Fashion, Luxury Pret, Bridal Festive, Designer Eid Outfits, Elegant Co-ords, Handcrafted Zari Embroidery",
  openGraph: {
    title: "ZARIYAH | Luxury Pakistani Pret & Festive Wear",
    description: "Experience quiet luxury with ZARIYAH. Exquisite hand-embroidered pret, festive wear, and contemporary co-ord sets.",
    type: "website",
    locale: "en_US",
    siteName: "ZARIYAH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <StoreProvider>
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <main className="flex-grow">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
