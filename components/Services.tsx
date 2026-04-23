import { business } from "@/config/business";

const gridColsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function Services() {
  const cols = gridColsClass[Math.min(business.services.length, 4)] ?? "sm:grid-cols-2 lg:grid-cols-3";

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isDark = v === "dark" || isBold;

  const sectionCls = isBold ? "py-20 bg-black" : isDark ? "py-20 bg-gray-950" : "py-20 bg-gray-50";
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";
  const subCls = isDark ? "text-gray-500 max-w-xl mx-auto" : "text-gray-500 max-w-xl mx-auto";
  const cardCls = isBold
    ? "bg-zinc-900 rounded-none p-6 border-l-4 flex flex-col hover:bg-zinc-800 transition-colors"
    : isDark
    ? "bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors flex flex-col"
    : "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col";
  const badgeCls = isBold
    ? "w-10 h-10 rounded-none flex items-center justify-center mb-4 text-black text-sm font-black shrink-0"
    : "w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white text-xl font-bold shrink-0";
  const titleCls = isDark ? "text-lg font-semibold text-white mb-2" : "text-lg font-semibold text-gray-900 mb-2";
  const descCls = isDark ? "text-gray-400 text-sm flex-1" : "text-gray-500 text-sm flex-1";

  return (
    <section id="services" className={sectionCls}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-14${isBold ? "" : " text-center"}`}>
          {isBold && (
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: business.primaryColor }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: business.primaryColor }}>Servicii</span>
            </div>
          )}
          <h2 className={headingCls}>{isBold ? "Ce oferim" : "Serviciile noastre"}</h2>
          {!isBold && (
            <p className={subCls}>
              Oferim o gamă completă de servicii profesionale, adaptate nevoilor dumneavoastră.
            </p>
          )}
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {business.services.map((service, index) => (
            <div
              key={index}
              className={cardCls}
              style={isBold ? { borderLeftColor: business.primaryColor } : undefined}
            >
              <div
                className={badgeCls}
                style={{ backgroundColor: business.primaryColor }}
              >
                {isBold ? `0${index + 1}` : index + 1}
              </div>
              <h3 className={titleCls}>{service.title}</h3>
              <p className={descCls}>{service.description}</p>
              {service.price && (
                <p
                  className="mt-4 text-sm font-semibold"
                  style={{ color: business.primaryColor }}
                >
                  {service.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
