import Link from "next/link";
import Script from "next/script";
import { blogConfig } from "@/config";

import { staticStructuredData } from "@/config/structuredData";
import { NavItem } from "@/components/Navbar/NavItem";

import { WriteForUs } from "./WriteForUs";

export const revalidate = 60;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WriteForUs />
      <section className="mt-4 flex flex-col items-center space-y-4">
        <div className="w-full space-y-2 p-2">
          <Link href="/blog">
            <h1 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl">
              Info <span className="text-primary">Library</span>
            </h1>
          </Link>
          <div className="text-center italic">Free Information Forever</div>
          <CategoryNavbar />
        </div>
        {/* <div>Search</div> */}
        <main className="flex flex-1 justify-center">{children}</main>
      </section>
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.blog),
        }}
      />
    </>
  );
}
const CategoryNavbar = () => {
  return (
    <nav className="flex flex-col space-x-2 rounded border border-muted md:flex-row md:justify-center md:p-2">
      {blogConfig.categoryLinks.map((link) => (
        <NavItem key={link.name} page={`/blog${link.href}`} text={link.name} />
      ))}
    </nav>
  );
};
