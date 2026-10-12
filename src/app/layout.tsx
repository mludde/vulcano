import type { Metadata, Viewport } from "next";
import { Kaushan_Script } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

const kaushanScript = Kaushan_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Agente Immobiliare ad Aosta`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | Agente Immobiliare ad Aosta`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Agente Immobiliare ad Aosta`,
    description: siteConfig.description,
  },
  robots: siteConfig.isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#1e2b29",
};

const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phoneRaw,
  areaServed: siteConfig.areaServed,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${kaushanScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <JsonLd data={realEstateAgentJsonLd} />
        {children}
      </body>
    </html>
  );
}
