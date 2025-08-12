import { MainNavbar } from "src/components/Navbar/MainNavbar";
import { MobileNavbar } from "src/components/Navbar/MobileNavbar";

export default function NavBar() {
  return (
    <nav>
      <MainNavbar type="1-n-1" />
      <MobileNavbar />
    </nav>
  );
}
