import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesList } from "@/components/services-list";
import { BookConsultationButton } from "@/components/book-consultation-button";
import { SocialLinks } from "@/components/social-links";
import { PhotoBand } from "@/components/photo-band";
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
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
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
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
        <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Determinazione, metodo e presenza",
    body: "Seguo ogni fase con energia e precisione, affronto gli imprevisti e cerco alternative quando servono. Sarò al tuo fianco dalla prima visita sino al rogito.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
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
          <div className="relative mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-14 px-6 py-20 sm:px-10 md:grid-cols-[1.45fr_1fr] md:py-28 lg:px-16">
            <Reveal>
              <p className="eyebrow">Agente immobiliare abilitata Valle d&apos;Aosta</p>
              <h1 className="display-xl mt-7">
                La casa giusta per te…
                <br />
                <span className="text-accent">ieri, oggi e domani.</span>
              </h1>
              <p className="mt-7 max-w-md text-lg leading-8 text-muted">
                Accompagno chi vende e chi compra casa con trasparenza,
                professionalità ed empatia.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <BookConsultationButton className="btn-primary" />
                <a href="#servizi" className="btn-link">
                  Scopri i servizi
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={150} className="relative mx-auto w-full max-w-sm md:justify-self-end">
              <div className="absolute -bottom-5 -left-5 h-3/4 w-3/4 rounded-[28px] bg-surface-2" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-surface-2 shadow-[0_40px_80px_-40px_rgba(30,43,41,0.5)]">
                <Image
                  src="/valentina-hero.jpg"
                  alt="Valentina Vulcano, agente immobiliare"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: "50% 18%" }}
                  sizes="(min-width: 768px) 384px, 90vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <PhotoBand src="/sfondi/soggiorno-travi.jpg" position="50% 45%" />

        <section id="servizi" className="scroll-mt-24">
          <div className="mx-auto grid max-w-[1800px] gap-10 px-6 py-24 sm:px-10 md:grid-cols-[1fr_1.7fr] md:gap-20 md:py-32 lg:px-16">
            <Reveal className="md:sticky md:top-32 md:self-start">
              <p className="eyebrow">Servizi</p>
              <h2 className="display-lg mt-5">I miei servizi</h2>
            </Reveal>
            <ServicesList services={services} />
          </div>
        </section>

        <section id="immobili">
          <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-8 sm:px-10 md:pb-32 lg:px-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">Proposte</p>
                  <h2 className="display-lg mt-5">Immobili in evidenza</h2>
                </div>
                <Link href="/immobili" className="btn-link">
                  Vedi tutti
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
            {featuredProperties.length > 0 ? (
              <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
                {featuredProperties.map((property, index) => (
                  <Reveal key={property._id} delay={index * 120}>
                    <PropertyCard
                      title={property.title}
                      location={property.location}
                      price={formatPrice(property.price, property.priceUnit)}
                      tag={statusLabel(property.status)}
                      imageUrl={
                        property.images?.[0]
                          ? urlFor(property.images[0]).width(800).height(600).url()
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
          </div>
        </section>

        <PhotoBand src="/sfondi/casa-giardino.jpg" position="50% 82%" desktopPosition="50% 72%" />

        <section id="metodo" className="scroll-mt-24">
          <div className="mx-auto max-w-[1800px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
            <Reveal>
              <p className="eyebrow">Il mio metodo</p>
              <h2 className="display-lg mt-5 max-w-3xl">
                I tuoi desideri, il mio punto di partenza.
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {process.map((item, index) => (
                <Reveal key={item.title} delay={index * 120}>
                  <div className="card-soft h-full p-8 transition duration-500 hover:-translate-y-1.5 md:p-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent">
                      {item.icon}
                    </div>
                    <h3 className="mt-8 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[1.1042rem] leading-7 text-muted">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <PhotoBand src="/sfondi/open-space-divano-verde.jpg" position="50% 55%" />

        <section id="recensioni" className="scroll-mt-24">
          <div className="mx-auto max-w-[1800px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">Recensioni</p>
                  <h2 className="display-lg mt-5">Cosa dicono di me</h2>
                </div>
                <Link href="/recensioni" className="btn-link">
                  Vedi tutte
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
            {featuredReviews.length > 0 ? (
              <div className="mt-14">
                <ReviewsCarousel reviews={featuredReviews} />
              </div>
            ) : (
              <p className="mt-12 text-sm text-muted">
                Le prime recensioni arriveranno presto.
              </p>
            )}
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="grid md:grid-cols-2">
            <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-10 md:order-1 md:py-24 lg:px-16">
              <p className="eyebrow text-background/60">Contatti</p>
              <h2 className="display-lg mt-5">Ne parliamo?</h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-background/70">
                Che tu stia cercando di vendere o di acquistare casa, inizia il
                tuo percorso con me.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <BookConsultationButton label="Contattami ora" className="btn-primary" />
                <SocialLinks tone="light" />
              </div>
            </div>
            <div className="relative order-1 min-h-[440px] md:order-2 md:min-h-[620px]">
              <Image
                src="/valentina-contatti.jpg"
                alt="Valentina Vulcano"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 24%" }}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
