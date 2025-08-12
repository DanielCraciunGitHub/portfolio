import Link from "next/link";
import { danielConfig, siteConfig } from "@/config";
import { ExternalLink, Heart, HomeIcon, Mail, MapPin } from "lucide-react";

import { SocialLinksArray } from "@/components/SocialLinksArray";

export const Footer = () => {
  const [, ...navItems] = siteConfig.navLinks;

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-br from-muted/50 via-background to-muted/30">
      {/* Background pattern */}
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />

      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                  <HomeIcon className="size-5 text-white" />
                </div>
                <h3 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent">
                  {danielConfig.name}
                </h3>
              </div>

              <p className="max-w-md leading-relaxed text-muted-foreground">
                {danielConfig.description}. Building digital experiences
                that make a difference.
              </p>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>Southampton, UK</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="size-4" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-2">
                <SocialLinksArray socialLinks={siteConfig.socialLinks} />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="group flex items-center text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span>Privacy Policy</span>
                    <ExternalLink className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <a
                    href="/CV.pdf"
                    download
                    className="group flex items-center text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span>Download CV</span>
                    <ExternalLink className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>
                  © {new Date().getFullYear()} {danielConfig.name}. All
                  rights reserved.
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with great</span>
                <Heart className="size-4 fill-current text-red-500" />
                <span>using Next.js & TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
