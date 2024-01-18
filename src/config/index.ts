import { NavItem } from "@/types"

export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "[[url-here]]"

export const siteConfig = {
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "[[url-here]]",
  navLinks: [
    {
      name: "DC",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ] as const satisfies NavItem[],
}
