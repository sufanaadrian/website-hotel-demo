import { business } from "@/config/business";

export default function Testimonials() {
  if (!business.testimonials || business.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce spun clienții noștri
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Satisfacția clienților este cea mai bună recomandare a noastră.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.testimonials.map((t, i) => {
            const stars = t.stars ?? 5;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      className="w-4 h-4"
                      fill={s < stars ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: s < stars ? "#FBBF24" : "#D1D5DB" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  {t.role && <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
