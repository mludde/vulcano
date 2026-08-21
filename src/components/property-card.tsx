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
    <div className="group overflow-hidden rounded-sm border border-border">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
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

  return <Link href={href}>{card}</Link>;
}
