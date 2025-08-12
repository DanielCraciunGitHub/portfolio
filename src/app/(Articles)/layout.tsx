import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogArticleNavbar returnTo="/" />
      <main className="pt-24 lg:pt-16">{children}</main>
    </>
  );
}
