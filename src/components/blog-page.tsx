"use client";

import Link from "next/link";
import { blogConfig } from "@/config";
import { useAtom } from "jotai";
import { Search, Tag, TrendingUp } from "lucide-react";

import { searchAtom } from "@/hooks/searchAtoms";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleCards from "@/app/(Articles)/ArticleCards";
import { KeybindsModal } from "@/app/(Articles)/KeybindsModal";
import { SearchBar } from "@/app/(Articles)/SearchBar";

export function BlogPageComponent({ category }: { category?: string }) {
  const [, setSearchTitle] = useAtom(searchAtom);

  const currentCategory = category || "All Posts";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-8">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                My{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                {blogConfig.description}
              </p>

              {/* Category indicator */}
              {category && (
                <div className="flex justify-center">
                  <Badge variant="secondary" className="px-4 py-2 text-lg">
                    <Tag className="mr-2 size-4" />
                    {currentCategory}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="border-y bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground ${
                !category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background"
              }`}
            >
              <TrendingUp className="mr-2 size-4" />
              All Posts
            </Link>
            {blogConfig.categoryLinks.map((link) => (
              <Link
                key={link.name}
                href={`/blog${link.href}`}
                className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground ${
                  category === link.name
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
              >
                <Tag className="mr-2 size-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Mobile Search - Show above articles on mobile only */}
        <div className="mb-8 lg:hidden">
          <Card className="border-2 transition-colors hover:border-primary/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Search className="size-5 text-primary" />
                Search Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <SearchBar
                  updateSearchTitle={(title: string) =>
                    setSearchTitle(title)
                  }
                />
                <KeybindsModal />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Press{" "}
                <kbd className="rounded bg-muted px-2 py-1 text-xs">/</kbd>{" "}
                to focus search
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-12 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Latest Posts</h2>
            </div>

            <ArticleCards category={category} />
          </div>

          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden space-y-8 lg:block">
            {/* Search Card */}
            <Card className="border-2 transition-colors hover:border-primary/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <Search className="size-5 text-primary" />
                  Search Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <SearchBar
                    updateSearchTitle={(title: string) =>
                      setSearchTitle(title)
                    }
                  />
                  <KeybindsModal />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">
                    /
                  </kbd>{" "}
                  to focus search
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
