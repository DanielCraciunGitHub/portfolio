import type React from "react";
import type { StaticImageData } from "next/image";

export type NavItem = {
  href: string;
  emoji?: string;
} & (
  | {
      name: string;
    }
  | {
      icon: React.ReactNode;
    }
);
export type SocialLink = {
  href: string;
  name: string;
  icon: React.ReactNode;
};
export type ActionResponse = {
  ok: boolean;
  error?: string;
  code?: number;
};
export type Project = {
  name: string;
  type?: "Mobile" | "Website" | "Desktop" | string;
  description?: string;
  imageHref: string | StaticImageData;
  href: string;
  hot?: boolean;
  startDate: string;
  endDate?: string; // Optional - if not provided, defaults to "Present"
};
export type HeroStat = Record<string, string>;

export type Skills = Record<string, string[]>;
