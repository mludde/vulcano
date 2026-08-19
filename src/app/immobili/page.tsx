import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyListing } from "@/components/property-listing";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allPropertiesQuery } from "@/sanity/lib/queries";
import type { SanityProperty } from "@/sanity/lib/types";

export const revalidate = 60;

const title = "Immobili in Vendita e Affitto ad Aosta";
const description =
  "Scopri gli immobili in vendita e in affitto seguiti da Vulcano Immobiliare ad Aosta e dintorni.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/immobili" },
  openGraph: { title, description, url: "/immobili" },
  twitter: { title, description },
};

export default async function ImmobiliPage() {
  const properties = await client.fetch<SanityProperty[]>(allPropertiesQuery);
  const withImages = properties.map((property) => ({
    ...property,
    imageUrl: property.images?.[0]
      ? urlFor(property.images[0]).width(600).height(450).url()
      : undefined,
  }));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Immobili
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-balance md:text-5xl font-display">
              Gli immobili che seguiamo
            </h1>
            <p className="mt-4 max-w-lg text-muted">
              Una selezione di case in vendita e in affitto, valutate e
              seguite direttamente da noi.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          {withImages.length > 0 ? (
            <PropertyListing properties={withImages} />
          ) : (
            <p className="text-sm text-muted">
              Al momento non ci sono immobili pubblicati.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
