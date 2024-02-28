import { siteConfig } from "@/config"
import { env } from "@/env.mjs"

import { stripe } from "@/lib/stripe"

import { publicProcedure, router } from "../trpc"

export const paymentRouter = router({
  getStripeUrl: publicProcedure.query(async () => {
    try {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${siteConfig.url}/ebook?purchase=success`,
        cancel_url: `${siteConfig.url}/ebook`,
        payment_method_types: ["card", "paypal"],
        mode: "payment",
        billing_address_collection: "auto",
        line_items: [
          {
            price: env.EBOOK_PRODUCT_ID,
            quantity: 1,
          },
        ],
      })
      return stripeSession.url!
    } catch (error) {
      console.error(error)
    }
  }),
  getEbookPrice: publicProcedure.query(async () => {
    try {
      const priceId = env.EBOOK_PRODUCT_ID // Replace with your actual price ID
      const price = await stripe.prices.retrieve(priceId)

      return (price.unit_amount! / 100).toString()
    } catch (error: any) {
      console.error("Error fetching price:", error.message)
    }
  }),
})
