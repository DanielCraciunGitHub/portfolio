import Link from "next/link";
import type { SocialLink } from "@/types";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SocialLinkProps extends SocialLink {
  className?: string;
}

export default function SocialLink({
  href,
  icon,
  name,
  className,
}: SocialLinkProps) {
  return (
    <Link
      href={`${href}`}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        buttonVariants({ size: "icon", variant: "outline" }),
        className,
      )}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </Link>
  );
}
