import Link from "next/link";
import {
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs";
import type {
  HeroStat,
  NavItem,
  Project,
  Skills,
  SocialLink,
} from "src/types";

import { nameToPath } from "../lib/utils";

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
      name: "Experience",
      href: "/experience",
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
} as const;

export const danielConfig = {
  name: "Daniel Craciun",
  description: "SaaS Developer | Full-Stack Web Developer",
  yoe: 3,
  aboutMe: [
    `My name is Daniel. I'm a Computer Science student at the University of Southampton with a passion for full-stack development and building SaaS products.`,
    `I have more than 3 years of experience creating full stack web apps, mobile apps, games, and SaaS products. I've built successful products like DevMarket, which has 240+ active users and generates revenue through Stripe.`,
    `I enjoy fitness, self-development, business, nutrition, and travel. I love turning ideas into reality with code.`,
  ],

  heroStats: [
    { "$5,500+": "Made from side projects" },
    { "240+": "Active users on DevMarket" },
    { "8+": "Projects Completed" },
  ] as const satisfies HeroStat[],
  projects: [
    {
      name: "GymSimple",
      type: "Mobile App",
      description:
        "GymSimple is a workout planner and player. We are solving the overhead that comes with bloated feature-rich apps and only including essential features.",
      href: "https://github.com/DanielCraciunGitHub/gymsimple",
      imageHref: "/images/gymsimple.jpg",
    },
    {
      name: "DevMarket",
      type: "SaaS",
      description:
        "DevMarket is a platform connecting people to work on SaaS projects together. I earned $100+ from this product and I have 200+ satisfied users.",
      href: "https://www.devmarket.pro",
      imageHref: "/images/devmarket.png",
      hot: true,
    },
    {
      name: "Blog System",
      type: "Website",
      description:
        "Here you can find my personal blog. The blog includes a blog built from scratch that is loved by thousands of users, reaching 300+ daily readers.",
      href: "https://github.com/DanielCraciunGitHub/portfolio",
      imageHref: "/images/portfolio.png",
      hot: false,
    },
    {
      name: "Next Inject",
      type: "SaaS CLI Tool",
      description:
        "A command line tool designed for Next.js developers that configures essential parts of your app with a single command. I earned $60+ from this product and I have 20+ satisfied users.",
      href: "https://github.com/DanielCraciunGitHub/next-inject/",
      imageHref: "/images/next-inject.png",
      hot: false,
    },
    {
      name: "EduMentorMe",
      type: "SaaS",
      description:
        "This project is a hub of many different features used to enhance your education. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students in higher education.",
      href: "https://github.com/DanielCraciunGitHub/emm",
      imageHref: "/images/emm.png",
    },
    {
      name: "Workout Volume Tracker",
      type: "SaaS",
      description:
        "An app that lets you input your workout volume (sets and repetitions) for every muscle group, then check your progress in a modern dashboard.",
      href: "https://github.com/DanielCraciunGitHub/workout-app",
      imageHref: "/images/volume-tracker.png",
    },
    {
      name: "Notes App",
      type: "SaaS",
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
    FULLSTACK: [
      "NextJS",
      "TypeScript",
      "SQL",
      "NoSQL",
      "AWS",
      "Sentry",
      "Prisma",
      "APIs",
    ],
    FRONTEND: [
      "React",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "UI/UX",
    ],
    BACKEND: [
      "Node.js",
      "Express",
      "Jest",
      "Cypress",
      "Serverless",
      "Stripe",
      "Open Banking APIs",
    ],
    MISC: [
      "Git",
      "CI/CD (GitHub Actions)",
      "Docker",
      "Bash",
      "Python",
      "Markdown",
      "Java",
      "C#",
      "Haskell",
      "SEO",
    ],
  } satisfies Skills,
  education: [
    "University of Southampton - BSc (Hons) Computer Science (Oct 2023 - Jun 2026)",
    "Coursework: Data Structures & Algorithms, Java Programming, Software Modelling, Computer Systems, Machine Learning & AI, Agile Team Software Project, Cloud App Development",
    "Lampton Academy - A-Levels (Sep 2021 - Jun 2023)",
    "Lampton Academy - GCSEs (Sep 2019 - Jun 2021)",
  ],
  certification: [
    <Link
      key="synergix"
      href={`${siteConfig.url}/synergix.pdf`}
      className="text-blue-500 underline"
    >
      Synergix Internship Recommendation Letter
    </Link>,
    <Link
      key="cs50"
      href="https://certificates.cs50.io/970d88f2-959d-47d1-973a-4966aa814515.pdf"
      className="text-blue-500 underline"
    >
      CS50x
    </Link>,
  ],
} as const;

export const eBookConfig = {
  title: "The Ultimate Guide to Next.js",
  description: "Coming Soon...",
} as const;

export const blogConfig = {
  title: "Blog",
  description: "My info library for my learning journey.",
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
