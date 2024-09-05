import type { Metadata } from "next"
import Script from "next/script"
import { siteConfig } from "@/config"
import ContactForm from "src/app/(Navigation)/contact/ContactForm"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { SocialLinksArray } from "@/components/SocialLinksArray"

export const metadata: Metadata = {
  ...staticMetadata.contact,
}
export default function page() {
  return (
    <section className="flex items-center lg:ml-48">
      <section className="mx-auto my-24 flex max-w-7xl flex-col items-center justify-center gap-16 p-8 lg:flex-row lg:gap-20 lg:py-20">
        <div className="flex w-full flex-col space-y-10 lg:items-start">
          <h1 className="mb-4 max-w-3xl text-lg font-semibold md:text-2xl xl:text-3xl">
            Let&apos;s Connect
          </h1>
          <div className="space-y-4 text-muted-foreground">
            {siteConfig.contactMe.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="space-x-4">
            <SocialLinksArray
              socialLinks={[
                "Discord.gg",
                "X.com",
                "Linkedin.com",
                "Medium.com",
                "Github.com",
              ]}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <ContactForm />
        </div>
      </section>
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.contact),
        }}
      />
    </section>
  )
}
