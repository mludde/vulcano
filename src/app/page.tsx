import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { JsonLd } from "@/components/json-ld";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { featuredPropertiesQuery, reviewsQuery } from "@/sanity/lib/queries";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { SanityProperty, SanityReview } from "@/sanity/lib/types";

export const revalidate = 60;

const stats = [
  { value: "120+", label: "Immobili venduti" },
  { value: "15 anni", label: "Di esperienza" },
  { value: "100%", label: "Clienti soddisfatti" },
];

const process = [
  {
    step: "01",
    title: "Ascolto le tue esigenze",
    body: "Che tu voglia vendere, comprare o affittare, parto da un colloquio per capire davvero cosa cerchi.",
  },
  {
    step: "02",
    title: "Valuto e valorizzo",
    body: "Analizzo il mercato e preparo l'immobile — home staging e fotografia comprese — per farlo rendere al meglio.",
  },
  {
    step: "03",
    title: "Costruisco la strategia",
    body: "Un piano su misura per il risultato che vuoi ottenere: ti seguo passo dopo passo fino al rogito.",
  },
];

const services = [
  {
    title: "Valutazione immobiliare",
    body: "Una stima precisa del valore reale della tua casa, basata su dati di mercato aggiornati.",
  },
  {
    title: "Home staging & valorizzazione",
    body: "Preparo l'immobile per renderlo più desiderabile e velocizzare la vendita.",
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
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Vulcano Immobiliare
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-balance md:text-6xl font-display">
                La casa giusta, senza sorprese.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                Accompagno chi vende e chi compra con un metodo chiaro, dalla
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
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm bg-surface-2">
              <svg
                viewBox="0 0 200 240"
                className="absolute inset-0 h-full w-full text-border"
                aria-label="Foto dell'agente immobiliare (placeholder)"
                role="img"
              >
                <circle cx="100" cy="95" r="48" fill="currentColor" />
                <path d="M20 240c0-58 36-95 80-95s80 37 80 95" fill="currentColor" />
              </svg>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
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
            La maggior parte delle agenzie parte dalla vendita. Io parto da te.
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
              I miei servizi
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
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold text-balance font-display">
                Cosa dicono di me
              </h2>
              <Link href="/recensioni" className="text-sm font-semibold text-accent">
                Vedi tutte →
              </Link>
            </div>
            {reviews.length > 0 ? (
              <div className="mt-12">
                <ReviewsCarousel reviews={reviews} />
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
