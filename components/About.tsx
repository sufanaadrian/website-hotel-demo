import { business } from "@/config/business";

const defaultBulletPoints = [
  "Experiență dovedită în domeniu",
  "Prețuri transparente și corecte",
  "Satisfacția clientului pe primul loc",
];

const defaultStats = [
  { value: "10+", label: "Ani experiență" },
  { value: "500+", label: "Clienți mulțumiți" },
  { value: "100%", label: "Garanție calitate" },
  { value: "24h", label: "Timp de răspuns" },
];

export default function About() {
  const bulletPoints = business.bulletPoints ?? defaultBulletPoints;
  const stats = business.stats ?? defaultStats;

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isDarkSection = v === "dark";

  const sectionCls = isDarkSection ? "py-20 bg-gray-900" : "py-20 bg-white";
  const headingCls = isDarkSection
    ? "text-3xl md:text-4xl font-bold text-white mb-6"
    : isBold
    ? "text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-wide"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-6";
  const descCls = isDarkSection ? "text-gray-300 text-lg leading-relaxed mb-6" : "text-gray-600 text-lg leading-relaxed mb-6";
  const bulletTextCls = isDarkSection ? "text-gray-200" : "text-gray-700";
  const ctaRadius = isBold ? "rounded-none" : "rounded-full";
  const ctaExtra = isBold ? " uppercase tracking-wider" : "";

  // Stat cards
  const statCardCls = isBold
    ? "rounded-none p-6 text-center bg-black border border-zinc-800"
    : isDarkSection
    ? "rounded-2xl p-6 text-center bg-gray-800"
    : "rounded-2xl p-6 text-center text-white";
  const statValueCls = isBold
    ? "text-3xl font-black"
    : "text-3xl font-bold";
  const statValueColor = isBold ? { color: business.primaryColor } : undefined;
  const statLabelCls = isBold
    ? "text-xs text-gray-400 mt-1 uppercase tracking-widest"
    : isDarkSection
    ? "text-sm text-gray-400 mt-1"
    : "text-sm text-white/80 mt-1";

  return (
    <section id="about" className={sectionCls}>
      <div className="max-w-5xl mx-auto px-6">
        {isBold && (
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: business.primaryColor }} />
            <span className="text-xs tracking-[0.4em] uppercase text-gray-500">Despre noi</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {!isBold && <h2 className={headingCls}>Despre noi</h2>}
            {isBold && <h2 className={headingCls}>Cine suntem</h2>}
            <p className={descCls}>{business.description}</p>
            <div className="flex flex-col gap-4">
              {bulletPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 ${isBold ? "rounded-none" : "rounded-full"} flex items-center justify-center text-white shrink-0 mt-0.5`}
                    style={{ backgroundColor: isBold ? business.primaryColor : business.primaryColor }}
                  >
                    {isBold ? (
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={bulletTextCls}>{point}</span>
                </div>
              ))}
            </div>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`inline-flex items-center gap-2 mt-8 font-semibold text-white px-6 py-3 ${ctaRadius} transition-opacity hover:opacity-90${ctaExtra}`}
              style={{ backgroundColor: isBold ? business.primaryColor : business.primaryColor, color: isBold ? "#000" : "#fff" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
              </svg>
              {business.phone}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={statCardCls}
                style={!isBold && !isDarkSection ? { backgroundColor: business.primaryColor } : undefined}
              >
                <p className={statValueCls} style={statValueColor}>{stat.value}</p>
                <p className={statLabelCls}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
