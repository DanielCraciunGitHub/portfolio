import type { WebPage, WithContext } from "schema-dts";
import { danielConfig, siteConfig, writeForUsConfig } from "src/config";
import { baseMetadata } from "src/config/metadata";

export const baseStructuredData: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@id": `${siteConfig.url}/#root`,
  "@type": "WebPage",
  name: "DanielFullStack",
  url: siteConfig.url,
  thumbnailUrl: `${siteConfig.url}/favicon.ico`,
  inLanguage: "en-GB",
  author: {
    "@type": "Person",
    name: danielConfig.name,
  },
  creator: {
    "@type": "Person",
    name: danielConfig.name,
  },
  maintainer: {
    "@type": "Person",
    name: danielConfig.name,
  },
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#entity`,
    name: danielConfig.name,
    homeLocation: {
      "@type": "Country",
      name: "United Kingdom",
    },
    workLocation: {
      "@type": "Country",
      name: "United Kingdom",
    },

    email: siteConfig.email,
    telephone: "+44 738-425-0367",
    jobTitle: "Full-Stack Web Developer",
    disambiguatingDescription: danielConfig.description,
    description: danielConfig.description,
    image: `${siteConfig.url}/daniel.webp`,
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    knowsAbout: baseMetadata.keywords as string[],
    knowsLanguage: ["English", "Romanian", "Italian"],
  },

  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/#breadcrumb`,
    itemListElement: siteConfig.navLinks.map(
      ({ name, href }, position) => ({
        "@type": "ListItem",
        position: position + 1,
        name,
        item: `${siteConfig.url}${href}`,
      })
    ),
  },
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
  },
};

export const staticStructuredData = {
  projects: {
    ...baseStructuredData,
    "@id": `${siteConfig.url}/projects`,
    url: `${siteConfig.url}/projects`,
  },
  ebook: {
    ...baseStructuredData,
    "@id": `${siteConfig.url}/ebook`,
    url: `${siteConfig.url}/ebook`,
  },
  about: {
    ...baseStructuredData,
    "@id": `${siteConfig.url}/about`,
    url: `${siteConfig.url}/about`,
    about: {
      "@type": "Person",
      name: danielConfig.aboutMe.join(" "),
    },
  },
  contact: {
    ...baseStructuredData,
    "@id": `${siteConfig.url}/contact`,
    url: `${siteConfig.url}/contact`,
  },
  blog: {
    ...baseStructuredData,
    "@id": `${siteConfig.url}/blog`,
    url: `${siteConfig.url}/blog`,
    thumbnailUrl: `${siteConfig.url}${writeForUsConfig.image}`,
    name: "Info Library",
    breadcrumb: {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/blog/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "DanielFullStack",
          item: `${siteConfig.url}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Info Library",
          item: `${siteConfig.url}/blog`,
        },
      ],
    },
  },
} satisfies {
  [key: string]: WithContext<WebPage>;
};
