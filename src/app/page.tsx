import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesList } from "@/components/services-list";
import { JsonLd } from "@/components/json-ld";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  featuredPropertiesQuery,
  featuredReviewsQuery,
  reviewsQuery,
} from "@/sanity/lib/queries";
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
    title: "Ascolto le tue esigenze",
    body: "Che tu voglia vendere, comprare o affittare, parto da un colloquio per capire davvero cosa cerchi.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.1-3.4A7.96 7.96 0 0 1 4 12Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Valuto e valorizzo",
    body: "Analizzo il mercato e preparo l'immobile — home staging e fotografia comprese — per farlo rendere al meglio.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
        <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Costruisco la strategia",
    body: "Un piano su misura per il risultato che vuoi ottenere: ti seguo passo dopo passo fino al rogito.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 21V4" strokeLinecap="round" />
        <path d="M5 5h11l-2.5 3.5L16 12H5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
  const [featuredProperties, featuredReviews, allReviews] = await Promise.all([
    client.fetch<SanityProperty[]>(featuredPropertiesQuery),
    client.fetch<SanityReview[]>(featuredReviewsQuery),
    client.fetch<SanityReview[]>(reviewsQuery),
  ]);

  const reviewsJsonLd =
    allReviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: siteConfig.name,
          url: siteConfig.url,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (
              allReviews.reduce((sum, review) => sum + review.rating, 0) /
              allReviews.length
            ).toFixed(1),
            reviewCount: allReviews.length,
          },
          review: featuredReviews.map((review) => ({
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
          <div className="pointer-events-none absolute -bottom-56 -right-44 h-[30rem] w-[30rem] rounded-full border border-accent/30" />
          <div className="pointer-events-none absolute -bottom-36 -right-24 h-72 w-72 rounded-full border border-accent/15" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-6 py-24 md:grid-cols-[1.25fr_1fr] md:py-32">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="h-0.5 w-4 bg-accent" />
                Vulcano Immobiliare
              </p>
              <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl font-display">
                La casa giusta,
                <br />
                <span className="text-accent">senza sorprese.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Accompagno chi vende e chi compra con un metodo chiaro, dalla
                valutazione al rogito.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="/contatti"
                  className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                >
                  Prenota una consulenza
                </Link>
                <a
                  href="#servizi"
                  className="border-b border-border text-sm font-semibold hover:border-foreground"
                >
                  Scopri i servizi
                </a>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
              <div className="absolute -right-4 -top-4 h-[92%] w-[92%] rounded-sm border border-accent/50" />
              <div className="absolute bottom-0 left-0 h-[92%] w-[92%] overflow-hidden rounded-sm bg-surface-2">
                <Image
                  src="/agente.jpg"
                  alt="Foto dell'agente immobiliare"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 768px) 320px, 80vw"
                />
              </div>
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
              <div key={item.title}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
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
            <ServicesList services={services} />
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
            {featuredReviews.length > 0 ? (
              <div className="mt-12">
                <ReviewsCarousel reviews={featuredReviews} />
              </div>
            ) : (
              <p className="mt-12 text-sm text-muted">
                Le prime recensioni arriveranno presto.
              </p>
            )}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full border border-accent/20" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-3xl font-semibold text-balance font-display">
              Ne parliamo?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Che tu stia cercando di vendere o di acquistare casa, inizia il
              tuo percorso con Vulcano.
            </p>
            <Link
              href="/contatti"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
            >
              Contattaci ora
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
