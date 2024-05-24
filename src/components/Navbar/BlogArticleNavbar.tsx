"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import { SocialLinksArray } from "@/components/SocialLinksArray";
import { useScrollUp } from "@/hooks/useScrollUp";

interface BlogArticleNavbarProps {
  returnTo: "/blog" | "/";
}

export const BlogArticleNavbar = ({ returnTo }: BlogArticleNavbarProps) => {
  const { scrollY, scrollingUp } = useScrollUp();

  return (
    <nav
      className={`sticky z-50 bg-muted transition duration-300 ease-in-out dark:bg-transparent ${scrollingUp || scrollY === 0 ? "-top-1 translate-y-1" : "invisible"}`}
    >
      <div className="flex justify-center p-6">
        <div className="flex w-full justify-around">
          <div>
            <Link
              href={returnTo}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <FaChevronLeft />
            </Link>
          </div>
          <div className="space-x-2">
            <SocialLinksArray
              socialLinks={[
                "Discord.gg",
                "X.com",
                "Linkedin.com",
                "Medium.com",
              ]}
            />
          </div>
          <div>
            <DarkModeButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
