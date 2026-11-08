"use client";

import { useState } from "react";

export function PropertyMap({
  address,
  location,
}: {
  address: string;
  location: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const query = address.toLowerCase().includes(location.toLowerCase())
    ? address
    : `${address}, ${location}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=it&z=16&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-surface-2 shadow-[var(--shadow-soft)]">
      <div className="relative h-[22rem] md:h-[26rem]">
        {loaded ? (
          <iframe
            src={embedUrl}
            title={`Mappa: ${query}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-pink shadow-sm">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path
                  d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </span>
            <p className="text-xl font-medium tracking-[-0.015em]">{query}</p>
            <button type="button" onClick={() => setLoaded(true)} className="btn-primary">
              Mostra mappa
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4 text-sm">
        <span className="text-muted">{query}</span>
        <a href={openUrl} target="_blank" rel="noreferrer" className="btn-link">
          Apri in Google Maps
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
