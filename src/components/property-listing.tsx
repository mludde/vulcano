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
  const [location, setLocation] = useState("tutte");

  const locations = useMemo(
    () => Array.from(new Set(properties.map((p) => p.location))).sort(),
    [properties],
  );

  const filtered = properties.filter((p) => {
    if (status !== "tutti" && p.status !== status) return false;
    if (location !== "tutte" && p.location !== location) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as typeof status)}
          className="rounded-sm border border-border bg-surface px-4 py-2 text-sm"
        >
          <option value="tutti">Vendita e affitto</option>
          <option value="vendita">Solo vendita</option>
          <option value="affitto">Solo affitto</option>
        </select>
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="rounded-sm border border-border bg-surface px-4 py-2 text-sm"
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
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard
              key={property._id}
              title={property.title}
              location={property.location}
              price={formatPrice(property.price, property.priceUnit)}
              tag={statusLabel(property.status)}
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
