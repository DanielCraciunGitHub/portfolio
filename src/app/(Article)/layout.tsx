import { Toaster } from "@/components/ui/toaster";

import { WriteForUs } from "../(Articles)/blog/WriteForUs";
import { ArticleNavbar } from "./article/ArticleNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleNavbar />

      <WriteForUs />

      <main className="container">{children}</main>
      <Toaster />
    </>
  );
}
