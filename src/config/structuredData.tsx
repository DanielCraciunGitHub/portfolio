import type { WebPage, WithContext } from "schema-dts"

import { danielConfig, siteConfig } from "."
import { baseMetadata } from "./metadata"

export const mainStructuredData: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DanielFullStack",
  url: siteConfig.url,
  thumbnailUrl: `${siteConfig.url}/daniel.png`,
  inLanguage: "en-GB",
  about: {
    "@type": "Article",
    name: danielConfig.aboutMe.join(" "),
  },
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
  countryOfOrigin: "Romania",
  mainEntity: {
    "@type": "Person",
    "@id": siteConfig.url,
    name: danielConfig.name,
    homeLocation: {
      "@type": "Country",
      name: "United Kingdom",
    },
    workLocation: {
      "@type": "Country",
      name: "United Kingdom",
    },

    email: "danielcracbusiness@gmail.com",
    telephone: "+44 738-425-0367",
    jobTitle: "Full-Stack Web Developer",
    disambiguatingDescription: danielConfig.description,
    description: danielConfig.description,
    image: `${siteConfig.url}/daniel.png`,
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    knowsAbout: baseMetadata.keywords as string[],
    knowsLanguage: ["English", "Romanian", "Italian"],
  },

  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/#breadcrumb`,
    itemListElement: siteConfig.navLinks.map(({ name, href }, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name,
      item: `${siteConfig.url}${href}`,
    })),
  },
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
  },
}
