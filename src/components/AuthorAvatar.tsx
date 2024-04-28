import Image from "next/image"

import { getInitials } from "@/lib/utils"

export const AuthorAvatar = ({
  name,
  avatar,
}: {
  name: string
  avatar: string
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={avatar}
        width={40}
        height={40}
        alt={getInitials(name)!}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="text-muted-foreground text-xs italic">Written by:</div>
        <div className="font-semibold text-sm italic">{name}</div>
      </div>
    </div>
  )
}
