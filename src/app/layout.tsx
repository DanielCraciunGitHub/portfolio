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
      <body className="flex min-h-screen flex-col">
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
      </body>
    </html>
  )
}
