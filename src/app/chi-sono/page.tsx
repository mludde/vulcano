import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { PhotoBand } from "@/components/photo-band";
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
          <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-14 px-6 py-20 sm:px-10 md:grid-cols-[1.35fr_1fr] md:items-center md:py-28 lg:px-16">
            <Reveal className="order-2 md:order-1">
              <p className="eyebrow">Chi sono</p>
              <h1 className="display-xl mt-7">Sono Valentina.</h1>
              <div className="mt-10 max-w-2xl space-y-6 text-lg leading-8 text-muted">
                {bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal
              delay={150}
              className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:justify-self-end"
            >
              <div className="absolute -bottom-5 -right-5 h-3/4 w-3/4 rounded-[28px] bg-surface-2" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-surface-2 shadow-[0_40px_80px_-40px_rgba(30,43,41,0.5)]">
                <Image
                  src="/valentina-vestito-giallo.jpg"
                  alt="Valentina Vulcano, agente immobiliare"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: "50% 30%" }}
                  sizes="(min-width: 768px) 384px, 90vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <PhotoBand src="/sfondi/cucina-fiori.jpg" position="50% 50%" />

        <section id="contatti" className="scroll-mt-24">
          <div className="mx-auto max-w-[1800px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
            <p className="eyebrow">Contatti</p>
            <h2 className="display-lg mt-5">Ne parliamo?</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Che tu stia cercando di vendere, comprare o affittare casa,
              scrivimi.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
              <div className="flex flex-col gap-9">
                <div>
                  <p className="text-[0.8542rem] font-semibold uppercase tracking-[0.2em] text-muted">
                    Email
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.015em]">{siteConfig.email}</p>
                </div>
                <div>
                  <p className="text-[0.8542rem] font-semibold uppercase tracking-[0.2em] text-muted">
                    Telefono
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.015em]">{siteConfig.phone}</p>
                </div>
                <div>
                  <p className="text-[0.8542rem] font-semibold uppercase tracking-[0.2em] text-muted">
                    Indirizzo
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.015em]">
                    {siteConfig.address.locality}, {siteConfig.address.region}
                  </p>
                </div>
                <SocialLinks />
              </div>
              <div id="form" className="card-soft scroll-mt-24 p-8 sm:p-10">
                <ContactForm key={defaultSubject} defaultSubject={defaultSubject} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
