import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { propertyBySlugQuery } from "@/sanity/lib/queries";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { SanityProperty } from "@/sanity/lib/types";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

async function getProperty(slug: string) {
  return client.fetch<SanityProperty | null>(propertyBySlugQuery, { slug });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};

  const title = `${property.title} — ${property.location}`;
  const description =
    property.description ??
    `${property.title} in ${statusLabel(property.status).toLowerCase()} a ${property.location}. ${formatPrice(property.price, property.priceUnit)}.`;
  const ogImage = property.images?.[0]
    ? [{ url: urlFor(property.images[0]).width(1200).height(630).url() }]
    : undefined;
  const canonical = `/immobili/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: ogImage },
    twitter: { title, description, images: ogImage },
  };
}

export default async function PropertyDetailPage({ params }: Params) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  const images = property.images ?? [];
  const facts = [
    property.size ? { label: "Superficie", value: `${property.size} mq` } : null,
    property.bedrooms ? { label: "Camere", value: String(property.bedrooms) } : null,
    property.bathrooms ? { label: "Bagni", value: String(property.bathrooms) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const canonicalUrl = `${siteConfig.url}/immobili/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Immobili", item: `${siteConfig.url}/immobili` },
      { "@type": "ListItem", position: 3, name: property.title, item: canonicalUrl },
    ],
  };

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: canonicalUrl,
    name: property.title,
    description: property.description,
    image: images.map((image) => urlFor(image).width(1200).url()),
    datePosted: property._createdAt,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: siteConfig.address.country,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      businessFunction:
        property.status === "affitto"
          ? "https://schema.org/LeaseOut"
          : "https://schema.org/Sell",
    },
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={listingJsonLd} />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <Link href="/immobili" className="text-sm font-semibold text-accent">
            ← Tutti gli immobili
          </Link>

          {images.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-4 sm:grid-rows-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-2 sm:col-span-2 sm:row-span-2 sm:aspect-auto">
                <Image
                  src={urlFor(images[0]).width(900).height(675).url()}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-2 sm:aspect-auto"
                >
                  <Image
                    src={urlFor(image).width(500).height(375).url()}
                    alt={`${property.title} — foto ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 aspect-[16/9] rounded-sm bg-surface-2" />
          )}

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {statusLabel(property.status)}
              </span>
              <h1 className="mt-2 text-3xl font-semibold text-balance font-display md:text-4xl">
                {property.title}
              </h1>
              <p className="mt-1 text-muted">{property.location}</p>

              {facts.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-6 border-y border-border py-4">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <p className="font-display text-lg font-semibold">
                        {fact.value}
                      </p>
                      <p className="text-xs text-muted">{fact.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {property.description && (
                <p className="mt-6 max-w-2xl leading-relaxed text-muted">
                  {property.description}
                </p>
              )}
            </div>

            <div className="h-fit rounded-sm border border-border bg-surface p-6">
              <p className="text-xs uppercase tracking-wide text-muted">Prezzo</p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {formatPrice(property.price, property.priceUnit)}
              </p>
              <Link
                href="/contatti"
                className="mt-6 block rounded-sm bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                Richiedi informazioni
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
