import { Toaster } from "@/components/ui/toaster"

import { ArticleNavbar } from "./article/ArticleNavbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleNavbar />
      <main className="container">{children}</main>
      <Toaster />
    </>
  )
}
