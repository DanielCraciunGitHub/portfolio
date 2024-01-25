import React from "react"

export type NavItem = {
  href: string
} & (
  | {
      name: string
    }
  | {
      icon: React.ReactNode
    }
)
export type SocialLink = {
  href: string
  name: string
  icon: React.ReactNode
}
export type ActionResponse = {
  ok: boolean
  error?: string
  code?: number
}
export type Project = {
  name: string
  type?: "Mobile" | "Website" | "Desktop"
  description?: string
  imageHref: string
  href: string
}
export type HeroStat = Record<string, string>
