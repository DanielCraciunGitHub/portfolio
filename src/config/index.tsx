import {
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs";

import { nameToPath } from "../lib/utils";
import { HeroStat, NavItem, Project, SocialLink } from "../types";

export const siteConfig = {
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.danielfullstack.com",
  navLinks: [
    {
      name: "DC",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Write for Us",
      href: "/write_for_us",
    },
    // {
    //   name: "eBook",
    //   href: "/ebook",
    // },
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
      href: "https://discord.gg/C2PXBMqpuV",
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
} as const;

export const danielConfig = {
  name: "Daniel Craciun",
  description: "Full-Stack Web Developer | Medium Blogger",
  aboutMe: [
    `As a web developer and a freelance blogger, I combine my technical skills and creativity to create engaging and user-friendly Websites and Blogs.`,
    `I am currently pursuing a BSc in Computer Science at the University of Southampton, where I learn the fundamentals and best practices of Software Engineering and Web Development.`,
  ],

  heroStats: [
    { "5+": "Large-Scale Projects Completed 🎯" },
    { "6,000+": " Blog Subscribers 🧑‍🤝‍🧑" },
    { "40,000+": "Monthly Blog Reads 📖" },
    { "100+": "Blog Posts Written 📝" },
  ] satisfies HeroStat[],
  projects: [
    {
      name: "My Portfolio",
      type: "Website",
      description:
        "A website that encapsulates my experience as a Web Developer and Blog Writer.",
      href: "https://github.com/DanielCraciunGitHub/portfolio",
      imageHref: "/images/portfolio.png",
    },
    {
      name: "EduMentorMe",
      type: "Website",
      description:
        "A hub of many unique educational features serving a common purpose, and that is to help students excel in their studies.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "create-ndpt-app",
      type: "CLI Tool",
      description:
        "An alternative to 'create-next-app' which provides a production-ready Next.js starter template using: Auth.js, Drizzle ORM + PlanetScale, tRPC, and shadcn/ui.",
      href: "https://github.com/DanielCraciunGitHub/create-ndpt-app",
      imageHref: "/images/create-ndpt-app.png",
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
      type: "Desktop",
      description:
        "A Unity game in which you battle endless opposition using mystery items.",
      href: "https://github.com/DanielCraciunGitHub/ProgrammingProject",
      imageHref: "/images/programmingProject.png",
    },
  ] satisfies Project[],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "NOSQL",
    "Git",
    "SEO",
    "C#",
  ],
  education: ["University of Southampton", "Lampton Academy"],
  certification: ["CS50x"],
} as const;

export const eBookConfig = {
  title: "The Ultimate Guide to Next.js",
  description: "Coming Soon...",
} as const;

export const blogConfig = {
  title: "Info Library",
  description:
    "My personal blog, an information library spanning countless niches.",
  categoryLinks: [
    {
      name: "Web Development",
      emoji: "🌐",
      href: nameToPath("Web Development"),
    },
    {
      name: "Organisation",
      emoji: "📦",
      href: nameToPath("Organisation"),
    },
    {
      name: "Meal Prep",
      emoji: "🍒",
      href: nameToPath("Meal Prep"),
    },
    {
      name: "Self Development",
      emoji: "🧑",
      href: nameToPath("Self Development"),
    },
    {
      name: "Writing",
      emoji: "📝",
      href: nameToPath("Writing"),
    },
  ] satisfies NavItem[],
};

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
};
