import type { Metadata } from "next";
import Script from "next/script";
import { danielConfig } from "@/config";

import { staticMetadata } from "@/config/metadata";
import { staticStructuredData } from "@/config/structuredData";
import { ProjectCards } from "@/app/(Navigation)/projects/ProjectCards";

export const metadata: Metadata = {
  ...staticMetadata.projects,
};

export default function page() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative mt-8 overflow-hidden pb-16 pt-20">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Featured{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Projects
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                A showcase of my passion for building innovative solutions
                and creating meaningful user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">8+</div>
              <div className="text-muted-foreground">Projects done</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">350+</div>
              <div className="text-muted-foreground">
                Users across all projects
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                $5,500+
              </div>
              <div className="text-muted-foreground">
                Side hustle earnings
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {danielConfig.yoe}
              </div>
              <div className="text-muted-foreground">
                Years of experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <ProjectCards />
          </div>
        </div>
      </section>

      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.projects),
        }}
      />
    </>
  );
}
