import { Metadata } from "next";

import { ArticleNavbar } from "@/app/(Article)/article/ArticleNavbar";

import BenefitCard from "./BenefitCard";
import { WriteForUsForm } from "./WriteForUsForm";
import { Check, PersonStanding } from "lucide-react";

export const metadata: Metadata = {};

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <>
      <ArticleNavbar />

      <main className="mx-auto mt-24 space-y-4">
        <h1 className="max-w-3xl text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          Write for Us
        </h1>
        <h1 className="text-md text-center tracking-tight text-muted-foreground md:text-lg xl:text-xl">
          Unlock your Potential, Inspire the World
        </h1>
      </main>

      <div className="container mt-12 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:items-stretch md:space-x-6 md:space-y-0 lg:w-1/2">
        <BenefitCard
          key="Benefits"
          title="Benefits"
          icon={<Check className="text-yellow-400" />}
          features={[
            "Free Article Review",
            "Unlimited Free Traction",
            "Unlimited Free Advertisement",
            "Free Backlinks to the Original Article",
            "Loose Content Restriction Policy",
            "Dashboard to Manage your Articles",
            "Moderator in our InfoLibrary Discord",
            "100% Content Ownership",
          ]}
        />
        <BenefitCard
          key="What You Need To Do"
          title="What You Need To Do"
          icon={<PersonStanding className="text-yellow-400" />}
          features={[
            "Send a Link to Your Article",
            "Add some Optional Details",
            "That's it!",
          ]}
        />
      </div>
      <WriteForUsForm />
    </>
  );
};
export default page;
