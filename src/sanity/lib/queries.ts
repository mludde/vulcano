import { groq } from "next-sanity";

// Empty image slots (added in Studio but without an uploaded file) have no
// `asset`; drop them so they can never break the site.
const cleanImages = `"images": images[defined(asset)]`;

export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(_createdAt desc) [0...3] {
    ...,
    ${cleanImages}
  }
`;

export const allPropertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc) {
    ...,
    ${cleanImages}
  }
`;

export const reviewsQuery = groq`
  *[_type == "review"] | order(date desc)
`;

export const featuredReviewsQuery = groq`
  *[_type == "review" && featured == true] | order(date desc) [0...5]
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0]{
    ...,
    ${cleanImages},
    "floorPlans": floorPlans[defined(file.asset)]{ title, "url": file.asset->url }
  }
`;

export const propertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)].slug.current
`;
