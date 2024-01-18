import { Footer } from "./Footer"
import NavBar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex-1 flex justify-center">{children}</main>
      <Footer />
    </>
  )
}
