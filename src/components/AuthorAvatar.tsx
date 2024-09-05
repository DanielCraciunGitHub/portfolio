import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar"

import { getInitials } from "@/lib/utils"

export const AuthorAvatar = ({
  name,
  avatar,
  social,
}: {
  name: string
  avatar?: string
  social?: string
}): JSX.Element => {
  return (
    <Link href={social ?? "#"} className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={avatar} />

        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="text-xs italic text-muted-foreground">Written by:</div>
        <div className="text-sm font-semibold italic">{name}</div>
      </div>
    </Link>
  )
}
