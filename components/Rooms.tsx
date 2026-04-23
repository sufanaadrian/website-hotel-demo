import Image from "next/image";
import { business } from "@/config/business";

export default function Rooms() {
  if (!business.rooms || business.rooms.length === 0) return null;

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Camere și tarife
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Alegeți camera potrivită pentru un sejur de neuitat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.rooms.map((room, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {room.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={room.imageUrl}
                    alt={room.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{room.description}</p>
                {room.features && room.features.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {room.features.map((f) => (
                      <li key={f} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-bold text-lg" style={{ color: business.primaryColor }}>
                    {room.price}
                  </span>
                  <RoomBookingButton room={room} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomBookingButton({ room }: { room: import("@/config/business").Room }) {
  const href = room.bookingUrl ?? business.bookingComUrl ?? business.airbnbUrl ?? "#contact";
  const isExternal = href !== "#contact" && href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-sm font-semibold text-white px-4 py-2 rounded-full transition-opacity hover:opacity-90"
      style={{ backgroundColor: business.primaryColor }}
    >
      Rezervă
    </a>
  );
}
