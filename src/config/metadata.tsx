import { Metadata, Viewport } from "next"
import { danielConfig, siteConfig, eBookConfig } from "@/config"

export const baseMetadata: Metadata = {
  title: {
    default: danielConfig.name,
    template: `%s | ${danielConfig.name}`,
  },
  description: danielConfig.description,
  icons: {
    icon: "/images/daniel.png",
  },
  keywords: [
    ...danielConfig.skills,
    ...danielConfig.education,
    ...danielConfig.certification,
    "Web Development",
    "Programming",
    "Developer",
    "Programmer",
    "Experienced Developer",
    "Blogger",
    "Technology",
    "Frontend",
    "Backend",
  ],
  openGraph: {
    title: {
      default: danielConfig.name,
      template: `%s | ${danielConfig.name}`,
    },
    description: danielConfig.description,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/daniel-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: danielConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: danielConfig.name,
      template: `%s | ${danielConfig.name}`,
    },
    description: danielConfig.description,
    creator: "@craciun_07",
    images: [
      {
        url: `${siteConfig.url}/images/daniel-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: danielConfig.name,
      },
    ],
  },
  creator: danielConfig.name,
  category: "Full-Stack Development",
  applicationName: "My Portfolio",
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
}
export const staticMetadata = {
  ...baseMetadata,
  eBook: {
    title: eBookConfig.title,
    description: eBookConfig.description,
    openGraph: {
      ...baseMetadata.openGraph,
      url: `/ebook`,
      title: eBookConfig.title,
      description: eBookConfig.description,
      images: [
        {
          url: `${siteConfig.url}/images/book-cover.jpg`,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: "Book Cover",
        },
      ],
    },
    twitter: {
      ...baseMetadata.openGraph,
      title: eBookConfig.title,
      description: eBookConfig.description,
      images: [
        {
          url: `${siteConfig.url}/images/book-cover.jpg`,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: "Book Cover",
        },
      ],
    },
  } satisfies Metadata,
  about: {
    title: "About Me",
    description: danielConfig.aboutMe.join(" "),
    openGraph: {
      ...baseMetadata.openGraph,
      url: `/about`,
      title: "About Me",
      description: danielConfig.aboutMe[1],
    },
    twitter: {
      ...baseMetadata.openGraph,
      title: "About Me",
      description: danielConfig.aboutMe[1],
    },
  } satisfies Metadata,
  projects: {
    title: "Projects",
    description: danielConfig.projects
      .map(({ description }) => description)
      .join("|"),
    keywords: [
      ...danielConfig.projects.map(({ name }) => name),
      ...baseMetadata.keywords!,
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      url: `/projects`,
      title: "Projects",
      description: danielConfig.projects.map(({ name }) => name).join("|"),
    },
    twitter: {
      ...baseMetadata.openGraph,
      title: "Projects",
      description: danielConfig.projects.map(({ name }) => name).join("|"),
    },
  } satisfies Metadata,
  contact: {
    title: "Contact Me",
    description: siteConfig.contactMe.join(" "),
    openGraph: {
      ...baseMetadata.openGraph,
      url: `/contact`,
      title: "Contact Me",
      description: siteConfig.contactMe.join(" "),
    },
    twitter: {
      ...baseMetadata.openGraph,
      title: "Contact Me",
      description: siteConfig.contactMe.join(" "),
    },
  } satisfies Metadata,
}
export const baseViewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
  colorScheme: "dark light",
}
