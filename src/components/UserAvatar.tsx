import { getInitials } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserAvatar = () => {
  const { data: session } = trpc.authRouter.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={session?.user.image ?? undefined} />
        <AvatarFallback>{getInitials(session?.user.name)}</AvatarFallback>
      </Avatar>
      <div className="font-semibold text-sm">{session?.user.name}</div>
    </div>
  )
}