import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReviewCard } from "@/components/review-card";
import { Reveal } from "@/components/reveal";
import { ReviewForm } from "@/components/review-form";
import { PhotoBand } from "@/components/photo-band";
import { client } from "@/sanity/lib/client";
import { reviewsQuery } from "@/sanity/lib/queries";
import type { SanityReview } from "@/sanity/lib/types";

export const revalidate = 60;

const title = "Recensioni";
const description =
  "Cosa dicono di Valentina Vulcano i clienti che hanno venduto, comprato o affittato casa ad Aosta.";

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
        <section>
          <Reveal className="mx-auto max-w-[1800px] px-6 pb-8 pt-20 sm:px-10 md:pt-28 lg:px-16">
            <p className="eyebrow">Recensioni</p>
            <h1 className="display-xl mt-7">
              Cosa dicono di me
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
              Le esperienze di chi ha venduto, comprato o affittato casa con
              me.
            </p>
          </Reveal>
        </section>

        <PhotoBand src="/sfondi/gazebo-tavolo.jpg" position="50% 50%" />

        <section className="mx-auto max-w-[1800px] px-6 pb-28 pt-12 sm:px-10 lg:px-16">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {reviews.map((review, index) => (
                <Reveal key={review._id} delay={(index % 3) * 100}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Le prime recensioni arriveranno presto.
            </p>
          )}
        </section>

        <section id="lascia-una-recensione" className="scroll-mt-24">
          <div className="mx-auto max-w-[1800px] px-6 pb-28 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-2xl">
              <p className="eyebrow">La tua opinione</p>
              <h2 className="display-lg mt-5">Lascia una recensione</h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Hai lavorato con me? Racconta la tua esperienza: la leggerò e la
                pubblicherò sul sito.
              </p>
              <div className="card-soft mt-8 p-8 sm:p-10">
                <ReviewForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
