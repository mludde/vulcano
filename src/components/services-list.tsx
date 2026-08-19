"use client";

import { useState } from "react";

type Service = { title: string; body: string };

export function ServicesList({ services }: { services: Service[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = hovered ?? 0;

  return (
    <div className="mt-8">
      {services.map((service, index) => (
        <div
          key={service.title}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="group grid grid-cols-[3rem_1fr] items-center gap-6 border-t border-border py-7 last:border-b sm:grid-cols-[5rem_1fr_auto]"
        >
          <span
            className={
              index === activeIndex
                ? "font-display text-4xl font-medium leading-none text-accent transition-colors"
                : "font-display text-4xl font-medium leading-none text-transparent transition-colors [-webkit-text-stroke:1px_var(--border)]"
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
              {service.body}
            </p>
          </div>
          <span className="col-span-2 mt-1 inline-block text-sm font-semibold text-accent sm:col-span-1 sm:mt-0 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            Scopri di più →
          </span>
        </div>
      ))}
    </div>
  );
}
