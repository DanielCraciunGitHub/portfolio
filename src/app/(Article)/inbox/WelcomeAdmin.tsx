import { unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { serverClient } from "@/server/serverClient"

interface WelcomeAdminProps {}

export const WelcomeAdmin = async ({}: WelcomeAdminProps) => {
  noStore()
  const userRole = await serverClient.authRouter.getRole()

  if (userRole !== "ADMIN") redirect("/")

  return (
    <div className="flex justify-center pb-2 pt-2 text-3xl font-bold md:text-4xl">
      Welcome {userRole}
    </div>
  )
}
