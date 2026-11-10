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
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { featuredPropertiesQuery, featuredReviewsQuery } from "@/sanity/lib/queries";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
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
  const [featuredProperties, featuredReviews] = await Promise.all([
    client.fetch<SanityProperty[]>(featuredPropertiesQuery),
    client.fetch<SanityReview[]>(featuredReviewsQuery),
  ]);

  return (
    <>
      <SiteHeader />
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-surface-2 shadow-[0_40px_80px_-40px_rgba(217,162,167,0.6)]">
                <Image
                  src="/valentina-hero-giacca.jpg"
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

        <PhotoBand src="/sfondi/cucina-fiori.jpg" position="50% 60%" />

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
                      sold={property.sold}
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
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-pink">
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

        <PhotoBand src="/sfondi/soggiorno-travi.jpg" position="50% 45%" />

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
          <div className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
            <p className="eyebrow text-background/60">Contatti</p>
            <h2 className="display-lg mt-5 max-w-3xl">Iniziamo un progetto insieme</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-background/70">
              Che tu stia cercando di vendere o di acquistare casa, inizia il
              tuo percorso con me.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <BookConsultationButton label="Contattami ora" className="btn-primary" />
              <SocialLinks tone="light" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
