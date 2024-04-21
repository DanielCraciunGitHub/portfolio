import { CommentsData } from "./CommentsData"
import { LikesData } from "./LikesData"
import { WelcomeAdmin } from "./WelcomeAdmin"

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <>
      <WelcomeAdmin />
      <div className="grid md:grid-cols-2 grid-rows-2 md:gap-x-20 md:space-y-0 space-y-2">
        <CommentsData />
        <LikesData />
      </div>
    </>
  )
}
export default page
