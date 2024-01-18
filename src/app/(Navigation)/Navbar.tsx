import { MainNavbar } from "./MainNavbar"
import { MobileNavbar } from "./MobileNavbar"

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-background">
      <MainNavbar />
      <MobileNavbar />
    </nav>
  )
}
