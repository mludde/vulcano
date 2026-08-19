import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReviewCard } from "@/components/review-card";
import { client } from "@/sanity/lib/client";
import { reviewsQuery } from "@/sanity/lib/queries";
import type { SanityReview } from "@/sanity/lib/types";

export const revalidate = 60;

const title = "Recensioni";
const description =
  "Cosa dicono di Vulcano Immobiliare i clienti che hanno venduto, comprato o affittato casa ad Aosta.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recensioni" },
  openGraph: { title, description, url: "/recensioni" },
  twitter: { title, description },
};

export default async function RecensioniPage() {
  const reviews = await client.fetch<SanityReview[]>(reviewsQuery);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Recensioni
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-balance md:text-5xl font-display">
              Cosa dicono di me
            </h1>
            <p className="mt-4 max-w-lg text-muted">
              Le esperienze di chi ha venduto, comprato o affittato casa con
              Vulcano.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Le prime recensioni arriveranno presto.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
