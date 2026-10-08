"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export function BookConsultationButton({
  className,
  label = "Prenota una consulenza",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  function goTo(reason: "VENDERE" | "COMPRARE") {
    setOpen(false);
    router.push(`/chi-sono?oggetto=${reason}#form`);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Scegli il tipo di consulenza"
          >
            <div
              className="w-full max-w-sm rounded-sm bg-surface p-8 text-center shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-balance font-display">
                Come posso aiutarti?
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => goTo("VENDERE")}
                  className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                >
                  Desideri vendere?
                </button>
                <button
                  type="button"
                  onClick={() => goTo("COMPRARE")}
                  className="rounded-sm border border-border px-6 py-3 text-sm font-semibold hover:border-foreground"
                >
                  Desideri comprare?
                </button>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 text-xs text-muted hover:text-foreground"
              >
                Indietro
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
