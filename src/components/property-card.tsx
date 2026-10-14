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
    <div className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface-2 shadow-[0_24px_50px_-30px_rgba(30,43,41,0.5)]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3.5 py-1.5 text-[0.8542rem] font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur">
          {tag}
        </span>
      </div>
      <div className="px-1 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-[-0.015em]">{title}</h3>
          <p className="shrink-0 text-lg font-medium tabular-nums">{price}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{location}</p>
      </div>
    </div>
  );

  if (!href) return card;

  return <Link href={href}>{card}</Link>;
}
