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
      description: "Attivo = presente (Sì), spento = assente (No).",
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
      name: "terrace",
      title: "Terrazzo",
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
