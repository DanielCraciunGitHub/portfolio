import type { Metadata } from "next"
import Script from "next/script"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { ProjectCards } from "@/app/(Navigation)/projects/ProjectCards"

export const metadata: Metadata = {
  ...staticMetadata.projects,
}

export default function page() {
  return (
    <div>
      <ProjectCards />
      <div>
        <Script
          id="WebSite Structured Data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(staticStructuredData.projects),
          }}
        />
      </div>
    </div>
  )
}
