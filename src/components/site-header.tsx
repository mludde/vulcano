import Link from "next/link";

const navItems = [
  { label: "Immobili", href: "/immobili" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi sono", href: "/#metodo" },
  { label: "Recensioni", href: "/recensioni" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Vulcano
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contatti"
          className="rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          Prenota una consulenza
        </Link>
      </div>
    </header>
  );
}
