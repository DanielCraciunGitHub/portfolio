import { api } from "@/server/client"
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar"

import { getInitials } from "@/lib/utils"

export const UserAvatar = () => {
  const { data: session } = api.authRouter.getSession.useQuery(undefined, {
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
      <div className="text-sm font-semibold">{session?.user.name}</div>
    </div>
  )
}
