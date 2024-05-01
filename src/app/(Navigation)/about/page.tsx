import { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import { danielConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  ...staticMetadata.about,
}

export default function page() {
  return (
    <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
      <div className=" lg:col-span-6">
        <Image
          src="/images/about.png"
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
        <div className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-muted-foreground space-y-4">
          {danielConfig.aboutMe.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Tabs defaultValue="skills" className="list-disc">
          <TabsList>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            {danielConfig.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </TabsContent>
          <TabsContent value="education">
            {danielConfig.education.map((institution) => (
              <li key={institution}>{institution}</li>
            ))}
          </TabsContent>
          <TabsContent value="certification">
            {danielConfig.certification.map((certificate) => (
              <li key={certificate}>{certificate}</li>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.about),
        }}
      />
    </div>
  )
}
