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
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Apri foto ${index + 1} a schermo intero`}
            className="group relative mb-3 block w-full overflow-hidden rounded-sm bg-surface-2"
          >
            <Image
              src={src}
              alt={`${alt} — foto ${index + 1}`}
              width={500}
              height={375}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
