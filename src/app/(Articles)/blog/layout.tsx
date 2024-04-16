import Link from "next/link"
import { blogConfig } from "@/config"

import { NavItem } from "@/components/Navbar/NavItem"

export const revalidate = 60

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="flex flex-col items-center mt-10 space-y-4">
        <Link href="/blog">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl text-center">
            Info <span className="text-primary">Library</span>
          </h1>
        </Link>
        <div className="italic">Free Information Forever</div>
        {/* <div>Search</div> */}
        <CategoryNavbar />
        <main className="flex-1 flex justify-center">{children}</main>
      </section>
    </>
  )
}
const CategoryNavbar = () => {
  return (
    <nav className="flex md:flex-row flex-col md:justify-center md:p-6">
      {blogConfig.categoryLinks.map((link) => (
        <NavItem key={link.name} page={`/blog${link.href}`} text={link.name} />
      ))}
    </nav>
  )
}
