import type { Metadata } from "next"
import Script from "next/script"
import { blogConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { pathToName } from "@/lib/utils"
import { BlogPageComponent } from "@/components/blog-page"

export const revalidate = 60

export function generateMetadata({ params }: pageProps): Metadata {
  return {
    ...staticMetadata.blog,
    title: params.category ? pathToName(params.category[0]) : blogConfig.title,
  }
}

interface pageProps {
  params: { category: string[] }
}

export default async function page({ params }: pageProps) {
  const category = pathToName(params.category ? params.category[0] : undefined)
  return (
    <>
      <BlogPageComponent category={category} />
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.blog),
        }}
      />
    </>
  )
}
