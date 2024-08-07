import { Toaster } from "@/components/ui/toaster"
import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar"
import { NextInjectBanner } from "@/components/NextInjectBanner"

import { WriteForUs } from "../(Writers)/write_for_us/WriteForUs"

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
