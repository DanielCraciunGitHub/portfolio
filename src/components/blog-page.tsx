"use client"

import Link from "next/link"
import { blogConfig } from "@/config"
import { useAtom } from "jotai"

import { searchAtom } from "@/hooks/searchAtoms"
import ArticleCards from "@/app/(Articles)/ArticleCards"
import { KeybindsModal } from "@/app/(Articles)/KeybindsModal"
import { SearchBar } from "@/app/(Articles)/SearchBar"

export function BlogPageComponent({ category }: { category?: string }) {
  const [_, setSearchTitle] = useAtom(searchAtom)

  return (
    <div className="min-h-screen">
      <header className="shadow">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blog"
            className="mx-4 flex text-lg hover:underline"
            tabIndex={0}
          >
            <h1 className="text-3xl font-bold">Blog</h1>
          </Link>
          <nav className="mt-4">
            <ul className="flex space-x-4 overflow-auto">
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
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-2/3">
            <h2 className="mb-6 text-2xl font-semibold">Latest Posts</h2>

            <ArticleCards category={category} />
          </div>

          <aside className="md:w-1/3">
            <div className="rounded-lg p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Categories</h2>
              <ul className="space-y-2">
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
              </ul>
            </div>

            <div className="mt-6 rounded-lg  p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Search</h2>
              <div className="flex">
                <SearchBar
                  updateSearchTitle={(title: string) => setSearchTitle(title)}
                />
                <KeybindsModal />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
