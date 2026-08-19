"use client";

import { useEffect, useRef, useState } from "react";
import { ReviewCard } from "@/components/review-card";
import type { SanityReview } from "@/sanity/lib/types";

export function ReviewsCarousel({ reviews }: { reviews: SanityReview[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => setCanScroll(el.scrollWidth > el.clientWidth + 1);
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reviews]);

  function scroll(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({
      left: direction * scrollerRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {reviews.map((review) => (
          <div key={review._id} className="w-80 flex-none snap-start">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {canScroll && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Recensioni precedenti"
            className="absolute -left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground opacity-40 backdrop-blur transition hover:opacity-100 md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Recensioni successive"
            className="absolute -right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground opacity-40 backdrop-blur transition hover:opacity-100 md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
