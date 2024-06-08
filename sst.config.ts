import { Certificate } from "aws-cdk-lib/aws-certificatemanager"
import { SSTConfig } from "sst"
import { NextjsSite } from "sst/constructs"

export default {
  config(_input) {
    return {
      name: "portfolio",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
          UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,

          NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL!,
          NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD!,

          RESEND_API_KEY: process.env.RESEND_API_KEY!,

          DISCORD_WEBHOOK_URL_INBOX: process.env.DISCORD_WEBHOOK_URL_INBOX!,
          DISCORD_WEBHOOK_URL_WRITER: process.env.DISCORD_WEBHOOK_URL_WRITER!,
          DISCORD_WEBHOOK_URL_PUBLISH: process.env.DISCORD_WEBHOOK_URL_PUBLISH!,

          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
          STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY!,
          STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
          EBOOK_PRODUCT_ID: process.env.EBOOK_PRODUCT_ID!,

          AUTH_SECRET: process.env.AUTH_SECRET!,
          AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
          AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,

          TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN!,
          TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL!,

          NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY!,

          NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID:
            process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
          NEXT_PUBLIC_SANITY_STUDIO_DATASET:
            process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,

          SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID!,
          SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET!,

          AWS_ARN_CERTIFICATE: process.env.AWS_ARN_CERTIFICATE!,
        },
        customDomain: {
          domainName: "www.danielfullstack.com",
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              "MyCert",
              process.env.AWS_ARN_CERTIFICATE!
            ),
          },
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
