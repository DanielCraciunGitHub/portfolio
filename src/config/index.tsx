import { NavItem, Project, SocialLink } from "@/types"
import { BsGithub, BsLinkedin, BsMedium, BsTwitterX } from "react-icons/bs"

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
      name: "eBook",
      href: "/ebook",
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
  ] satisfies NavItem[],
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
  ] satisfies SocialLink[],
  projects: [
    {
      name: "EduMentorMe (EMM)",
      type: "Website",
      description:
        "A hub of many educational features. Each feature is unique and serves a common purpose, which is to boost the grades of all students.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "Notes app",
      type: "Website",
      description:
        "This project is designed as a hub of many different features. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "Portfolio",
      type: "Website",
      description:
        "This project is designed as a hub of many different features. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "create-dc-app",
      type: "Website",
      description:
        "This project is designed as a hub of many different features. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "2D Surivival Game",
      type: "Desktop",
      description:
        "This project is designed as a hub of many different features. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
  ] satisfies Project[],
  eBookPrice: 13.99,
} as const
