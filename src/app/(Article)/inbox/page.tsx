import { CommentsData } from "./CommentsData"
import { LikesData } from "./LikesData"
import { WelcomeAdmin } from "./WelcomeAdmin"

interface pageProps {}

const page = async ({}: pageProps) => {
  return (
    <>
      <WelcomeAdmin />
      <div className="grid md:grid-cols-2 grid-rows-2 md:gap-x-20">
        <div className="space-y-2">
          <LikesData />
        </div>
        <div className="space-y-2">
          <CommentsData />
        </div>
      </div>
    </>
  )
}
export default page
