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
  const medium = siteConfig.socialLinks.find(
    (link) => link.name === "Medium.com"
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
          <div className="space-x-2">
            <SocialLink
              key={discord.href}
              name={discord.name}
              href={discord.href}
              icon={discord.icon}
              className="bg-blue-600 text-white dark:text-white"
            />
            <SocialLink
              key={medium.href}
              name={medium.name}
              href={medium.href}
              icon={medium.icon}
              className="bg-gray-700 text-white dark:text-white"
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
