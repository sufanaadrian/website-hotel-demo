import clientData from "@/data/client.json";

export type BusinessType =
  | "generic"
  | "hotel"
  | "pension"
  | "cottage"
  | "restaurant"
  | "mechanic"
  | "salon";

export type DesignVariant = "classic" | "dark" | "bold" | "nature";

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
  stars?: number;
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
  primaryColor: string;
  businessType?: BusinessType;
  designVariant?: DesignVariant;
  services: Service[];
  socialLinks: SocialLinks;
  googleMapsEmbedUrl?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  bookingComUrl?: string;
  airbnbUrl?: string;
  web3formsKey?: string;
  whatsapp?: string;
  gallery?: string[];
  testimonials?: Testimonial[];
  faq?: FAQItem[];
  rooms?: Room[];
  bulletPoints?: string[];
  stats?: Stat[];
};

export const business: BusinessConfig = clientData as BusinessConfig;
