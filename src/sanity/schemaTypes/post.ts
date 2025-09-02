import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  type: "document",
  fields: [
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", title: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      media: "gallery.0",
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: "Photo Set",
        subtitle: "Gallery of photos",
        media: media,
      };
    },
  },
});
