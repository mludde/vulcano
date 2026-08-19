import Image from "next/image";
import Link from "next/link";

export type Property = {
  title: string;
  location: string;
  price: string;
  tag: string;
  imageUrl?: string;
  href?: string;
};

export function PropertyCard({ title, location, price, tag, imageUrl, href }: Property) {
  const card = (
    <div className="overflow-hidden rounded-sm border border-border">
      <div className="relative aspect-[4/3] bg-surface-2">
        {imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {tag}
        </span>
        <h3 className="mt-2 font-semibold">{title}</h3>
        <p className="text-sm text-muted">{location}</p>
        <p className="mt-3 font-display text-lg font-semibold">{price}</p>
      </div>
    </div>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block transition-opacity hover:opacity-90">
      {card}
    </Link>
  );
}
