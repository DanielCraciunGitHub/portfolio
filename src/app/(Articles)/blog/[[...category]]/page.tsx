import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { blogConfig } from "@/config"
import ArticleCards from "src/app/(Articles)/ArticleCards"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { pathToName } from "@/lib/utils"

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
      <section className="flex flex-col items-center space-y-4">
        <Link className="pt-8" href="/blog">
          <h1 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl">
            {category ?? "Blog"}
          </h1>
        </Link>

        <CategoryNavbar />

        <main className="flex flex-1 justify-center">
          <ArticleCards category={category} />
        </main>
      </section>
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
const CategoryNavbar = () => {
  return (
    <nav className="container flex flex-col items-center overflow-x-auto rounded md:flex-row md:justify-center md:p-2">
      {blogConfig.categoryLinks.map((link) => (
        <div key={link.name}>
          <Link
            href={`/blog${link.href}`}
            className="mx-4 flex text-lg hover:underline"
            tabIndex={0}
          >
            {link.name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
