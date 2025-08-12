import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { danielConfig } from "@/config";
import { ArrowDown, Code, Sparkles, Zap } from "lucide-react";

import { baseMetadata, baseViewport } from "@/config/metadata";
import { Button } from "@/components/ui/button";
import { ProjectCards } from "@/app/(Navigation)/projects/ProjectCards";

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: "Daniel Craciun" },
  openGraph: {
    ...baseMetadata.openGraph,
    title: { absolute: "Daniel Craciun" },
  },
  twitter: {
    ...baseMetadata.twitter,
    title: { absolute: "Daniel Craciun" },
  },
};
export const viewport: Viewport = {
  ...baseViewport,
};

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />

        <div className="container z-10 mx-auto px-4">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="mb-4 mt-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="mr-2 size-4" />
                  Open for opportunities
                </div>

                <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  <span className="text-foreground">Hi, I&apos;m </span>
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {danielConfig.name.split(" ")[0]}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/85 bg-clip-text text-transparent">
                    {danielConfig.name.split(" ")[1]}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  asChild
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center"
                  >
                    Let&apos;s join forces
                    <Zap className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 px-8 py-6 text-lg transition-all duration-300 hover:bg-primary/5"
                  asChild
                >
                  <a
                    download
                    href="/CV.pdf"
                    className="inline-flex items-center"
                  >
                    <Code className="mr-2 size-5" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
                <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-background/90 to-background/50 p-8 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/images/daniel.webp"
                    alt="Daniel Craciun - Full Stack Developer"
                    width={400}
                    height={400}
                    className="h-auto w-full rounded-2xl shadow-lg"
                    priority
                  />

                  {/* Floating badges */}
                  <div className="absolute -left-4 -top-4 rounded-full border border-border/50 bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold text-primary">
                      Full Stack
                    </span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-full border border-border/50 bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold text-primary">
                      SaaS Dev
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="size-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Here&apos;s some of my recent work & side projects that
              showcase my skills and passion for development.
            </p>
          </div>
          <ProjectCards />
        </div>
      </section>
    </>
  );
}
