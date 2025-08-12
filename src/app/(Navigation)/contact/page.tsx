import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/config";
import ContactForm from "src/app/(Navigation)/contact/ContactForm";

import { staticMetadata } from "@/config/metadata";
import { staticStructuredData } from "@/config/structuredData";
import { SocialLinksArray } from "@/components/SocialLinksArray";

export const metadata: Metadata = {
  ...staticMetadata.contact,
};

export default function page() {
  return (
    <>
      {/* Contact Section */}
      <section className="mt-48 pb-20">
        <h1 className="text-center text-4xl font-bold">Let&apos;s talk</h1>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-lg">
            <ContactForm />

            {/* Social Links */}
            <div className="mt-8 text-center">
              <h3 className="mb-4 text-lg font-medium">Or find me here</h3>
              <div className="flex justify-center gap-4">
                <SocialLinksArray socialLinks={siteConfig.socialLinks} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.contact),
        }}
      />
    </>
  );
}
