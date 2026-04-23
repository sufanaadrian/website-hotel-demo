import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { business } from "@/config/business";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: business.name,
  description: business.tagline,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary",
    title: business.name,
    description: business.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${geistSans.variable} antialiased`}>
      <Script id="scroll-restoration" strategy="beforeInteractive">
        {`history.scrollRestoration='manual';if(window.location.hash){history.replaceState(null,'',window.location.pathname);}window.scrollTo(0,0);`}
      </Script>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
