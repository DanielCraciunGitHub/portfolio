"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { BookOpen, Home } from "lucide-react";

import { useKeybind } from "@/hooks/useKeybind";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import { SocialLinksArray } from "@/components/SocialLinksArray";

interface BlogArticleNavbarProps {
  returnTo: "/blog" | "/";
}

export const BlogArticleNavbar = ({
  returnTo,
}: BlogArticleNavbarProps) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useKeybind(anchorRef, { key: "ArrowLeft" }, () =>
    anchorRef.current?.click()
  );

  const isReturnToBlog = returnTo === "/blog";
  const isArticlePage = isReturnToBlog;

  useEffect(() => {
    if (!isArticlePage) return;

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }

    return undefined;
  }, [lastScrollY, isArticlePage]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md transition-transform duration-300 ${
        isArticlePage && !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Back button */}
          <div className="flex items-center space-x-4">
            {/* Breadcrumb indicator */}
            <div className="hidden items-center space-x-2 text-sm text-muted-foreground md:flex">
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors hover:text-primary"
              >
                <Home className="size-3" />
                Home
              </Link>
              <span>/</span>
              {isReturnToBlog ? (
                <>
                  <Link
                    href="/blog"
                    className="flex items-center gap-1 transition-colors hover:text-primary"
                  >
                    <BookOpen className="size-3" />
                    Blog
                  </Link>
                  <span>/</span>
                  <span className="text-primary">Article</span>
                </>
              ) : (
                <span className="text-primary">Article</span>
              )}
            </div>
          </div>

          {/* Center - Social Links (hidden on small screens) */}
          <div className="hidden items-center lg:flex">
            <SocialLinksArray socialLinks={siteConfig.socialLinks} />
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <div className="border-l border-border/50 pl-3">
              <DarkModeButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile social links - shown on small screens */}
      <div className="block border-t border-border/30 bg-muted/30 lg:hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center">
            <SocialLinksArray socialLinks={siteConfig.socialLinks} />
          </div>
        </div>
      </div>
    </nav>
  );
};
