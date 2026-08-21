"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-dismissed";

// Not mounted yet — this site currently sets no non-essential cookies, so
// there is nothing to ask consent for. Add <CookieBanner /> to the root
// layout (and gate any analytics/marketing scripts on consent) once that
// changes.
export function CookieBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface px-6 py-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          Questo sito utilizza solo cookie tecnici necessari al suo
          funzionamento.{" "}
          <Link href="/privacy#cookie" className="text-accent underline">
            Scopri di più
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          Ho capito
        </button>
      </div>
    </div>
  );
}
