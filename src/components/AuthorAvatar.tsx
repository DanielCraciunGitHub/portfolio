import { getInitials } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const AuthorAvatar = ({
  name,
  avatar,
}: {
  name: string
  avatar: string
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="text-muted-foreground text-xs italic">Written by:</div>
        <div className="font-semibold text-sm italic">{name}</div>
      </div>
    </div>
  )
}
