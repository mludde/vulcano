import { defineField, defineType } from "sanity";

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
    defineField({ name: "description", title: "Descrizione", type: "text" }),
    defineField({
      name: "images",
      title: "Foto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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
