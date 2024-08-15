import * as React from "react"
import { danielConfig } from "@/config"

import { fetchFollowersCount } from "@/lib/scrape"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function HeroStats() {
  const followers = await fetchFollowersCount()
  return (
    <Card className="flex flex-col md:w-full md:flex-row md:justify-between">
      <CardHeader key={followers}>
        <CardTitle className="font-bold">{`${followers}`}</CardTitle>
        <CardDescription>Live Blog Subscribers 🧑‍🤝‍🧑</CardDescription>
      </CardHeader>
      {danielConfig.heroStats.map((heroStat) => {
        const [value, label]: [string, string] = Object.entries(heroStat)[0]

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
