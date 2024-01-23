import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { HeroStats } from "./HeroStats"

export default async function Home() {
  return (
    <section className="container flex flex-col justify-center">
      <div className="flex justify-center mt-4">
        <HeroStats />
      </div>
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
        <div className=" place-self-center lg:col-span-7">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl xl:text-7xl mb-4 text-primary">
            Daniel Craciun
          </h1>
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl font-mono">
            Full-Stack Web Developer | Medium Blogger
          </p>
          <div className="space-x-5 flex">
            <Button className="dark:text-foreground" asChild>
              <Link href="/contact">Connect With Me</Link>
            </Button>
            <Button className="dark:text-foreground" variant="link" asChild>
              <a download href="/CV.pdf">
                Download CV
              </a>
            </Button>
          </div>
        </div>
        <div className=" lg:col-span-5 lg:flex">
          <Image
            src="/images/daniel.png"
            alt="hero image"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
    </section>
  )
}
