import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyListing } from "@/components/property-listing";
import { Reveal } from "@/components/reveal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allPropertiesQuery } from "@/sanity/lib/queries";
import type { SanityProperty } from "@/sanity/lib/types";

export const revalidate = 60;

const title = "Immobili in Vendita e Affitto ad Aosta";
const description =
  "Scopri gli immobili in vendita e in affitto seguiti da Valentina Vulcano ad Aosta e dintorni.";

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
        <section>
          <Reveal className="mx-auto max-w-[1800px] px-6 pb-8 pt-20 sm:px-10 md:pt-28 lg:px-16">
            <p className="eyebrow">Immobili</p>
            <h1 className="display-xl mt-7">
              Proposte immobiliari
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
              Una selezione di case in vendita e in affitto, valutate e
              seguite direttamente da me.
            </p>
          </Reveal>
        </section>


        <section className="mx-auto max-w-[1800px] px-6 pb-28 pt-12 sm:px-10 lg:px-16">
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
