import { MainNavbar } from "src/components/Navbar/MainNavbar"
import { MobileNavbar } from "src/components/Navbar/MobileNavbar"

export default function NavBar() {
  return (
    // ! TIP: Add the "sticky" class to ensure the navbar persists when you scroll down.
    <nav className="top-0 z-50">
      {/* See the `MainNavbar` component to understand the Navbar layouts more */}
      <MainNavbar type="1-n-1" />
      <MobileNavbar />
    </nav>
  )
}
