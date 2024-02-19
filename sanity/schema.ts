import { type SchemaTypeDefinition } from "sanity"

import { blogConfig } from "../src/config"

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
              ...blogConfig.categoryLinks.map(({ name }) => ({
                title: name,
                value: name,
              })),
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
