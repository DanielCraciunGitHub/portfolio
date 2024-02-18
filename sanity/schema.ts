import { type SchemaTypeDefinition } from "sanity"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: "blog",
      type: "document",
      title: "Blog",
      fields: [
        {
          title: "Category",
          name: "category",
          type: "string",
          options: {
            list: [
              { title: "Web Development", value: "Web Development" },
              { title: "Organisation", value: "Organisation" },
              { title: "Self Development", value: "Self Development" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          type: "string",
          title: "Title",
        },
        {
          name: "subtitle",
          type: "string",
          title: "Subtitle",
        },
        {
          name: "slug",
          type: "slug",
          title: "Slug",
          options: {
            source: "title",
          },
        },
        {
          name: "image",
          type: "image",
          title: "Image",
        },
        {
          name: "content",
          type: "array",
          title: "Content",
          of: [
            { type: "block" },
            { name: "Code", type: "code" },
            { name: "Image", type: "image" },
          ],
        },
      ],
    },
  ],
}
