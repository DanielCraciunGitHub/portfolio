import Link from "next/link"
import { siteConfig } from "@/config"
import { FaChevronLeft } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DarkModeButton } from "@/components/Buttons/DarkModeButton"
import SocialLink from "@/components/SocialLink"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogNavbar />
      <main>{children}</main>
    </>
  )
}
const BlogNavbar = () => {
  const discord = siteConfig.socialLinks.find(
    (link) => link.name === "Discord.gg"
  )!

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex justify-center p-6">
        <div className="flex justify-around w-full">
          <div>
            <Link
              href="/"
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
