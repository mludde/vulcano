"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const OVERHANG = 14;

export function PhotoBand({
  src,
  position = "center",
  desktopPosition,
}: {
  src: string;
  position?: string;
  desktopPosition?: string;
}) {
  const bandRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    function update() {
      const band = bandRef.current;
      const layer = layerRef.current;
      if (!band || !layer) return;

      const rect = band.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress =
        (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      const travel = (OVERHANG / (100 + OVERHANG * 2)) * 100;
      layer.style.transform = `translate3d(0, ${(-clamped * travel).toFixed(2)}%, 0)`;
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      style={
        {
          "--band-pos": position,
          "--band-pos-md": desktopPosition ?? position,
        } as React.CSSProperties
      }
      className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-surface-2 md:h-[58vh] md:max-h-[640px]"
    >
      <div
        ref={layerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${OVERHANG}%`, bottom: `-${OVERHANG}%` }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70 [object-position:var(--band-pos)] md:[object-position:var(--band-pos-md)]"
        />
      </div>
    </div>
  );
}
