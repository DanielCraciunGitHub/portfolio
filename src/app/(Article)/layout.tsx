import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { DarkModeButton } from "@/components/DarkModeButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleNavbar />
      <main className="container">{children}</main>
      <Toaster />
    </>
  )
}
const ArticleNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex justify-center p-6">
        <div className="flex justify-between w-2/3">
          <div>
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <FaChevronLeft />
            </Link>
          </div>
          <div>
            <DarkModeButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
