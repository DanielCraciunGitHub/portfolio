import * as React from "react"
import { danielConfig } from "@/config"

import { fetchFollowersCount } from "@/lib/scrape"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LiveIndicator } from "@/components/LiveIndicator"

export async function HeroStats() {
  const followers = await fetchFollowersCount()
  return (
    <Card className="flex flex-col md:w-full md:flex-row md:justify-between">
      <CardHeader key={followers}>
        <CardTitle className="relative flex items-start space-x-0.5 font-bold">
          <div>{`${followers}`}</div>
          <LiveIndicator />
        </CardTitle>
        <CardDescription>Live Blog Subscribers 🧑‍🤝‍🧑</CardDescription>
      </CardHeader>
      {danielConfig.heroStats.map((heroStat) => {
        const [value, label] = Object.entries(heroStat)[0] as [string, string]

        return (
          <CardHeader key={value}>
            <CardTitle className="font-bold">{value}</CardTitle>
            <CardDescription>{label}</CardDescription>
          </CardHeader>
        )
      })}
    </Card>
  )
}
