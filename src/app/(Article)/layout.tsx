import { Toaster } from "@/components/ui/toaster";

import { WriteForUs } from "../(Writers)/write_for_us/WriteForUs";

import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogArticleNavbar returnTo="/" />

      <WriteForUs />

      <main className="container">{children}</main>
      <Toaster />
    </>
  );
}
