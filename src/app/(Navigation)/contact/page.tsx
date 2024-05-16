import { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/config";

import { staticMetadata } from "@/config/metadata";
import { staticStructuredData } from "@/config/structuredData";

import SocialLink from "../../../components/SocialLink";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  ...staticMetadata.contact,
};
export default function page() {
  return (
    <section className="container flex items-center justify-center">
      <div className="z-10 mx-auto grid max-w-screen-2xl space-y-10 px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:space-y-0 lg:py-16 xl:gap-32">
        <div className="space-y-6 self-center lg:col-span-5">
          <h1 className="mb-4 max-w-3xl text-lg font-semibold md:text-2xl xl:text-3xl">
            Let's Connect
          </h1>
          <div className="space-y-4 text-muted-foreground">
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
  );
}
