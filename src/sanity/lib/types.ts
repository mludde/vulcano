import type { Image as SanityImage } from "sanity";

export type SanityProperty = {
  _id: string;
  _createdAt: string;
  title: string;
  slug?: { current: string };
  status: "vendita" | "affitto";
  sold?: boolean;
  location: string;
  price: number;
  priceUnit?: "totale" | "mese";
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  images?: SanityImage[];
  address?: string;
  garage?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  garden?: boolean;
  energyClass?: string;
  energyIndex?: number;
  floorPlans?: { title?: string; url: string }[];
};

export type SanityReview = {
  _id: string;
  authorName: string;
  authorPhoto?: SanityImage;
  rating: number;
  text: string;
  featured?: boolean;
};
