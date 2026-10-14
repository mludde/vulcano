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
              className="w-full max-w-sm rounded-[28px] bg-surface p-9 text-center shadow-[0_40px_90px_-30px_rgba(30,43,41,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-2xl font-medium tracking-[-0.025em] text-balance">
                Come posso aiutarti?
              </h2>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => goTo("VENDERE")}
                  className="btn-primary w-full"
                >
                  Desideri vendere?
                </button>
                <button
                  type="button"
                  onClick={() => goTo("COMPRARE")}
                  className="w-full rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition hover:border-foreground"
                >
                  Desideri comprare?
                </button>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 text-sm text-muted transition hover:text-foreground"
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
