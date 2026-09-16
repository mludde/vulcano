import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo";
import { NAV_ITEMS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-8 px-6 sm:px-10 lg:px-16 py-12 md:flex-row md:items-start md:justify-between">
        <div className="items-start text-left">
          <Logo className="items-start" />
          <p className="mt-3 max-w-xs text-sm text-muted">
            Agente immobiliare. Vendita, acquisto e valorizzazione di case.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-muted">
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <p>Rea {siteConfig.rea}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-border px-6 py-4 text-center text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
          riservati.
        </p>
        <Link href="/privacy" className="hover:text-foreground">
          Privacy e Cookie Policy
        </Link>
      </div>
    </footer>
  );
}
