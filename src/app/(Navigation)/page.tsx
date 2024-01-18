import Image from "next/image"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <section className="flex justify-center items-center">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12">
        <div className=" place-self-center lg:col-span-7">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl mb-4 text-primary">
            Daniel Craciun
          </h1>
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-muted-foreground">
            Full-Stack Web Developer | Medium Blogger
          </p>

          <Button className="dark:text-foreground">Download CV</Button>
        </div>
        <div className="hidden lg:col-span-5 lg:flex">
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
