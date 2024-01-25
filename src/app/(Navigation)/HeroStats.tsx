import * as React from "react"
import { siteConfig } from "@/config"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function HeroStats() {
  return (
    <Card className="flex flex-col md:flex-row md:justify-between md:w-full">
      {siteConfig.heroStats.map((heroStat) => {
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
