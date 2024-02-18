import { Metadata, Viewport } from "next"

import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { Provider } from "@/components/providers"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <NextTopLoader showSpinner={false} color="green" />
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
        <Analytics />
        <ScrollToTopButton />
      </body>
    </html>
  )
}
