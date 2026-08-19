import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Immobili", href: "/immobili" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi sono", href: "/#metodo" },
  { label: "Recensioni", href: "/recensioni" },
  { label: "Contatti", href: "/contatti" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">Vulcano</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Agente immobiliare. Vendita, acquisto e valorizzazione di case.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-muted">
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
