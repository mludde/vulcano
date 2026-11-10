import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Image from "next/image";
import { PropertyThumbnailGallery } from "@/components/property-thumbnail-gallery";
import { ContactForm } from "@/components/contact-form";
import { PropertyMap } from "@/components/property-map";
import { FactIcon, type FactKey } from "@/components/fact-icon";
import { JsonLd } from "@/components/json-ld";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { propertyBySlugQuery } from "@/sanity/lib/queries";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
import { SoldBadge } from "@/components/sold-badge";
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
  const yesNo = (value?: boolean) => ({ value: value ? "Sì" : "No", on: Boolean(value) });
  const facts: { key: FactKey; label: string; value: string; on: boolean }[] = [
    property.size
      ? { key: "area", label: "Superficie", value: `${property.size} mq`, on: true }
      : null,
    property.bedrooms
      ? { key: "bedrooms", label: "Camere", value: String(property.bedrooms), on: true }
      : null,
    property.bathrooms
      ? { key: "bathrooms", label: "Bagni", value: String(property.bathrooms), on: true }
      : null,
    { key: "garage", label: "Garage", ...yesNo(property.garage) },
    { key: "balcony", label: "Balcone", ...yesNo(property.balcony) },
    { key: "terrace", label: "Terrazzo", ...yesNo(property.terrace) },
    { key: "garden", label: "Giardino", ...yesNo(property.garden) },
  ].filter(Boolean) as { key: FactKey; label: string; value: string; on: boolean }[];
  const floorPlans = property.floorPlans ?? [];

  const energyLabel = (() => {
    const { energyClass, energyIndex } = property;
    if (!energyClass) return null;
    if (energyClass === "in-attesa") return "in attesa di certificazione";
    if (energyClass === "esente") return "immobile esente dall'APE";
    const index =
      typeof energyIndex === "number"
        ? ` · ${energyIndex.toLocaleString("it-IT")} kWh/m² anno`
        : "";
    return `${energyClass}${index}`;
  })();

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
      ...(property.address ? { streetAddress: property.address } : {}),
      addressLocality: property.location,
      addressCountry: siteConfig.address.country,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: property.sold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
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
        <section className="mx-auto max-w-[1800px] px-6 pb-20 pt-10 sm:px-10 md:pb-28 lg:px-16">
          <Link href="/immobili" className="btn-link">
            <span aria-hidden="true">←</span>
            Tutte le proposte
          </Link>

          {images.length > 0 ? (
            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-surface-2 shadow-[0_40px_80px_-40px_rgba(217,162,167,0.6)] sm:aspect-auto sm:h-[34rem]">
              <Image
                src={urlFor(images[0]).width(1600).height(1200).url()}
                alt={property.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {property.sold && <SoldBadge size="lg" />}
            </div>
          ) : (
            <div className="mt-8 aspect-[16/9] rounded-[28px] bg-surface-2" />
          )}

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
            <div>
              <p className="eyebrow">{statusLabel(property.status)}</p>
              <h1 className="display-lg mt-5">{property.title}</h1>
              <p className="mt-3 text-lg text-muted">{property.location}</p>

              <ul className="mt-8 flex flex-wrap gap-x-9 gap-y-6 border-y border-border py-7">
                {facts.map((fact) => (
                  <li key={fact.key} title={fact.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-pink ${
                        fact.on ? "" : "opacity-45"
                      }`}
                    >
                      <FactIcon name={fact.key} />
                    </span>
                    <span className="sr-only">{fact.label}: </span>
                    <span
                      className={`text-xl font-medium tracking-[-0.02em] ${
                        fact.on ? "" : "text-muted"
                      }`}
                    >
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>

              {energyLabel && (
                <p className="mt-6 text-lg text-muted">
                  <span className="font-semibold text-foreground">Classe energetica:</span>{" "}
                  {energyLabel}
                </p>
              )}

              {property.description && (
                <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-8 text-muted">
                  {property.description}
                </p>
              )}
            </div>

            <div className="card-soft h-fit p-8">
              <p className="eyebrow">Prezzo</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.03em]">
                {formatPrice(property.price, property.priceUnit)}
              </p>
              <a href="#richiedi-info" className="btn-primary mt-8 w-full">
                Richiedi informazioni
              </a>
            </div>
          </div>

          {images.length > 1 && (
            <div className="mt-20">
              <p className="eyebrow">Galleria</p>
              <h2 className="display-lg mt-5">Tutte le foto</h2>
              <div className="mt-10">
                <PropertyThumbnailGallery
                  images={images.map((image) =>
                    urlFor(image).width(1600).height(1200).url(),
                  )}
                  alt={property.title}
                />
              </div>
            </div>
          )}

          {floorPlans.length > 0 && (
            <div id="planimetrie" className="mt-20 scroll-mt-24">
              <p className="eyebrow">Documenti</p>
              <h2 className="display-lg mt-5">Planimetrie</h2>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {floorPlans.map((plan, index) => (
                  <a
                    key={plan.url}
                    href={plan.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-soft group flex items-center gap-5 p-6 transition duration-300 hover:-translate-y-1"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-2 text-pink">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path
                          d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-lg font-medium tracking-[-0.015em]">
                        {plan.title || `Planimetria ${index + 1}`}
                      </span>
                      <span className="mt-1 block text-sm text-muted transition group-hover:text-foreground">
                        Apri il PDF →
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {property.address && (
            <div id="mappa" className="mt-20 scroll-mt-24">
              <p className="eyebrow">Dove si trova</p>
              <h2 className="display-lg mt-5">La posizione</h2>
              <div className="mt-10">
                <PropertyMap address={property.address} location={property.location} />
              </div>
            </div>
          )}

          <div id="richiedi-info" className="mx-auto mt-24 max-w-2xl scroll-mt-24">
            <p className="eyebrow">Contatti</p>
            <h2 className="display-lg mt-5">Interessato a questo immobile?</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Scrivimi per avere maggiori informazioni su questo immobile.
            </p>
            <div className="card-soft mt-8 p-8 sm:p-10">
              <ContactForm defaultSubject={`Info immobile - ${property.title}`} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
