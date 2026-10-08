import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesList } from "@/components/services-list";
import { BookConsultationButton } from "@/components/book-consultation-button";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";
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

const process = [
  {
    title: "Ascolto con attenzione",
    body: "Mi metto nei tuoi panni, ascolto le tue esigenze, gestisco i tuoi tempi e desideri. Perché ogni percorso immobiliare è prima di tutto un percorso personale.",
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
    body: "Studio il mercato, individuo le possibilità e ti preparo alla vendita. Sarò onesta anche quando la risposta non è quella che speravi di sentire, perché la fiducia nasce dalla verità.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
        <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Determinazione, metodo e presenza",
    body: "Seguo ogni fase con energia e precisione, affronto gli imprevisti e cerco alternative quando servono. Sarò al tuo fianco dalla prima visita sino al rogito.",
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
    body: "Basata su un'approfondita indagine di mercato.",
  },
  {
    title: "Valorizzazione e consulenza immagine",
    body: "Per presentare al meglio la tua casa, perché “non c'è una seconda occasione di fare una buona prima impressione”.",
  },
  {
    title: "Strategia personalizzata",
    body: "Concordiamo insieme il percorso di vendita.",
  },
  {
    title: "Property finding",
    body: "Vuoi comprare casa ma non hai ancora trovato quella giusta? Sono qui per cercare la soluzione più in linea con le tue esigenze abitative.",
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
      <main className="relative flex-1">
        <section className="relative overflow-hidden">
          <Parallax
            speed={0.08}
            className="pointer-events-none absolute -left-24 -top-24 h-[34rem] w-[26rem] opacity-80"
          >
            <Image
              src="/brand-wash.png"
              alt=""
              fill
              className="object-contain object-left-top"
              priority
            />
          </Parallax>
          <div className="relative mx-auto grid max-w-[1800px] grid-cols-1 items-end gap-12 px-6 sm:px-10 lg:px-16 py-24 md:grid-cols-[1.25fr_1fr] md:py-32">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="h-0.5 w-4 bg-accent" />
                Agente immobiliare abilitata Valle d&apos;Aosta
              </p>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl 2xl:text-6xl font-display">
                La casa giusta per te…
                <br />
                <span className="text-accent">ieri, oggi e domani.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Accompagno chi vende e chi compra casa con trasparenza,
                professionalità ed empatia.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <BookConsultationButton className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90" />
                <a
                  href="#servizi"
                  className="border-b border-border text-sm font-semibold hover:border-foreground"
                >
                  Scopri i servizi
                </a>
              </div>
            </Reveal>
            <Reveal delay={150} className="relative mx-auto aspect-[4/5] w-full max-w-xs">
              <div className="absolute -right-4 -top-4 h-[92%] w-[92%] rounded-sm border border-accent/50" />
              <div className="absolute bottom-0 left-0 h-[92%] w-[92%] overflow-hidden rounded-sm bg-surface-2">
                <Image
                  src="/valentina-hero.jpg"
                  alt="Valentina Vulcano, agente immobiliare"
                  fill
                  priority
                  className="object-cover object-[50%_25%]"
                  sizes="(min-width: 768px) 320px, 80vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="servizi">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 py-24">
            <Reveal>
              <h2 className="max-w-md text-3xl font-semibold text-balance font-display">
                I miei servizi
              </h2>
            </Reveal>
            <ServicesList services={services} />
          </div>
        </section>

        <section id="immobili" className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 py-24">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold text-balance font-display">
                Immobili in evidenza
              </h2>
              <Link href="/immobili" className="text-sm font-semibold text-accent">
                Vedi tutti →
              </Link>
            </div>
          </Reveal>
          {featuredProperties.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {featuredProperties.map((property, index) => (
                <Reveal key={property._id} delay={index * 120}>
                  <PropertyCard
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
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-sm text-muted">
              Nessun immobile in evidenza al momento — torna a trovarci presto.
            </p>
          )}
        </section>

        <section id="metodo" className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 py-24">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-semibold text-balance font-display">
              I tuoi desideri, il mio punto di partenza.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {process.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="recensioni">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 py-24">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-3xl font-semibold text-balance font-display">
                  Cosa dicono di me
                </h2>
                <Link href="/recensioni" className="text-sm font-semibold text-accent">
                  Vedi tutte →
                </Link>
              </div>
            </Reveal>
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

        <section className="relative mx-auto max-w-[1800px] overflow-hidden px-6 sm:px-10 lg:px-16 py-24 text-center">
          <Parallax
            speed={0.18}
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full border border-accent/20"
          />
          <Reveal className="relative">
            <h2 className="mx-auto max-w-xl text-3xl font-semibold text-balance font-display">
              Ne parliamo?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Che tu stia cercando di vendere o di acquistare casa, inizia il
              tuo percorso con me.
            </p>
            <BookConsultationButton
              label="Contattami ora"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
            />
            <SocialLinks className="mt-6 justify-center" />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
