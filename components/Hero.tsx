import Image from "next/image";
import { business } from "@/config/business";

export default function Hero() {
  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold || isNature;

  const overlayOpacity = isBold ? "bg-black/70" : isNature ? "bg-green-950/60" : isDark ? "bg-black/60" : "bg-black/50";
  const ctaRadius = isBold ? "rounded-none" : "rounded-full";
  const titleCls = isBold
    ? "text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight uppercase"
    : "text-4xl md:text-6xl font-bold mb-4 leading-tight";
  const taglineCls = isBold
    ? "text-base md:text-lg mb-10 text-white/80 uppercase tracking-[0.3em] font-light"
    : isDark
    ? "text-xl md:text-2xl mb-8 text-white/90 italic"
    : "text-xl md:text-2xl mb-8 text-white/90";

  const heroBg = !business.heroImageUrl
    ? isBold
      ? { backgroundColor: "#000" }
      : { backgroundColor: business.primaryColor }
    : undefined;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={heroBg}
    >
      {business.heroImageUrl ? (
        <>
          <Image
            src={business.heroImageUrl}
            alt={business.heroImageAlt ?? business.name}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${overlayOpacity}`} />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {isBold && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      )}

      <div className={`relative z-10 px-6 max-w-4xl mx-auto${isBold ? " text-left w-full" : " text-center"}`}>
        {isBold && (
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ backgroundColor: business.primaryColor }} />
            <span className="text-xs tracking-[0.4em] uppercase text-white/60">Est. 2024</span>
          </div>
        )}
        <h1 className={titleCls}>{business.name}</h1>
        <p className={taglineCls}>{business.tagline}</p>

        <div className={`flex flex-col sm:flex-row gap-4 flex-wrap${isBold ? "" : " justify-center"}`}>
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className={`inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 ${ctaRadius} hover:bg-gray-100 transition-colors text-lg${isBold ? " uppercase tracking-wider text-base" : ""}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
            </svg>
            Sună acum
          </a>
          {business.bookingComUrl && (
            <a
              href={business.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 ${ctaRadius} hover:bg-white/10 transition-colors text-lg`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.267 14.83a3.46 3.46 0 01-3.458 3.458H9.17a3.46 3.46 0 01-3.458-3.457V9.17A3.46 3.46 0 019.17 5.713h4.64a3.46 3.46 0 013.457 3.457zm1.995 0V9.17C19.262 6.068 16.912 3.718 13.81 3.718H9.17C6.068 3.718 3.718 6.068 3.718 9.17v5.66c0 3.102 2.35 5.452 5.452 5.452h4.64c3.102 0 5.452-2.35 5.452-5.452zM12 8.285a3.715 3.715 0 100 7.43 3.715 3.715 0 000-7.43zm0 1.995a1.72 1.72 0 110 3.44 1.72 1.72 0 010-3.44zm3.833-2.905a.832.832 0 100 1.664.832.832 0 000-1.664z" />
              </svg>
              Booking.com
            </a>
          )}
          {business.airbnbUrl && (
            <a
              href={business.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 ${ctaRadius} hover:bg-white/10 transition-colors text-lg`}
            >
              Airbnb
            </a>
          )}
          {!business.bookingComUrl && !business.airbnbUrl && (
            <a
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 border-2 font-semibold px-8 py-3 ${ctaRadius} transition-colors text-lg${isBold ? " uppercase tracking-wider text-base text-black border-transparent" : " border-white text-white hover:bg-white/10"}`}
              style={isBold ? { backgroundColor: business.primaryColor, borderColor: business.primaryColor } : undefined}
            >
              {isBold ? "Book Now" : "Cere o ofertă"}
            </a>
          )}
        </div>
        <p className={`mt-6 text-sm${isDark ? " text-white/50" : " text-white/70"}`}>{business.hours}</p>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
