import { BlogArticleNavbar } from "@/components/Navbar/BlogArticleNavbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogArticleNavbar returnTo="/" />
      <main>{children}</main>
    </>
  );
}
