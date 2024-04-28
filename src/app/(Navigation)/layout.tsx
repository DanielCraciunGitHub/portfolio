import Script from "next/script"

import { mainStructuredData } from "@/config/structuredData"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/Footer"
import NavBar from "@/components/Navbar/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex-1 flex justify-center">{children}</main>
      <Footer />
      <Toaster />
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainStructuredData),
        }}
      />
    </>
  )
}
