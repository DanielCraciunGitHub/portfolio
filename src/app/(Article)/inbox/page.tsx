import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { CommentsData } from "./CommentsData"
import { LikesData } from "./LikesData"
import { WelcomeAdmin } from "./WelcomeAdmin"

interface pageProps {}

const page = async ({}: pageProps) => {
  return (
    <>
      <Suspense>
        <WelcomeAdmin />
      </Suspense>
      <div className="grid md:grid-cols-2 grid-rows-2 md:gap-x-20">
        <div className="space-y-2">
          <Suspense fallback={<Skeleton className="w-full h-30" />}>
            <LikesData />
          </Suspense>
        </div>
        <div className="space-y-2">
          <Suspense fallback={<Skeleton className="w-full h-30" />}>
            <CommentsData />
          </Suspense>
        </div>
      </div>
    </>
  )
}
export default page
