import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo";
import { NAV_ITEMS } from "@/lib/nav";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-[1800px] gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr] md:py-20 lg:px-16">
        <div>
          <Logo className="items-start" />
          <p className="mt-4 text-sm text-muted">Agente immobiliare</p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-[0.8542rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Esplora
          </p>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit font-medium transition hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="text-[0.8542rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Contatti
          </p>
          <p className="font-medium">{siteConfig.email}</p>
          <p className="font-medium">{siteConfig.phone}</p>
          <p className="text-muted">Rea {siteConfig.rea}</p>
          <SocialLinks className="mt-3" />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1800px] flex-col items-start gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
            riservati.
          </p>
          <Link href="/privacy" className="transition hover:text-foreground">
            Privacy e Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
