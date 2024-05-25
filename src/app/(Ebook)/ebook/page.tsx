import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { eBookConfig } from "@/config";

import { staticMetadata } from "@/config/metadata";
import { staticStructuredData } from "@/config/structuredData";
import { serverClient } from "@/server/serverClient";

import StripeButton from "./StripeButton";

export const metadata: Metadata = {
  ...staticMetadata.eBook,
};

export const dynamic = "force-dynamic";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return searchParams?.purchase === "success" ? (
    <section className="container mx-auto flex flex-col justify-center space-y-6">
      <h1 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl">
        <span className="text-primary">Thank you</span> for your purchase!
      </h1>
      <p className="sm:text-md text-center text-muted-foreground md:text-lg lg:text-xl">
        Check your inbox for the PDF and EPUB files.
      </p>
    </section>
  ) : (
    <section className="flex flex-col items-center justify-center">
      <div className="z-10 mx-auto grid max-w-screen-2xl space-y-10 px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:space-y-0 lg:py-16 xl:gap-32">
        <div className="place-self-center lg:col-span-5">
          <Image
            priority
            src="/images/book-cover.jpg"
            alt="Book cover"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-4 place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl">
            {eBookConfig.title}
          </h1>
          <p className="sm:text-md mb-6 max-w-3xl text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
            {eBookConfig.description}
          </p>

          {/* <div className="flex flex-col items-center space-y-4 pt-4">
            <EbookPrice />
            <StripeButton className="w-1/2 text-foreground" name="Buy Now" />
          </div> */}
        </div>
      </div>
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(staticStructuredData.ebook),
        }}
      />
    </section>
  );
}
async function EbookPrice() {
  const eBookPrice = await serverClient.paymentRouter.getEbookPrice();
  return (
    <div className="flex flex-col">
      <span className="text-center text-4xl text-red-500 line-through">
        ${Number(eBookPrice) * 2}
      </span>
      <span className="text-center text-4xl text-primary">${eBookPrice}</span>
    </div>
  );
}
