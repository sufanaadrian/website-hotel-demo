export type BusinessType = "generic" | "hotel" | "pension" | "cottage" | "restaurant" | "mechanic" | "salon";
export type DesignVariant = "classic" | "dark" | "bold";

export type Service = {
  title: string;
  description: string;
  price?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  text: string;
  stars?: number; // 1–5, defaults to 5
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Room = {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  features?: string[];
  bookingUrl?: string;
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
};

export type BusinessConfig = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  hours: string;
  primaryColor: string; // hex color e.g. "#2563eb"
  businessType?: BusinessType; // controls which sections and CTAs appear
  designVariant?: DesignVariant; // "classic" (default) | "dark" (restaurant) | "bold" (barber)
  services: Service[];
  socialLinks: SocialLinks;
  googleMapsEmbedUrl?: string;
  // Hero
  heroImageUrl?: string;  // URL to a background photo for the hero section
  heroImageAlt?: string;
  // Booking platforms (hotel / pension / cottage)
  bookingComUrl?: string;   // e.g. "https://www.booking.com/hotel/ro/..."
  airbnbUrl?: string;       // e.g. "https://www.airbnb.com/rooms/..."
  // Contact form — get a free key at https://web3forms.com
  web3formsKey?: string;
  // WhatsApp floating button — Romanian format: "40722000000" (no + or spaces)
  whatsapp?: string;
  // Optional sections — if omitted the section is not rendered
  gallery?: string[];       // array of image URLs
  testimonials?: Testimonial[];
  faq?: FAQItem[];
  rooms?: Room[];           // for hotels, pensions, cottages
  // About section
  bulletPoints?: string[];
  stats?: Stat[];
};

