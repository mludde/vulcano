import { defineArrayMember, defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Immobile",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Stato",
      type: "string",
      options: {
        list: [
          { title: "Vendita", value: "vendita" },
          { title: "Affitto", value: "affitto" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sold",
      title: "Venduto",
      type: "boolean",
      description:
        "Attivo = l'immobile è stato venduto. Resta visibile sul sito con la scritta «Venduto» sulla copertina e compare solo con il filtro «Venduti» o «Tutti».",
      initialValue: false,
    }),
    defineField({
      name: "location",
      title: "Località",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Indirizzo (per la mappa)",
      type: "string",
      description:
        "Via e numero civico, es. «Via Roma 10, Aosta». Serve per mostrare la mappa nella pagina dell'immobile. Lascia vuoto per non mostrarla.",
    }),
    defineField({
      name: "price",
      title: "Prezzo",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "priceUnit",
      title: "Unità di prezzo",
      type: "string",
      options: {
        list: [
          { title: "Prezzo totale", value: "totale" },
          { title: "Al mese", value: "mese" },
        ],
      },
      initialValue: "totale",
    }),
    defineField({ name: "size", title: "Superficie (mq)", type: "number" }),
    defineField({ name: "bedrooms", title: "Camere", type: "number" }),
    defineField({ name: "bathrooms", title: "Bagni", type: "number" }),
    defineField({
      name: "garage",
      title: "Garage",
      type: "boolean",
      description:
        "Attivo = presente. Sul sito Garage e Posto auto condividono un'unica icona: con entrambi attivi mostra 2, con uno solo mostra 1, con nessuno l'icona non compare.",
      initialValue: false,
    }),
    defineField({
      name: "parkingSpace",
      title: "Posto auto",
      type: "boolean",
      description:
        "Attivo = presente. Sul sito Garage e Posto auto condividono un'unica icona: con entrambi attivi mostra 2, con uno solo mostra 1, con nessuno l'icona non compare.",
      initialValue: false,
    }),
    defineField({
      name: "balcony",
      title: "Balcone",
      type: "boolean",
      description: "Attivo = presente (Sì), spento = assente (No).",
      initialValue: false,
    }),
    defineField({
      name: "elevator",
      title: "Ascensore",
      type: "boolean",
      description: "Attivo = presente (Sì), spento = assente (No).",
      initialValue: false,
    }),
    defineField({
      name: "garden",
      title: "Giardino",
      type: "boolean",
      description: "Attivo = presente (Sì), spento = assente (No).",
      initialValue: false,
    }),
    defineField({
      name: "energyClass",
      title: "Classe energetica (APE)",
      type: "string",
      description:
        "Obbligatoria per legge negli annunci (D.Lgs. 192/2005). Se l'APE non c'è ancora, scegli «In attesa di certificazione».",
      options: {
        list: [
          "A4",
          "A3",
          "A2",
          "A1",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          { title: "In attesa di certificazione", value: "in-attesa" },
          { title: "Esente dall'APE", value: "esente" },
        ],
      },
      validation: (Rule) =>
        Rule.warning("Indica la classe energetica: è obbligatoria negli annunci.").required(),
    }),
    defineField({
      name: "energyIndex",
      title: "Indice di prestazione energetica (kWh/m² anno)",
      type: "number",
      description: "EPgl,nren riportato sull'APE. Facoltativo se la classe è «in attesa» o «esente».",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({ name: "description", title: "Descrizione", type: "text" }),
    defineField({
      name: "images",
      title: "Foto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "floorPlans",
      title: "Planimetrie (PDF)",
      type: "array",
      description:
        "Carica uno o più PDF. Compaiono nella sezione «Planimetrie» della pagina dell'immobile.",
      of: [
        defineArrayMember({
          type: "object",
          name: "floorPlan",
          title: "Planimetria",
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              description: "Es. «Piano terra» o «Planimetria catastale».",
            }),
            defineField({
              name: "file",
              title: "File PDF",
              type: "file",
              options: { accept: "application/pdf" },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "file.asset.originalFilename" },
            prepare({ title, subtitle }) {
              return { title: title || "Planimetria", subtitle };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "In evidenza in home",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "images.0" },
  },
});
