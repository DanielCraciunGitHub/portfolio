import * as React from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function HeroStats() {
  return (
    <Card className="flex flex-col md:flex-row md:justify-between md:w-full">
      <CardHeader>
        <CardTitle className="font-bold">10,000</CardTitle>
        <CardDescription>Monthly Blog Readers</CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>10</CardTitle>
        <CardDescription>Full-Stack Projects</CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>1m</CardTitle>
        <CardDescription>Users</CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>100,000</CardTitle>
        <CardDescription>Posts</CardDescription>
      </CardHeader>
    </Card>
  )
}
