import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/Footer"
import NavBar from "@/components/Navbar/Navbar"
import { Metadata, Viewport } from "next"
import {baseMetadata, baseViewport} from "@/config/metadata"
export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex-1 flex justify-center">{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}
