"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/lightbox";

export function PropertyThumbnailGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Apri foto ${index + 1} a schermo intero`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-2"
          >
            <Image
              src={src}
              alt={`${alt} — foto ${index + 1}`}
              width={500}
              height={375}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          alt={alt}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
