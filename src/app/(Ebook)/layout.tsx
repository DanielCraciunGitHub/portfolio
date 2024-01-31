import { Metadata, Viewport } from "next"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

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
        <FaChevronLeft />
      </Link>
      <main className="flex-1 flex justify-center">{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}
