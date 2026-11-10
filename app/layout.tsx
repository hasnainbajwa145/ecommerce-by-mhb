import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURUM | Ultimate Premium Luxury E-commerce Store",
  description: "Experience modern, luxury fashion and lifestyle shopping with premium collections, curated designs, and smooth cinematic animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="bg-bg-custom text-text-custom font-poppins min-h-full antialiased selection:bg-accent selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
