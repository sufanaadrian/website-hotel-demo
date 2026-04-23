"use client";

import { useState } from "react";
import { business } from "@/config/business";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (business.web3formsKey) {
      setLoading(true);
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: business.web3formsKey,
            subject: `Cerere de ofertă de la ${name}`,
            from_name: name,
            phone,
            message,
          }),
        });
        setSubmitted(true);
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback: open email client
      const subject = encodeURIComponent(`Cerere de ofertă de la ${name}`);
      const body = encodeURIComponent(`Nume: ${name}\nTelefon: ${phone}\n\nMesaj:\n${message}`);
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Suntem disponibili pentru orice întrebare. Contactați-ne și vă
            răspundem în cel mai scurt timp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="flex flex-col gap-6">
            <InfoRow
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                </svg>
              }
              label="Telefon"
              value={
                <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {business.phone}
                </a>
              }
              color={business.primaryColor}
            />
            <InfoRow
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              label="Email"
              value={
                <a href={`mailto:${business.email}`} className="hover:underline">
                  {business.email}
                </a>
              }
              color={business.primaryColor}
            />
            <InfoRow
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              label="Adresă"
              value={`${business.address}, ${business.city}`}
              color={business.primaryColor}
            />
            <InfoRow
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Program"
              value={business.hours}
              color={business.primaryColor}
            />

            {business.googleMapsEmbedUrl && (
              <div className="rounded-2xl overflow-hidden h-48 mt-2">
                <iframe
                  src={business.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locație pe hartă"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white mb-4"
                  style={{ backgroundColor: business.primaryColor }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mesaj trimis!</h3>
                <p className="text-gray-500">Vă vom contacta în cel mai scurt timp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numele dumneavoastră *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                    style={{ ["--tw-ring-color" as string]: business.primaryColor }}
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Număr de telefon *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="0722 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 transition-shadow resize-none"
                    placeholder="Descrieți ce servicii vă interesează..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold py-3 rounded-xl transition-opacity hover:opacity-90 mt-2 disabled:opacity-60"
                  style={{ backgroundColor: business.primaryColor }}
                >
                  {loading ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
