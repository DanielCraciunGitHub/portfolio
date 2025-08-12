import type { Metadata } from "next";
import Script from "next/script";
import { danielConfig } from "@/config";
import { Briefcase, Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Work Experience | Daniel Craciun - Full Stack Developer",
  description:
    "Explore my professional work experience and career journey as a full-stack developer, including internships, projects, and achievements.",
};

// This would ideally come from a database or CMS
const workExperience = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "Synergix Ltd",
    location: "Remote",
    startDate: "Feb 2025",
    endDate: "Jul 2025",
    description: [
      "Integrated Finexer Open Banking APIs to enable real-time financial data fetching, leveraging Cypress e2e testing to ensure the business logic is robust",
      "Implemented advanced form logic for financial data entry, reducing user input errors and form abandonment rates",
      "Architected a complex Prisma schema with 25+ data models, serving as the backbone for the entire application backend and third-party integrations",
      "Developed comprehensive error handling and validation systems for financial transactions",
      "Collaborated with cross-functional teams to deliver fintech solutions with high reliability and security standards",
    ],
    skills: [
      "Prisma",
      "Fintech",
      "JSON",
      "Cypress",
      "Open Banking APIs",
      "TypeScript",
      "Node.js",
    ],
  },
  {
    id: 2,
    title: "Full Stack SaaS Developer & Technical Writer",
    company: "Self-Employed",
    location: "Remote",
    startDate: "Jan 2023",
    endDate: "Present",
    description: [
      "Built and deployed multiple SaaS applications generating $400+ in revenue",
      "Wrote technical articles on Medium & personal blog generating $5,000+ in revenue",
      "Created DevMarket platform with 240+ active users and subscription model",
      "Developed Next Inject CLI tool serving 20+ developers with automated setup",
      "Implemented secure payment systems using Stripe and subscription management",
      "Managed complete product lifecycle from ideation to deployment and maintenance",
    ],
    skills: ["Next.js", "TypeScript", "Prisma", "Stripe", "Vercel", "SQL"],
  },
  {
    id: 3,
    title: "Computer Science Student",
    company: "University of Southampton",
    location: "Southampton, UK",
    startDate: "Oct 2023",
    endDate: "Jun 2026",
    description: [
      "Pursuing BSc (Hons) Computer Science with focus on software engineering",
      "Studying advanced topics: Data Structures, Algorithms, Machine Learning, Cloud Development",
      "Working on team-based agile software projects with real-world applications",
      "Developing strong foundation in computer systems and software architecture",
      "Maintaining academic excellence while building practical development skills",
    ],
    skills: [
      "Java",
      "Python",
      "Haskell",
      "Machine Learning",
      "Agile",
      "Team Collaboration",
    ],
  },
];

export default function ExperiencePage() {
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
                Work{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                My professional journey and career milestones.
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
              <div className="text-3xl font-bold text-primary">
                {danielConfig.yoe}+
              </div>
              <div className="text-muted-foreground">
                Years of experience
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
              <div className="text-3xl font-bold text-primary">350+</div>
              <div className="text-muted-foreground">
                Users across all projects
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground">
                Technologies used
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {workExperience.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Timeline line */}
                  {index !== workExperience.length - 1 && (
                    <div className="absolute left-6 top-16 h-full w-0.5 bg-border md:left-8" />
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-4 top-8 h-4 w-4 rounded-full bg-primary ring-4 ring-background md:left-6" />

                  {/* Content */}
                  <div className="ml-12 md:ml-16">
                    <Card className="transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <Briefcase className="size-5 text-primary" />
                            {experience.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="size-4" />
                            {experience.startDate} - {experience.endDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="font-medium">
                            {experience.company}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {experience.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {experience.description.map(
                            (point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                <span className="text-muted-foreground">
                                  {point}
                                </span>
                              </li>
                            )
                          )}
                        </ul>

                        <div className="pt-4">
                          <h4 className="mb-2 text-sm font-medium">
                            Technologies & Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Script
        id="Experience Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Daniel Craciun",
            jobTitle: "Full Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "University of Southampton",
            },
          }),
        }}
      />
    </>
  );
}
