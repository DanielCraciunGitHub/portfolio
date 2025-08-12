"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { BookOpen, Home, Menu } from "lucide-react";

import { useKeybind } from "@/hooks/useKeybind";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import { NavItem } from "@/components/Navbar/NavItem";
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
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Back button */}
            <div className="flex items-center space-x-4">
              {/* Breadcrumb indicator */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
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

            {/* Center - Social Links */}
            <div className="flex items-center">
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
      </div>

      {/* Mobile Navigation */}
      <div className="block lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Back button and breadcrumb */}
            <div className="flex items-center space-x-3">
              <Link
                ref={anchorRef}
                href={returnTo}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="size-4" />
                {isReturnToBlog ? "Blog" : "Home"}
              </Link>
            </div>

            {/* Right side - Dark mode and menu */}
            <div className="flex items-center space-x-2">
              <DarkModeButton />
              <Sheet>
                <SheetTrigger className="rounded-lg p-2 transition-colors hover:bg-muted">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Mobile Menu</span>
                </SheetTrigger>
                <SheetContent
                  className="w-full bg-background/95 backdrop-blur-md"
                  side="top"
                >
                  <div className="flex flex-col items-center space-y-6 pt-8">
                    {siteConfig.navLinks.slice(1).map((item, index) => (
                      <SheetClose key={item.name} asChild>
                        <NavItem
                          page={item.href}
                          text={item.name}
                          className={`rounded-full px-6 py-3 text-lg font-medium transition-all duration-200 ${
                            index === siteConfig.navLinks.length - 2
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "text-muted-foreground hover:bg-muted hover:text-primary"
                          }`}
                        />
                      </SheetClose>
                    ))}
                    <div className="mt-6 border-t border-border/30 pt-6">
                      <SocialLinksArray
                        socialLinks={siteConfig.socialLinks}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
