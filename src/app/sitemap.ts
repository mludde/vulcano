import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { propertySlugsQuery } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client.fetch<string[]>(propertySlugsQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/immobili`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/contatti`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/recensioni`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteConfig.url}/immobili/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
