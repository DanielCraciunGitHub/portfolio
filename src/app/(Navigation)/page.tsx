import type { Metadata, Viewport } from "next"
import Image from "next/image"
import Link from "next/link"
import { danielConfig } from "@/config"
import { HeroStats } from "src/app/(Navigation)/HeroStats"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { Button } from "@/components/ui/button"
import { ProjectCards } from "@/app/(Navigation)/projects/page"

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
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default async function Home() {
  return (
    <section className="container flex flex-col justify-center">
      <div className="z-10 mx-auto grid max-w-screen-2xl space-y-10 py-8 lg:grid-cols-12 lg:gap-8 lg:space-y-0 lg:py-16 xl:gap-32">
        <div className=" flex flex-col items-center place-self-center lg:col-span-7 lg:items-start">
          <h1 className="mb-4 max-w-3xl text-center text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-start xl:text-7xl">
            {danielConfig.name}
          </h1>
          <p className="mb-6 max-w-2xl text-center font-mono md:text-lg lg:mb-8 lg:text-start lg:text-xl">
            {danielConfig.description}
          </p>
          <div className="flex space-x-5">
            <Button className="dark:text-foreground" asChild tabIndex={0}>
              <Link href="/contact">Contact me</Link>
            </Button>
            <Button
              className="text-foreground"
              variant="link"
              asChild
              tabIndex={0}
            >
              <a download href="/CV.pdf">
                Download CV
              </a>
            </Button>
          </div>
        </div>
        <div className=" lg:col-span-5 lg:flex">
          <Image
            src="/images/daniel.webp"
            alt="hero image"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <HeroStats />
      </div>
      <div className="my-10">
        <ProjectCards />
      </div>
    </section>
  )
}
