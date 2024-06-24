import { type SchemaTypeDefinition } from "sanity"

import { YoutubeEmbed } from "../src/components/YoutubeEmbed"
import { blogConfig } from "../src/config"
import { CustomInput } from "./lib/HotKeys"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: "blog",
      type: "document",
      title: "Blog",

      fields: [
        {
          title: "Canonical URL",
          name: "canonical",
          type: "string",
        },
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
          name: "authors",
          title: "Authors",
          type: "array",
          of: [
            {
              title: "Author",
              name: "author",
              type: "object",
              fields: [
                {
                  type: "image",
                  name: "avatar",
                },
                {
                  type: "string",
                  name: "name",
                  validation: (Rule) => Rule.required(),
                },
                {
                  type: "string",
                  name: "discord",
                },
                {
                  type: "string",
                  name: "social",
                },
              ],
            },
          ],
        },
        {
          name: "title",
          type: "string",
          title: "Title",
          validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          type: "array",
          title: "Content",
          components: {
            input: CustomInput,
          },
          of: [
            {
              type: "block",
              marks: {
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "External link",
                    fields: [
                      {
                        name: "href",
                        type: "url",
                        title: "URL",
                      },
                    ],
                  },
                  //   {
                  //     name: "internalLink",
                  //     type: "object",
                  //     title: "Internal link",
                  //     fields: [
                  //       {
                  //         name: "reference",
                  //         type: "reference",
                  //         title: "Reference",
                  //         to: [{ type: "blog" }],
                  //       },
                  //     ],
                  //   },
                ],
              },
            },
            { name: "Code", type: "code" },
            {
              name: "Image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                },
              ],
            },
            { name: "Table", title: "Table", type: "table" },
            {
              name: "Divider",
              type: "object",
              title: "Divider",
              fields: [{ type: "string", name: "divider" }],
              components: {
                preview: () => <hr />,
              },
            },
            {
              name: "Youtube",
              type: "object",
              title: "Youtube Embed",
              fields: [{ type: "string", name: "videoId" }],
              components: {
                preview: (props: any) => {
                  return <YoutubeEmbed videoid={props.title} />
                },
              },
            },
            {
              name: "Tweet",
              type: "object",
              title: "X Embed",
              fields: [{ type: "string", name: "tweetId" }],
              components: {
                preview: (props: any) => `Tweet Id: ${props.title}`,
              },
            },
          ],
        },
      ],
    },
  ],
}
