import Link from "next/link";
import Script from "next/script";
import { blogConfig } from "@/config";

import { staticStructuredData } from "@/config/structuredData";
import { NavItem } from "@/components/Navbar/NavItem";

import { WriteForUs } from "../../(Writers)/write_for_us/WriteForUs";

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
        <div className="w-full space-y-6 p-2">
          <Link href={`/blog`}>
            <h1 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl">
              Info <span className="text-primary">Library</span>
            </h1>
          </Link>
          <CategoryNavbar />
        </div>
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
    <nav className="flex flex-col divide-y-2 divide-primary rounded bg-muted md:flex-row md:justify-center md:divide-x-2 md:divide-y-0 md:p-2">
      {blogConfig.categoryLinks.map((link) => (
        <div key={link.name}>
          <NavItem
            page={`/blog${link.href}`}
            text={link.name}
            className="ml-2 mr-2 flex self-center"
          />
        </div>
      ))}
    </nav>
  );
};
