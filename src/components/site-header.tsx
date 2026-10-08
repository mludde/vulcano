"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { BookConsultationButton } from "@/components/book-consultation-button";
import { NAV_ITEMS } from "@/lib/nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-6 sm:px-10 lg:px-16 py-3">
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <BookConsultationButton className="hidden shrink-0 whitespace-nowrap rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 lg:inline-block" />

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border px-6 py-2 sm:px-10 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-3 text-sm font-medium hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <div className="py-4">
            <BookConsultationButton className="block w-full rounded-sm bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground hover:opacity-90" />
          </div>
        </nav>
      )}
    </header>
  );
}
