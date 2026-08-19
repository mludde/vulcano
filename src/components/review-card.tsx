import Image from "next/image";
import { StarRating } from "@/components/star-rating";
import { urlFor } from "@/sanity/lib/image";
import type { SanityReview } from "@/sanity/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function ReviewCard({ review }: { review: SanityReview }) {
  return (
    <div className="min-w-0 rounded-sm border border-border bg-background p-6">
      <StarRating rating={review.rating} />
      <p className="mt-4 break-words text-sm leading-relaxed text-foreground">
        “{review.text}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        {review.authorPhoto ? (
          <Image
            src={urlFor(review.authorPhoto).width(80).height(80).url()}
            alt={review.authorName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-display text-sm font-semibold">
            {initials(review.authorName)}
          </div>
        )}
        <p className="min-w-0 break-words text-sm font-semibold">{review.authorName}</p>
      </div>
    </div>
  );
}
