import { business } from "@/config/business";

export default function FAQ() {
  if (!business.faq || business.faq.length === 0) return null;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Întrebări frecvente
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Răspunsuri la cele mai comune întrebări ale clienților noștri.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {business.faq.map((item, i) => (
            <details
              key={i}
              className="group bg-gray-50 rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer touch-manipulation select-none font-medium text-gray-900 list-none">
                {item.question}
                <svg
                  className="w-5 h-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
