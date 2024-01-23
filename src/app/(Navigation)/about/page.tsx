import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function page() {
  return (
    <section className="flex justify-center items-center">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
        <div className=" lg:col-span-6 lg:flex">
          <Image
            src="/images/about.jpg"
            alt="hero image"
            width={700}
            height={300}
            className="rounded-sm"
            priority
          />
        </div>
        <div className="lg:col-span-6">
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl mb-4">
            About Me
          </h1>
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-muted-foreground">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem
            IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem Ipsum Lorem
            IpsuLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
          </p>
          <Tabs defaultValue="skills" className="list-disc">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
            </TabsList>
            <TabsContent value="skills">
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>SEO</li>
            </TabsContent>
            <TabsContent value="education">
              <li>University of Southampton</li>
              <li>Lampton Academy</li>
            </TabsContent>
            <TabsContent value="certification">
              <li>CS50x</li>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
