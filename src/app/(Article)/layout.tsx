import { Toaster } from "@/components/ui/toaster";
import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogArticleNavbar returnTo="/blog" />

      <main className="container pt-16 lg:pt-20">{children}</main>
      <Toaster />
    </>
  );
}
