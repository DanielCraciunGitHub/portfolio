import type { Metadata } from "next"
import Script from "next/script"
import { blogConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { pathToName } from "@/lib/utils"
import { BlogPageComponent } from "@/components/blog-page"

export const revalidate = 60

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { category } = await params
  return {
    ...staticMetadata.blog,
    title: category ? pathToName(category[0]) : blogConfig.title,
  }
}

interface pageProps {
  params: Promise<{ category: string[] }>
}

export default async function page({ params }: pageProps) {
  const { category } = await params
  const categoryName = pathToName(category ? category[0] : undefined)
  return (
    <>
      <BlogPageComponent category={categoryName} />
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
