import Link from "next/link"
import type { SocialLink } from "@/types"

import { buttonVariants } from "@/components/ui/button"

interface SocialLinkProps extends SocialLink {}

export default function SocialLink({ href, icon, name }: SocialLinkProps) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={buttonVariants({ size: "icon", variant: "outline" })}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </Link>
  )
}
