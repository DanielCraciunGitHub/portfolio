import type React from "react"

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
