import { Metadata } from "next"
import Image from "next/image"
import { eBookConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { serverClient } from "@/app/_trpc/serverClient"

import StripeButton from "./StripeButton"

export const metadata: Metadata = {
  ...staticMetadata.eBook,
}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const eBookPrice = await serverClient.paymentRouter.getEbookPrice()
  return searchParams?.purchase === "success" ? (
    <section className="mx-auto space-y-6 container flex flex-col justify-center">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl text-center">
        <span className="text-primary">Thank you</span> for your purchase!
      </h1>
      <p className="sm:text-md md:text-lg lg:text-xl text-muted-foreground text-center">
        Check your inbox for the PDF and EPUB files.
      </p>
    </section>
  ) : (
    <section className="flex flex-col justify-center items-center">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
        <div className="lg:col-span-5 place-self-center">
          <Image
            priority
            src="/images/book-cover.jpg"
            alt="Book cover"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col lg:col-span-7 space-y-4 place-self-center">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl mb-4">
            {eBookConfig.title}
          </h1>
          <p className="max-w-3xl mb-6 lg:mb-8 sm:text-md md:text-lg lg:text-xl text-muted-foreground">
            {eBookConfig.description}
          </p>
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="flex flex-col">
              <span className="text-center text-4xl text-red-500 line-through">
                {Number(eBookPrice) * 2}
              </span>
              <span className="text-center text-4xl text-primary">
                {eBookPrice}
              </span>
            </div>
            <StripeButton className="w-1/2 text-foreground" name="Buy Now" />
          </div>
        </div>
      </div>
    </section>
  )
}
