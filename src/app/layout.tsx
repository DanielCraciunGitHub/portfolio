import { Metadata } from "next"

import "@/styles/globals.css"

import { Provider } from "@/components/providers"

export const metadata: Metadata = {
  title: "App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider attribute="class" defaultTheme="dark">
          {children}
        </Provider>
      </body>
    </html>
  )
}
