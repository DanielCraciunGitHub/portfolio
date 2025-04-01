import Link from "next/link"
import {
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs"
import type { HeroStat, NavItem, Project, Skills, SocialLink } from "src/types"

import { nameToPath } from "../lib/utils"

export const siteConfig = {
  email: "danielcracbusiness@gmail.com",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://www.danielfullstack.com`,
  navLinks: [
    {
      name: "Home",
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
    {
      name: "Blog",
      href: "/blog",
    },
  ] as const satisfies NavItem[],
  socialLinks: [
    {
      href: "https://medium.com/@dc0",
      name: "Medium.com",
      icon: <BsMedium />,
    },
    {
      href: "https://discord.gg/CU2G3D4zjB",
      name: "Discord.gg",
      icon: <BsDiscord />,
    },
    {
      href: "https://github.com/DanielCraciunGitHub",
      name: "Github.com",
      icon: <BsGithub />,
    },
    {
      href: "https://www.linkedin.com/in/dcraciun07/",
      name: "Linkedin.com",
      icon: <BsLinkedin />,
    },
    {
      href: "https://x.com/craciun_07",
      name: "X.com",
      icon: <BsTwitterX />,
    },
  ] as const satisfies SocialLink[],
  contactMe: [
    `Connect with me today through social media or by filling in the contact form.`,
    `Thank you.`,
  ],
} as const

export const danielConfig = {
  name: "Daniel Craciun",
  description: "SaaS Developer | Full-Stack Web Developer | Tech Writer",
  aboutMe: [
    `My name is Daniel. I love SaaS, full stack web development, and writing (on a good day).`,
    `I have been on this journey for 2+ years, and I am always learning more.`,
    `Outside of work, I love the gym, I love to read (all sorts), and I love eating and cooking tasty healthy food.`,
  ],

  heroStats: [
    { "$3,900+": "Made from side hustles" },
    { "8+": "Projects Completed" },
  ] as const satisfies HeroStat[],
  projects: [
    {
      name: "DevMarket",
      type: "Website",
      description:
        "DevMarket is a platform connecting technical and non-technical people to work on projects together. It's designed as an end-to-end solution for cofounder matching, and we want to make cofounder matching easy and effective.",
      href: "https://www.devmarket.pro",
      imageHref: "/images/devmarket.png",
      hot: true,
    },
    {
      name: "Portfolio & Blog",
      type: "Website",
      description:
        "My Portfolio website which includes a personal blog, built using Next.js. The portfolio includes a blog built from scratch that is loved by thousands of users, reaching 300+ daily readers on average.",
      href: "https://github.com/DanielCraciunGitHub/portfolio",
      imageHref: "/images/portfolio.png",
      hot: false,
    },
    {
      name: "Next Inject",
      type: "CLI Tool",
      description:
        "A command line tool designed for Next.js developers that configures essential parts of your app with a single command. I earned $60+ from this product and I have 20+ satisfied users.",
      href: "https://github.com/DanielCraciunGitHub/next-inject/",
      imageHref: "/images/next-inject.png",
      hot: false,
    },
    {
      name: "EduMentorMe",
      type: "Website",
      description:
        "This project is a hub of many different features used to enhance your education. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students in higher education.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "Workout Volume Tracker",
      type: "Website",
      description:
        "An app that lets you input your workout volume (sets and repetitions) for every muscle group, then check your progress in a modern dashboard.",
      href: "https://github.com/DanielCraciunGitHub/workout-app",
      imageHref: "/images/volume-tracker.png",
    },
    {
      name: "Notes App",
      type: "Website",
      description:
        "A 'Google Keep' inspired Notes App that involves CRUD, reminders, authentication, and so much more.",
      href: "https://github.com/DanielCraciunGitHub/notes-app",
      imageHref: "/images/notes-app.png",
    },
    {
      name: "2D Survival Game",
      type: "Game",
      description:
        "A Unity game in which you battle endless opposition using mystery items.",
      href: "https://github.com/DanielCraciunGitHub/ProgrammingProject",
      imageHref: "/images/programmingProject.png",
    },
  ] satisfies Project[],
  skills: {
    FULLSTACK: ["NextJS", "TypeScript", "SQL", "NOSQL", "APIs", "AWS (Basic)"],
    BACKEND: ["Node", "Express", "Testing (Jest)", "Serverless", "Stripe"],
    FRONTEND: [
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "UI/UX",
      "Tailwind",
    ],
    MISC: [
      "C#",
      "Haskell",
      "Git",
      "SEO",
      "CI/CD (GitHub Actions)",
      "Docker",
      "Bash",
      "Python",
      "Markdown",
    ],
  } satisfies Skills,  
  education: [
    "University of Southampton (BSc Computer Science) Oct 2023 - Jun 2026",
    "Lampton Academy (A-Levels) Sep 2021 - Jun 2023",
    "Lampton Academy (GCSEs) Sep 2019 - Jun 2021",
  ],
  certification: [
    <Link
      key="cs50"
      href="https://certificates.cs50.io/970d88f2-959d-47d1-973a-4966aa814515.pdf"
      className="text-blue-500 underline"
    >
      CS50x
    </Link>,
  ],
} as const

export const eBookConfig = {
  title: "The Ultimate Guide to Next.js",
  description: "Coming Soon...",
} as const

export const blogConfig = {
  title: "Blog",
  description:
    "My personal blog, an information library spanning countless niches.",
  categoryLinks: [
    {
      name: "Software Development",
      href: nameToPath("Software Development"),
    },
    {
      name: "Saas",
      href: nameToPath("Saas"),
    },
    {
      name: "Productivity",
      href: nameToPath("productivity"),
    },
  ] as const satisfies NavItem[],
}

export const writeForUsConfig = {
  title: "Write For Us",
  image: "/images/info-library.png",
  description:
    "Unlock your Potential, Inspire the World. Submit Your Articles Today, And We Will Take Care of The Rest.",
  benefits: [
    "Free Article Review",
    "Unlimited Free Traction",
    "Unlimited Free Advertisement",
    "No Login Required",
    "Loose Content Restriction Policy",
    "InfoLibrary Discord Writer Role",
    "100% Content Ownership",
  ],
  requirements: [
    "Link your Article",
    "Enter your Discord Username",
    "Enter some Optional Details",
    "That's it!",
  ],
}
