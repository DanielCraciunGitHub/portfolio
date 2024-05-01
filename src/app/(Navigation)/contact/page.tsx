import { Metadata } from "next"
import Script from "next/script"
import { siteConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"

import SocialLink from "../../../components/SocialLink"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  ...staticMetadata.contact,
}
export default function page() {
  return (
    <section className="flex justify-center items-center container">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
        <div className="lg:col-span-5 self-center space-y-6">
          <h1 className="max-w-3xl text-lg font-semibold md:text-2xl xl:text-3xl mb-4">
            Let's Connect
          </h1>
          <div className="text-muted-foreground space-y-4">
            {siteConfig.contactMe.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="space-x-4">
            {siteConfig.socialLinks.map(({ href, icon, name }) => (
              <SocialLink key={href} href={href} name={name} icon={icon} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center lg:col-span-7">
          <ContactForm />
        </div>
      </div>
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
