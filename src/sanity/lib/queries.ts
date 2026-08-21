import { groq } from "next-sanity";

export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(_createdAt desc) [0...3]
`;

export const allPropertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc)
`;

export const reviewsQuery = groq`
  *[_type == "review"] | order(date desc)
`;

export const featuredReviewsQuery = groq`
  *[_type == "review" && featured == true] | order(date desc) [0...5]
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0]
`;

export const propertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)].slug.current
`;
