import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", title: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
  ],
});
