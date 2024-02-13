import { Metadata, Viewport } from "next"
import { blogConfig } from "@/config"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { NavItem } from "@/components/Navbar/NavItem"

export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex flex-col items-center mt-10 space-y-4">
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl text-center">
          Info <span className="text-primary">Library</span>
        </h1>
        <CategoryNavbar />

        {children}
      </section>
    </>
  )
}
const CategoryNavbar = () => {
  return (
    <nav className="z-50">
      <div className="md:flex md:justify-center md:p-6">
        <div className="md:flex">
          <div>
            {blogConfig.categoryLinks.map((link) => (
              <NavItem
                key={link.name}
                page={`/blog${link.href}`}
                text={link.name}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
