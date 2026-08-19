import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Recensione",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorPhoto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Valutazione",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Testo recensione",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "date", title: "Data", type: "date" }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "rating", media: "authorPhoto" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `${subtitle} stelle` : "", media };
    },
  },
});
