"use client";

import { useEffect } from "react";
import Image from "next/image";

export function Lightbox({
  images,
  alt,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  alt: string;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") onNavigate((index + 1) % images.length);
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — visualizzatore foto`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Chiudi"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-background/30 text-background transition hover:border-background hover:bg-background/10"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="relative h-full w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} — foto ${index + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Foto precedente"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 text-background transition hover:border-background hover:bg-background/10 sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="Foto successiva"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 text-background transition hover:border-background hover:bg-background/10 sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/10 px-3 py-1 text-sm text-background">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
