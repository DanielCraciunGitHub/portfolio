import { CommentsData } from "src/app/(Article)/inbox/CommentsData";
import { LikesData } from "src/app/(Article)/inbox/LikesData";
import { WelcomeAdmin } from "src/app/(Article)/inbox/WelcomeAdmin";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <>
      <WelcomeAdmin />
      <div className="grid grid-rows-2 space-y-2 md:grid-cols-2 md:gap-x-20 md:space-y-0">
        <CommentsData />
        <LikesData />
      </div>
    </>
  );
};
export default page;
