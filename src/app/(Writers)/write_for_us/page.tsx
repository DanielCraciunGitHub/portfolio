import { Metadata } from "next";

import BenefitCard from "./BenefitCard";
import { WriteForUsForm } from "./WriteForUsForm";
import { Check, ChevronDown, PersonStanding } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { staticMetadata } from "@/config/metadata";
import { writeForUsConfig } from "@/config";
import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar";

export const metadata: Metadata = {
  ...staticMetadata.write_for_us,
};

const page = () => {
  return (
    <>
      <BlogArticleNavbar returnTo="/blog" />

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
            features={writeForUsConfig.benefits}
          />
          <BenefitCard
            key="What You Need To Do"
            title="What You Need To Do"
            icon={<PersonStanding className="text-yellow-400" />}
            features={writeForUsConfig.requirements}
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
