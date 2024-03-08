"use client"

import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { useScrollUp } from "@/hooks/useScrollUp"
import { buttonVariants } from "@/components/ui/button"
import { DarkModeButton } from "@/components/DarkModeButton"

export const ArticleNavbar = () => {
  const { scrollY, scrollingUp } = useScrollUp()
  return (
    <nav
      className={`sticky top-0 z-50 transition ease-in-out duration-300 ${scrollingUp || scrollY === 0 ? "translate-y-1" : "invisible"}`}
    >
      <div className="flex justify-center p-6">
        <div className="flex justify-around w-full">
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
