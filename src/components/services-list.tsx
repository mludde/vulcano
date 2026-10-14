"use client";

import { useEffect, useRef, useState } from "react";

type Service = { title: string; body: string };

export function ServicesList({ services }: { services: Service[] }) {
  const [centered, setCentered] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = rowRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setCentered(index);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [services]);

  return (
    <div>
      {services.map((service, index) => {
        const active = index === centered;
        return (
          <div
            key={service.title}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="grid grid-cols-[2.75rem_1fr] items-baseline gap-4 border-t border-border py-8 last:border-b md:grid-cols-[4rem_1fr] md:py-10"
          >
            <span
              className={`text-sm font-semibold tabular-nums tracking-[0.08em] transition-colors duration-500 ${
                active ? "text-accent" : "text-muted/60"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-60"}`}>
              <h3 className="text-2xl font-medium leading-tight tracking-[-0.025em] md:text-[2.1667rem]">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                {service.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
