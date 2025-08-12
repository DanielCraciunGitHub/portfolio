import * as React from "react";
import Link from "next/link";
import { danielConfig, siteConfig } from "@/config";
import { Briefcase, TrendingUp, Users } from "lucide-react";

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

  const statsWithIcons = [
    {
      ...danielConfig.heroStats[0],
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-500",
    },
    {
      ...danielConfig.heroStats[1],
      icon: <Briefcase className="h-6 w-6" />,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      {statsWithIcons.map((heroStat) => {
        const [value, label] = Object.entries(heroStat)[0] as [
          string,
          string,
        ];

        return (
          <Card
            key={value}
            className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardHeader className="relative pb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`rounded-lg bg-primary/10 p-2 ${heroStat.color}`}
                >
                  {heroStat.icon}
                </div>
                <div>
                  <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold">
                    {value}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-muted-foreground">
                    {label}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        );
      })}

      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardHeader className="relative pb-6">
          <Link
            href={siteConfig.socialLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-primary/10 p-2 text-purple-500">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold">
                  <span>{followers || "14,007"}</span>
                  <LiveIndicator />
                </CardTitle>
                <CardDescription className="text-base font-medium text-muted-foreground">
                  Blog Followers
                </CardDescription>
              </div>
            </div>
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
}
