export const siteConfig = {
  name: "Valentina Vulcano",
  // Exact word order used on the real logo/business card — for the
  // script logotype mark specifically, not for prose.
  logoName: "Vulcano Valentina",
  shortName: "Valentina",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Sono Valentina Vulcano, agente immobiliare ad Aosta: vendo, valorizzo e ti accompagno nell'acquisto di casa con un percorso chiaro, dalla valutazione al rogito.",
  tagline: "La casa giusta, senza sorprese.",
  email: "info@vulcanovalentina.it",
  phone: "+39 348 974 2939",
  phoneRaw: "+393489742939",
  rea: "82508",
  address: {
    locality: "Aosta",
    region: "Valle d'Aosta",
    country: "IT",
  },
  areaServed: "Aosta e dintorni",
  // Flip to true only when the site is ready to go live and be indexed.
  isIndexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
};
