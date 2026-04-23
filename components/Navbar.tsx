"use client";

import { useRef } from "react";
import { business } from "@/config/business";

export default function Navbar() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;

  const v = business.designVariant ?? "classic";
  const isDark = v === "dark" || v === "bold";
  const isBold = v === "bold";

  const headerCls = isDark
    ? "fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10"
    : "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm";
  const logoCls = isDark
    ? `font-bold text-xl text-white${isBold ? " tracking-widest uppercase text-base" : ""}`
    : "font-bold text-xl text-gray-900";
  const linkCls = isDark
    ? `transition-colors text-white/70 hover:text-white${isBold ? " uppercase tracking-widest text-xs" : ""}`
    : "transition-colors text-gray-600 hover:text-gray-900";
  const ctaRadius = isBold ? "rounded-none" : "rounded-full";
  const hamburgerCls = isDark
    ? "list-none flex items-center justify-center w-11 h-11 text-white/80 hover:bg-white/10 transition-colors cursor-pointer touch-manipulation select-none"
    : "list-none flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation select-none";
  const dropdownCls = isDark
    ? "absolute top-full right-0 mt-1 w-48 bg-black border border-white/10 shadow-xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-white/70"
    : "absolute top-full right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600";
  const dropdownLinkCls = isDark ? "hover:text-white transition-colors py-1" : "hover:text-gray-900 transition-colors py-1";

  return (
    <header className={headerCls}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className={logoCls}>{business.name}</a>
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium${isBold ? " uppercase tracking-widest" : ""}`}>
          <a href="#services" className={linkCls}>Servicii</a>
          {isAccommodation && <a href="#rooms" className={linkCls}>Camere</a>}
          <a href="#about" className={linkCls}>Despre noi</a>
          <a href="#contact" className={linkCls}>Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {isAccommodation && bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90${isBold ? " uppercase tracking-wider" : ""}`}
              style={{ backgroundColor: business.primaryColor }}
            >
              Rezervă acum
            </a>
          ) : (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90${isBold ? " uppercase tracking-wider" : ""}`}
              style={{ backgroundColor: business.primaryColor }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
              </svg>
              <span className="hidden sm:inline">{business.phone}</span>
              <span className="sm:hidden">Sună</span>
            </a>
          )}
          <details ref={detailsRef} className="md:hidden relative">
            <summary className={hamburgerCls}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <nav className={dropdownCls}>
              <a href="#services" onClick={closeMenu} className={dropdownLinkCls}>Servicii</a>
              {isAccommodation && <a href="#rooms" onClick={closeMenu} className={dropdownLinkCls}>Camere</a>}
              <a href="#about" onClick={closeMenu} className={dropdownLinkCls}>Despre noi</a>
              <a href="#contact" onClick={closeMenu} className={dropdownLinkCls}>Contact</a>
              {isAccommodation && bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold py-1" style={{ color: business.primaryColor }} onClick={closeMenu}>
                  Rezervă acum →
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
