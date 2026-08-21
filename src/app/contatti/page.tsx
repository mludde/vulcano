import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

const title = "Contatti";
const description =
  "Contatta Vulcano Immobiliare per vendere, comprare o affittare casa ad Aosta.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contatti" },
  openGraph: { title, description, url: "/contatti" },
  twitter: { title, description },
};

export default function ContattiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section>
          <Reveal className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Contatti
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-balance md:text-5xl font-display">
              Ne parliamo?
            </h1>
            <p className="mt-4 max-w-lg text-muted">
              Che tu stia cercando di vendere, comprare o affittare casa,
              scrivimi: ti rispondo entro un giorno lavorativo.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
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
            </div>
            <div className="rounded-sm border border-border bg-surface p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
