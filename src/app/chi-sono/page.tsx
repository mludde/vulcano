import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site-config";

const title = "Chi sono";
const description =
  "Valentina Vulcano, agente immobiliare abilitata in Valle d'Aosta: la mia storia e come contattarmi per vendere, comprare o affittare casa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/chi-sono" },
  openGraph: { title, description, url: "/chi-sono" },
  twitter: { title, description },
};

const bio = [
  "Sono Valentina e nel mondo dell'immobiliare ci sono entrata quasi per caso, o forse dovrei dire per destino, ma è bastato poco per innamorarmi di questa professione. Ho lasciato l'azienda di famiglia e mi sono trasferita per costruire da zero il mio percorso professionale. Mi sono abilitata dopo il primo anno di esperienza e da allora continuo a investire su me stessa, con formazione, aggiornamento e tanta curiosità.",
  "Sono una persona dinamica, socievole e collaborativa. Ho bisogno di muovermi, di imparare, di confrontarmi e di trovare soluzioni. E sono testarda, nel senso migliore del termine: quando ho un obiettivo, trovo il modo per arrivarci.",
  "Oggi metto questa energia al servizio del mio lavoro e, soprattutto, delle persone che scelgono di affidarsi a me.",
  "Perché dietro ogni immobile c'è una persona, una scelta, un progetto. Ed è proprio da lì che voglio partire.",
];

type Props = {
  searchParams: Promise<{ oggetto?: string }>;
};

export default async function ChiSonoPage({ searchParams }: Props) {
  const { oggetto } = await searchParams;
  const defaultSubject =
    oggetto === "VENDERE" || oggetto === "COMPRARE"
      ? oggetto
      : "Richiesta di contatto";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section>
          <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 sm:px-10 lg:px-16 py-20 md:grid-cols-[1.4fr_1fr] md:items-start">
            <Reveal className="order-2 md:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Chi sono
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-balance md:text-5xl font-display">
                Sono Valentina.
              </h1>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
                {bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal
              delay={150}
              className="relative order-1 mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm bg-surface-2 md:order-2 md:mr-0"
            >
              <Image
                src="/valentina-chi-sono.jpg"
                alt="Valentina Vulcano alla finestra di un appartamento"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 384px, 90vw"
              />
            </Reveal>
          </div>
        </section>

        <section
          id="contatti"
          className="mx-auto max-w-[1800px] scroll-mt-24 px-6 sm:px-10 lg:px-16 py-16"
        >
          <h2 className="max-w-xl text-3xl font-semibold text-balance font-display">
            Ne parliamo?
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Che tu stia cercando di vendere, comprare o affittare casa,
            scrivimi: ti rispondo entro un giorno lavorativo.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </p>
                <p className="mt-1 font-display text-lg">{siteConfig.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Telefono
                </p>
                <p className="mt-1 font-display text-lg">{siteConfig.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Indirizzo
                </p>
                <p className="mt-1 font-display text-lg">
                  {siteConfig.address.locality}, {siteConfig.address.region}
                </p>
              </div>
              <SocialLinks />
            </div>
            <div id="form" className="scroll-mt-24 rounded-sm border border-border bg-surface p-8">
              <ContactForm key={defaultSubject} defaultSubject={defaultSubject} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
