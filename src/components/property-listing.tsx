"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { formatPrice, statusLabel } from "@/sanity/lib/format";
import type { SanityProperty } from "@/sanity/lib/types";

export function PropertyListing({
  properties,
}: {
  properties: (SanityProperty & { imageUrl?: string })[];
}) {
  const [status, setStatus] = useState<"tutti" | "vendita" | "affitto">("tutti");
  const [availability, setAvailability] = useState<"disponibili" | "venduti" | "tutti">(
    "tutti",
  );
  const [location, setLocation] = useState("tutte");

  const locations = useMemo(
    () => Array.from(new Set(properties.map((p) => p.location))).sort(),
    [properties],
  );

  // Available properties first, sold ones at the end (stable sort keeps the
  // original newest-first order inside each group).
  const filtered = properties
    .filter((p) => {
      if (availability === "disponibili" && p.sold) return false;
      if (availability === "venduti" && !p.sold) return false;
      if (status !== "tutti" && p.status !== status) return false;
      if (location !== "tutte" && p.location !== location) return false;
      return true;
    })
    .sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as typeof status)}
          className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm shadow-sm"
        >
          <option value="tutti">Tutti</option>
          <option value="vendita">Vendita</option>
          <option value="affitto">Affitto</option>
        </select>
        <select
          value={availability}
          onChange={(event) => setAvailability(event.target.value as typeof availability)}
          className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm shadow-sm"
          aria-label="Disponibilità"
        >
          <option value="tutti">Tutti</option>
          <option value="disponibili">Disponibili</option>
          <option value="venduti">Venduti</option>
        </select>
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm shadow-sm"
        >
          <option value="tutte">Tutte le località</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((property) => (
            <PropertyCard
              key={property._id}
              title={property.title}
              location={property.location}
              price={formatPrice(property.price, property.priceUnit)}
              tag={statusLabel(property.status)}
              sold={property.sold}
              imageUrl={property.imageUrl}
              href={property.slug?.current ? `/immobili/${property.slug.current}` : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">
          Nessun immobile corrisponde ai filtri selezionati.
        </p>
      )}
    </div>
  );
}
