import { Metadata } from "next";

import { ArticleNavbar } from "@/app/(Article)/article/ArticleNavbar";

import BenefitCard from "./BenefitCard";
import { WriteForUsForm } from "./WriteForUsForm";
import { Check, ChevronDown, PersonStanding } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {};

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <>
      <ArticleNavbar />

      <main className="mb-6 mt-24 flex flex-col items-center space-y-4">
        <h1 className="max-w-3xl text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          Write for Us
        </h1>
        <h1 className="text-md text-center tracking-tight text-muted-foreground md:text-lg xl:text-xl">
          Unlock your Potential, Inspire the World
        </h1>
        <div className="container flex w-full flex-col items-center justify-center space-y-4 pb-14 pt-12 md:flex-row md:items-stretch md:space-x-12 md:space-y-0">
          <BenefitCard
            key="Benefits"
            title="Benefits"
            icon={<Check className="text-yellow-400" />}
            features={[
              "Free Article Review",
              "Unlimited Free Traction",
              "Unlimited Free Advertisement",
              "No Login Required",
              "Loose Content Restriction Policy",
              "InfoLibrary Discord Writer Role",
              "100% Content Ownership",
            ]}
          />
          <BenefitCard
            key="What You Need To Do"
            title="What You Need To Do"
            icon={<PersonStanding className="text-yellow-400" />}
            features={[
              "Link your Article",
              "Enter your Discord Username",
              "Enter some Optional Details",
              "That's it!",
            ]}
          />
        </div>
        <div className="flex justify-center">
          <ChevronDown className="size-12 text-yellow-500" />
        </div>
        <WriteForUsForm />
      </main>
      <Toaster />
    </>
  );
};
export default page;
