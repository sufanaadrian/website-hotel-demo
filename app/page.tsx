import type { Metadata } from "next";
import { business } from "@/config/business";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Rooms from "@/components/Rooms";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Rooms />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
