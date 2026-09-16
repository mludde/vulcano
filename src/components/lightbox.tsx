"use client";

import { useEffect } from "react";

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
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background text-accent shadow-lg transition hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element -- natural size needed so the click hitbox matches the visible photo, not a fill-sized box */}
      <img
        src={images[index]}
        alt={`${alt} — foto ${index + 1}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] max-w-[88vw] rounded-sm object-contain sm:max-h-[90vh] sm:max-w-5xl"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Foto precedente"
            className="absolute left-3 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-background text-accent shadow-lg transition hover:text-foreground sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            className="absolute right-3 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-background text-accent shadow-lg transition hover:text-foreground sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-sm font-semibold text-accent shadow-lg">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
