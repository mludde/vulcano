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
    <div className="mt-8">
      {services.map((service, index) => (
        <div
          key={service.title}
          ref={(el) => {
            rowRefs.current[index] = el;
          }}
          className="grid grid-cols-[3rem_1fr] items-center gap-6 border-t border-border py-7 last:border-b sm:grid-cols-[5rem_1fr]"
        >
          <span
            className={
              index === centered
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
        </div>
      ))}
    </div>
  );
}
