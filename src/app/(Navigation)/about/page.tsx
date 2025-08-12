import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { danielConfig } from "@/config";
import {
  Award,
  Code2,
  Database,
  Globe,
  GraduationCap,
  Heart,
  Zap,
} from "lucide-react";

import { staticMetadata } from "@/config/metadata";
import { staticStructuredData } from "@/config/structuredData";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const metadata: Metadata = {
  ...staticMetadata.about,
};

const skillIcons = {
  FULLSTACK: <Globe className="size-5" />,
  BACKEND: <Database className="size-5" />,
  FRONTEND: <Code2 className="size-5" />,
  MISC: <Zap className="size-5" />,
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
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  A bit about me
                </h1>

                <div className="space-y-4 text-lg text-muted-foreground md:text-xl">
                  {danielConfig.aboutMe.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
                <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-background/90 to-background/50 p-8 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/images/about.png"
                    alt="About Daniel - Full Stack Developer"
                    width={500}
                    height={400}
                    className="h-auto w-full rounded-2xl shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="skills" className="w-full">
              <div className="mb-12 flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-4 lg:max-w-lg">
                  <TabsTrigger
                    value="skills"
                    className="flex items-center gap-2"
                  >
                    <Code2 className="size-4" />
                    <span className="hidden sm:inline">Skills</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="flex items-center gap-2"
                  >
                    <GraduationCap className="size-4" />
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="certification"
                    className="flex items-center gap-2"
                  >
                    <Award className="size-4" />
                    <span className="hidden sm:inline">Certs</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="interests"
                    className="flex items-center gap-2"
                  >
                    <Heart className="size-4" />
                    <span className="hidden sm:inline">Interests</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="skills" className="space-y-8">
                <div className="text-center">
                  <h2 className="mb-4 text-3xl font-bold">
                    What I am good at
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(danielConfig.skills).map(
                    ([category, skillsList]) => (
                      <Card
                        key={category}
                        className="border-2 transition-colors hover:border-primary/50"
                      >
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-3 text-lg">
                            {
                              skillIcons[
                                category as keyof typeof skillIcons
                              ]
                            }
                            {category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {skillsList.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="mb-2 mr-2"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-8">
                <div className="text-center">
                  <h2 className="mb-4 text-3xl font-bold">Education</h2>
                </div>
                <div className="space-y-4">
                  {danielConfig.education.map((institution, index) => (
                    <Card
                      key={index}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="size-5 text-primary" />
                          <p className="text-lg font-medium">
                            {institution}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certification" className="space-y-8">
                <div className="text-center">
                  <h2 className="mb-4 text-3xl font-bold">
                    Certifications
                  </h2>
                </div>
                <div className="space-y-4">
                  {danielConfig.certification.map((certificate, index) => (
                    <Card
                      key={index}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Award className="size-5 text-primary" />
                          <div className="text-lg font-medium">
                            {certificate}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="interests" className="space-y-8">
                <div className="text-center">
                  <h2 className="mb-4 text-3xl font-bold">
                    What I do in my free time
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Fitness",
                    "Self Improvement",
                    "Business",
                    "Nutrition",
                    "Travel",
                  ].map((interest) => (
                    <Card
                      key={interest}
                      className="text-center transition-shadow hover:shadow-lg"
                    >
                      <CardContent className="pt-6">
                        <Heart className="mx-auto mb-3 size-8 text-primary" />
                        <p className="text-lg font-medium">{interest}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.about),
        }}
      />
    </>
  );
}
