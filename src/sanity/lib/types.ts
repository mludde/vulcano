import type { Image as SanityImage } from "sanity";

export type SanityProperty = {
  _id: string;
  _createdAt: string;
  title: string;
  slug?: { current: string };
  status: "vendita" | "affitto";
  location: string;
  price: number;
  priceUnit?: "totale" | "mese";
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  images?: SanityImage[];
};

export type SanityReview = {
  _id: string;
  authorName: string;
  authorPhoto?: SanityImage;
  rating: number;
  text: string;
};