export const business: BusinessConfig = {
  name: "Hotel Carpathia",
  tagline: "Eleganță în inima Brașovului",
  description:
    "Hotel Carpathia este un hotel de 4 stele în centrul Brașovului, la câțiva pași de Piața Sfatului și Strada Republicii. Oferim camere elegante, un restaurant cu bucătărie românească și internațională, și toate facilitățile necesare pentru o ședere perfectă — fie că veniți în vacanță sau în interes de afaceri.",
  phone: "0268 999 100",
  email: "rezervari@hotelcarpathia.ro",
  address: "Str. Republicii nr. 42",
  city: "Brașov",
  hours: "Recepție: 24/7 | Check-in: 14:00 | Check-out: 12:00",
  primaryColor: "#1a3a5c",
  businessType: "hotel",
  designVariant: "dark",

  heroImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80",
  heroImageAlt: "Hotel Carpathia Brașov — vedere exterioară",

  bookingComUrl: "https://www.booking.com/",

  services: [
    {
      title: "Restaurant & Bar",
      description: "Bucătărie românească și internațională, mic dejun inclus, bar cu vinuri românești de selecție.",
    },
    {
      title: "Sală de conferințe",
      description: "Sală complet echipată pentru 50 de persoane: proiector, Wi-Fi dedicat, catering la cerere.",
    },
    {
      title: "Spa & Wellness",
      description: "Saună finlandeză, jacuzzi și masaj de relaxare. Rezervare la recepție.",
    },
    {
      title: "Transfer aeroport",
      description: "Transfer privat Aeroportul Henri Coandă sau Gara Brașov — rezervare cu 24h înainte.",
    },
  ],

  rooms: [
    {
      title: "Cameră Standard",
      description: "Cameră confortabilă cu pat dublu sau twin, baie privată, TV și Wi-Fi gratuit. Vedere spre grădina interioară.",
      price: "de la 320 RON / noapte",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      features: ["Pat dublu sau twin", "Baie privată", "Wi-Fi gratuit", "TV 40\"", "Mic dejun inclus"],
      bookingUrl: "https://www.booking.com/",
    },
    {
      title: "Cameră Deluxe",
      description: "Spațiu generos cu pat king-size, baie cu cadă, halate și papuci de hotel. Vedere panoramică spre Tâmpa.",
      price: "de la 480 RON / noapte",
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      features: ["Pat king-size", "Cadă + duș", "Vedere Tâmpa", "Minibar", "Mic dejun inclus"],
      bookingUrl: "https://www.booking.com/",
    },
    {
      title: "Junior Suite",
      description: "Living separat, dormitor cu pat king-size și baie de lux cu jacuzzi. Ideal pentru aniversări sau weekend romantic.",
      price: "de la 750 RON / noapte",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      features: ["Living separat", "Jacuzzi", "Etaj 4 — panoramă", "Șampanie la sosire", "Late check-out inclus"],
      bookingUrl: "https://www.booking.com/",
    },
    {
      title: "Cameră Family",
      description: "Două dormitoare comunicante, perfectă pentru familii cu copii. Include pat suplimentar și pătuț la cerere.",
      price: "de la 620 RON / noapte",
      imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      features: ["2 dormitoare comunicante", "Pat suplimentar gratuit", "Pătuț la cerere", "Wi-Fi", "Mic dejun inclus"],
      bookingUrl: "https://www.booking.com/",
    },
  ],

  gallery: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&q=80",
  ],

  testimonials: [
    {
      name: "Mihaela T.",
      role: "Recenzie Booking.com",
      stars: 5,
      text: "Locație perfectă, la 5 minute de centrul vechi. Camera Deluxe a fost impecabilă — curată, liniștită și cu o priveliște frumoasă spre Tâmpa. Revin cu siguranță.",
    },
    {
      name: "Dan & Oana R.",
      role: "Recenzie Google",
      stars: 5,
      text: "Am petrecut weekendul aniversar în Junior Suite. Șampania la sosire, jacuzzi-ul, serviciul — totul a fost la superlativ. Recomandăm cu cea mai mare căldură!",
    },
    {
      name: "Bogdan C.",
      role: "Recenzie TripAdvisor",
      stars: 5,
      text: "Am organizat o conferință de 30 de persoane. Sala perfect echipată, cateringul excelent, personalul extrem de profesionist. Partenerul nostru de încredere pentru evenimente.",
    },
  ],

  faq: [
    {
      question: "Mic dejunul este inclus în tarif?",
      answer: "Da, toate tipurile de camere includ mic dejun tip bufet, servit în restaurantul hotelului între 07:00 și 10:30.",
    },
    {
      question: "Există parcare la hotel?",
      answer: "Da, avem parcare proprie cu 30 de locuri, inclusă în tariful cazării. Rezervarea locului de parcare se face la check-in.",
    },
    {
      question: "Acceptați animale de companie?",
      answer: "Acceptăm animale mici (până în 10 kg) cu un supliment de 50 RON/noapte. Vă rugăm să anunțați la rezervare.",
    },
    {
      question: "Care sunt politicile de anulare?",
      answer: "Anulare gratuită până la 48 de ore înainte de data sosirii. Pentru rezervările nerambursabile, tariful nu se restituie.",
    },
  ],

  bulletPoints: [
    "Locație centrală — 5 min pe jos de Piața Sfatului și Strada Republicii",
    "4 stele — camere recent renovate, pat premium și lenjerie de calitate",
    "Parcare proprie inclusă + transfer aeroport disponibil",
  ],

  stats: [
    { value: "4★★★★", label: "Clasificare oficială" },
    { value: "9.2", label: "Scor Booking.com" },
    { value: "15+", label: "Ani de experiență" },
    { value: "5000+", label: "Oaspeți pe an" },
  ],

  socialLinks: {
    facebook: "https://facebook.com/hotelcarpathia",
    instagram: "https://instagram.com/hotelcarpathia",
  },

  whatsapp: "40268999100",

  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11233!2d25.5887!3d45.6427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b857ecdb089%3A0x4d1b58a3a2c5b5c1!2sBra%C8%99ov!5e0!3m2!1sro!2sro!4v1700000000000",
};
