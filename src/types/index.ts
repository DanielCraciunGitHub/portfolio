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
export type ActionResponse = {
  ok: boolean
  error?: string
  code?: number
}
