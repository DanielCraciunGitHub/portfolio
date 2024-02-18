import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { DarkModeButton } from "@/components/DarkModeButton"
import { NavItem } from "@/components/Navbar/NavItem"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogNavbar />
      <main className="container">{children}</main>
      <ScrollToTopButton />
    </>
  )
}
const BlogNavbar = () => {
  const [firstLink] = siteConfig.navLinks
  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex justify-center p-6">
        <div className="flex justify-between w-2/3">
          <div>
            <NavItem
              key={firstLink.name}
              page={firstLink.href}
              text={firstLink.name}
              className="text-4xl"
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
