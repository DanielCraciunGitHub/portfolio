import { WriteForUs } from "src/app/(Writers)/write_for_us/WriteForUs"

import { Toaster } from "@/components/ui/toaster"
import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar"
import { NextInjectBanner } from "@/components/NextInjectBanner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogArticleNavbar returnTo="/blog" />
      <NextInjectBanner />
      <WriteForUs />

      <main className="container">{children}</main>
      <Toaster />
    </>
  )
}
