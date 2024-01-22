import { NavItem, SocialLink } from "@/types"
import { BsGithub, BsLinkedin, BsMedium, BsTwitterX } from "react-icons/bs"

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
  socialLinks: [
    {
      href: "https://medium.com/@danielcracbusiness",
      name: "Medium.com",
      icon: <BsMedium />,
    },
    {
      href: "https://github.com/DanielCraciunGitHub",
      name: "Github.com",
      icon: <BsGithub />,
    },
    {
      href: "https://twitter.com/craciun_07",
      name: "X.com",
      icon: <BsTwitterX />,
    },
    {
      href: "https://www.linkedin.com/in/dcraciun07/",
      name: "Linkedin.com",
      icon: <BsLinkedin />,
    },
  ] as const satisfies SocialLink[],
}
