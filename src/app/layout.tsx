import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfinityAlgoPower - Professional Trading Tools | أدوات تداول احترافية",
  description: "Your trusted platform for professional trading tools. Advanced indicators, automated robots, and educational courses. | منصتك الموثوقة لأدوات التداول الاحترافية",
  keywords: ["trading", "indicators", "Expert Advisors", "trading courses", "TradingView", "MT4", "MT5", "forex", "gold", "تداول", "مؤشرات", "روبوتات"],
  authors: [{ name: "InfinityAlgoPower Team" }],
  icons: {
    icon: "https://infinityalgoacademy.net/favicon.ico",
  },
  openGraph: {
    title: "InfinityAlgoPower - Professional Trading Tools",
    description: "Your trusted platform for professional trading tools and education",
    url: "https://infinityalgoacademy.net",
    siteName: "InfinityAlgoPower",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InfinityAlgoPower - Professional Trading Tools",
    description: "Your trusted platform for professional trading tools and education",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
