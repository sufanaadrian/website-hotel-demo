import Image from "next/image";
import { business } from "@/config/business";

export default function Gallery() {
  if (!business.gallery || business.gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galerie foto
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            O privire asupra muncii și spațiului nostru.
          </p>
        </div>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {business.gallery.map((url, i) => (
            <div key={i} className="relative w-full overflow-hidden rounded-2xl break-inside-avoid">
              <Image
                src={url}
                alt={`${business.name} — foto ${i + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
