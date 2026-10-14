"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { BookConsultationButton } from "@/components/book-consultation-button";
import { NAV_ITEMS } from "@/lib/nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-6 py-3.5 sm:px-10 lg:px-16">
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 text-[0.9792rem] font-medium tracking-[0.01em] text-muted lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline decoration-transparent decoration-2 underline-offset-[10px] transition hover:text-foreground hover:decoration-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <BookConsultationButton className="btn-primary hidden shrink-0 whitespace-nowrap !px-5 !py-2.5 lg:inline-flex" />

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border/70 px-6 pb-6 pt-2 sm:px-10 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-4 text-lg font-medium tracking-[-0.01em] hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6">
            <BookConsultationButton className="btn-primary w-full" />
          </div>
        </nav>
      )}
    </header>
  );
}
