import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StarRating } from "@/components/star-rating";
import { PropertyCard } from "@/components/property-card";
import { JsonLd } from "@/components/json-ld";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { featuredPropertiesQuery, reviewsQuery } from "@/sanity/lib/queries";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { SanityProperty, SanityReview } from "@/sanity/lib/types";

export const revalidate = 60;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const stats = [
  { value: "120+", label: "Immobili venduti" },
  { value: "15 anni", label: "Di esperienza" },
  { value: "98%", label: "Clienti soddisfatti" },
];

const process = [
  {
    step: "01",
    title: "Ascoltiamo le tue esigenze",
    body: "Che tu voglia vendere, comprare o affittare, partiamo da un colloquio per capire davvero cosa cerchi.",
  },
  {
    step: "02",
    title: "Valutiamo e valorizziamo",
    body: "Analizziamo il mercato e prepariamo l'immobile — home staging e fotografia comprese — per farlo rendere al meglio.",
  },
  {
    step: "03",
    title: "Costruiamo la strategia",
    body: "Un piano su misura per il risultato che vuoi ottenere, seguito passo dopo passo fino al rogito.",
  },
];

const services = [
  {
    title: "Valutazione immobiliare",
    body: "Una stima precisa del valore reale della tua casa, basata su dati di mercato aggiornati.",
  },
  {
    title: "Home staging & valorizzazione",
    body: "Prepariamo l'immobile per renderlo più desiderabile e velocizzare la vendita.",
  },
  {
    title: "Ricerca immobili",
    body: "Un servizio dedicato a chi cerca la casa giusta, senza perdere tempo in visite inutili.",
  },
  {
    title: "Gestione locazioni",
    body: "Dalla selezione dell'inquilino alla formalizzazione del contratto, in totale sicurezza.",
  },
];

export default async function Home() {
  const [featuredProperties, reviews] = await Promise.all([
    client.fetch<SanityProperty[]>(featuredPropertiesQuery),
    client.fetch<SanityReview[]>(reviewsQuery),
  ]);

  const reviewsJsonLd =
    reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: siteConfig.name,
          url: siteConfig.url,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (
              reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            ).toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.authorName },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
            },
            reviewBody: review.text,
          })),
        }
      : null;

  return (
    <>
      <SiteHeader />
      {reviewsJsonLd && <JsonLd data={reviewsJsonLd} />}
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-border" />
          <div className="pointer-events-none absolute -right-6 -top-4 h-44 w-44 rounded-full bg-surface-2" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Vulcano Immobiliare
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-balance md:text-6xl font-display">
              La casa giusta, senza sorprese.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Accompagniamo chi vende e chi compra con un metodo chiaro, dalla
              valutazione al rogito.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contatti"
                className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                Prenota una consulenza
              </Link>
              <a
                href="#servizi"
                className="rounded-sm border border-border px-6 py-3 text-sm font-semibold hover:bg-surface-2"
              >
                Scopri i servizi
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="metodo" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="max-w-xl text-3xl font-semibold text-balance font-display">
            La maggior parte delle agenzie parte dalla vendita. Noi partiamo da te.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {process.map((item) => (
              <div key={item.step}>
                <p className="font-display text-sm font-semibold text-accent">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="servizi" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="max-w-md text-3xl font-semibold text-balance font-display">
              I nostri servizi
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-sm border border-border bg-background p-6"
                >
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.body}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-block text-sm font-semibold text-accent"
                  >
                    Scopri di più →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="immobili" className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold text-balance font-display">
              Immobili in evidenza
            </h2>
            <Link href="/immobili" className="text-sm font-semibold text-accent">
              Vedi tutti →
            </Link>
          </div>
          {featuredProperties.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  title={property.title}
                  location={property.location}
                  price={formatPrice(property.price, property.priceUnit)}
                  tag={statusLabel(property.status)}
                  imageUrl={
                    property.images?.[0]
                      ? urlFor(property.images[0]).width(600).height(450).url()
                      : undefined
                  }
                  href={property.slug?.current ? `/immobili/${property.slug.current}` : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-sm text-muted">
              Nessun immobile in evidenza al momento — torna a trovarci presto.
            </p>
          )}
        </section>

        <section id="recensioni" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="text-3xl font-semibold text-balance font-display">
              Cosa dicono di noi
            </h2>
            {reviews.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-sm border border-border bg-background p-6"
                  >
                    <StarRating rating={review.rating} />
                    <p className="mt-4 text-sm leading-relaxed text-foreground">
                      “{review.text}”
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      {review.authorPhoto ? (
                        <Image
                          src={urlFor(review.authorPhoto).width(80).height(80).url()}
                          alt={review.authorName}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-display text-sm font-semibold">
                          {initials(review.authorName)}
                        </div>
                      )}
                      <p className="text-sm font-semibold">{review.authorName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-12 text-sm text-muted">
                Le prime recensioni arriveranno presto.
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mx-auto max-w-xl text-3xl font-semibold text-balance font-display">
            Ne parliamo?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Che tu stia cercando di vendere o di acquistare casa, inizia il tuo
            percorso con Vulcano.
          </p>
          <Link
            href="/contatti"
            className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            Contattaci ora
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
