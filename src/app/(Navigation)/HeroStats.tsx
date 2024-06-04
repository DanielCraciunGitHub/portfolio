import * as React from "react"
import { danielConfig } from "@/config"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function HeroStats() {
  return (
    <Card className="flex flex-col md:w-full md:flex-row md:justify-between">
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
