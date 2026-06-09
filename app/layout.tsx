import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`history.scrollRestoration='manual';if(window.location.hash){history.replaceState(null,'',window.location.pathname);}window.scrollTo(0,0);`}
        </Script>
      </body>
    </html>
  );
}
