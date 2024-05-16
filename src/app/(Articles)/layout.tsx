import Link from "next/link";
import { siteConfig } from "@/config";
import { FaChevronLeft } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import SocialLink from "@/components/SocialLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogNavbar />
      <main>{children}</main>
    </>
  );
}
const BlogNavbar = () => {
  const discord = siteConfig.socialLinks.find(
    (link) => link.name === "Discord.gg",
  )!;

  const medium = siteConfig.socialLinks.find(
    (link) => link.name === "Medium.com",
  )!;

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex justify-center p-6">
        <div className="flex w-full justify-around">
          <div>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <FaChevronLeft />
            </Link>
          </div>
          <div className="space-x-2">
            <SocialLink
              key={discord.href}
              name={discord.name}
              href={discord.href}
              icon={discord.icon}
              className="bg-blue-600 text-white dark:text-white"
            />
            <SocialLink
              key={medium.href}
              name={medium.name}
              href={medium.href}
              icon={medium.icon}
              className="bg-gray-700 text-white dark:text-white"
            />
          </div>

          <DarkModeButton />
        </div>
      </div>
    </nav>
  );
};
