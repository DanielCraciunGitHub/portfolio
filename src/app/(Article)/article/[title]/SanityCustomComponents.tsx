import Image from "next/image"
import { CodeInputValue } from "@sanity/code-input"
import { SanityImageAssetDocument } from "next-sanity"

import { urlForImage } from "../../../../../sanity/lib/image"
import { CodeBlock } from "../SanityCodeBlock"

export const myPortableTextComponents = {
  types: {
    Image: ({ value }: { value: SanityImageAssetDocument }) => (
      <Image
        priority
        src={urlForImage(value)}
        alt="Blog Image"
        width={800}
        height={800}
        className="rounded-md"
      />
    ),
    Code: ({ value }: { value: CodeInputValue }) => {
      return <CodeBlock value={value} />
    },
  },
}
