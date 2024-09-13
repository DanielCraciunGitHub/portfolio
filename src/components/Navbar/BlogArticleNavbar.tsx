"use client"

import { useRef } from "react"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { useKeybind } from "@/hooks/useKeybind"
import { buttonVariants } from "@/components/ui/button"
import { DarkModeButton } from "@/components/Buttons/DarkModeButton"
import { SocialLinksArray } from "@/components/SocialLinksArray"

interface BlogArticleNavbarProps {
  returnTo: "/blog" | "/"
}

export const BlogArticleNavbar = ({ returnTo }: BlogArticleNavbarProps) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)

  useKeybind(anchorRef, { key: "ArrowLeft" }, () => anchorRef.current?.click())

  return (
    <nav className="z-50">
      <div className="flex justify-center p-6">
        <div className="flex w-full justify-around">
          <Link
            href={`${returnTo}`}
            className={cn(buttonVariants({ variant: "outline" }))}
            tabIndex={0}
            ref={anchorRef}
          >
            <FaChevronLeft />
          </Link>

          <div className="space-x-2">
            <SocialLinksArray
              socialLinks={[
                "Discord.gg",
                "X.com",
                "Linkedin.com",
                "Medium.com",
              ]}
            />
          </div>
          <div>
            <DarkModeButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
