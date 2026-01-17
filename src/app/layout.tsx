import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ceren & Deniz Can | Düğün Davetiyesi",
  description: "Ceren ve Deniz Can'ın düğün törenine davetlisiniz. 15 Şubat 2026 - TEYMUR CONTINENTAL HOTEL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          playfair.variable,
          montserrat.variable,
          alexBrush.variable
        )}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
