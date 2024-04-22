"use client"

import Link from "next/link"
import { siteConfig } from "@/config"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { useScrollUp } from "@/hooks/useScrollUp"
import { buttonVariants } from "@/components/ui/button"
import { DarkModeButton } from "@/components/Buttons/DarkModeButton"
import SocialLink from "@/components/SocialLink"

export const ArticleNavbar = () => {
  const { scrollY, scrollingUp } = useScrollUp()
  const discord = siteConfig.socialLinks.find(
    (link) => link.name === "Discord.gg"
  )!

  return (
    <nav
      className={`sticky bg-background md:bg-transparent z-50 transition ease-in-out duration-300 ${scrollingUp || scrollY === 0 ? "-top-1 translate-y-1" : "invisible"}`}
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
          <SocialLink
            name={discord.name}
            href={discord.href}
            icon={discord.icon}
          />
          <div>
            <DarkModeButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
