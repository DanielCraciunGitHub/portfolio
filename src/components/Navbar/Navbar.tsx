import { MainNavbar } from "src/components/Navbar/MainNavbar"
import { MobileNavbar } from "src/components/Navbar/MobileNavbar"

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-muted">
      <MainNavbar />
      <MobileNavbar />
    </nav>
  )
}
