import * as React from "react";
import Link from "next/link";
import { danielConfig, siteConfig } from "@/config";

import { fetchFollowersCount } from "@/lib/scrape";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LiveIndicator } from "@/components/LiveIndicator";

export async function HeroStats() {
  const followers = await fetchFollowersCount();
  return (
    <Card className="flex flex-col md:w-full md:flex-row md:justify-between">
      {danielConfig.heroStats.map((heroStat) => {
        const [value, label] = Object.entries(heroStat)[0] as [
          string,
          string,
        ];

        return (
          <CardHeader key={value}>
            <CardTitle className="font-bold">{value}</CardTitle>
            <CardDescription>{label}</CardDescription>
          </CardHeader>
        );
      })}
      <CardHeader>
        <Link
          href={siteConfig.socialLinks[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <CardTitle className="relative flex items-start space-x-0.5 font-bold">
            <div>{followers || "14,007"}</div>
            <LiveIndicator />
          </CardTitle>
        </Link>
        <CardDescription>Blog Followers</CardDescription>
      </CardHeader>
    </Card>
  );
}
