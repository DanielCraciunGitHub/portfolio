import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "ml-4 mt-8 w-fit"
        )}
      >
        <FaChevronLeft /> Home
      </Link>
      <main className="flex-1 flex justify-center">{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}
