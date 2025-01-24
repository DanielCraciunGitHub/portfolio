import type { Metadata } from "next"
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
    <div className="z-10 mx-auto grid max-w-screen-2xl space-y-10 px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:space-y-0 lg:py-16 xl:gap-32">
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
        <h1 className="mb-4 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
          A bit about me
        </h1>
        <div className="mb-6 max-w-2xl space-y-4 text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
          {danielConfig.aboutMe.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Tabs defaultValue="skills" className="list-disc">
          <TabsList>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
          </TabsList>
          <TabsContent
            value="skills"
            className="flex flex-col space-y-4 xl:flex-row xl:space-x-8 xl:space-y-0"
          >
            {Object.entries(danielConfig.skills).map(
              ([category, skillsList]) => (
                <div key={category}>
                  <h1 className="text-2xl font-bold">{category}</h1>
                  <ul className="list-inside list-disc">
                    {skillsList.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </TabsContent>
          <TabsContent value="education">
            {danielConfig.education.map((institution) => (
              <li key={institution}>{institution}</li>
            ))}
          </TabsContent>
          <TabsContent value="certification">
            {danielConfig.certification.map((certificate) => (
              <li key={certificate.key}>{certificate}</li>
            ))}
          </TabsContent>
          <TabsContent value="interests">
            <ul className="list-inside list-disc">
              <li>Productivity</li>
              <li>Fitness</li>
              <li>Nutrition & Cooking</li>
              <li>Reading</li>
            </ul>
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
