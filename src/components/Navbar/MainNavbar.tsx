import { siteConfig } from "@/config"
import { BsLightningChargeFill } from "react-icons/bs"
import { DarkModeButton } from "src/components/Buttons/DarkModeButton"
import { NavItem } from "src/components/Navbar/NavItem"

// ! Disable this to remove the green separator lines in the navbar.
const divider = true
// ! Enable this to add a darkmode button in the navbar.
const darkModeButton = false

interface MainNavbarProps {
  type?: "1-n-1" | "1-n"
}

export const MainNavbar = ({ type = "1-n" }: MainNavbarProps) => {
  return type === "1-n" ? <Navbar1N /> : <Navbar1N1 />
}

const Navbar1N = () => {
  // ! This will provide a 1-n navbar layout, where n is a variable number of navbar links.
  const [firstLink, ...rest] = siteConfig.navLinks

  return (
    <div className="hidden bg-background lg:flex lg:justify-center lg:p-3">
      <div className="lg:flex lg:w-2/3 lg:justify-between">
        {/* Left side */}
        <div className="flex items-center">
          <NavItem
            key={firstLink.name}
            page={firstLink.href}
            text={firstLink.name}
            className="text-4xl font-extrabold"
            tabIndex={0}
          />
        </div>
        {/* Right side - The rest of the navigation links */}
        <div className={`flex ${divider ? "divide-x-2 divide-primary" : ""}`}>
          {rest.map((item) => (
            <span key={item.name}>
              <NavItem
                page={item.href}
                text={item.name}
                className="mx-2"
                tabIndex={0}
              />
            </span>
          ))}
        </div>
      </div>
      {darkModeButton ? (
        <div className="absolute right-3 top-3">
          <DarkModeButton />
        </div>
      ) : null}
    </div>
  )
}
const Navbar1N1 = () => {
  // ! This will provide a 1-n-1 navbar layout, where n is a variable number of navbar links.
  const [firstLink, ...restLinks] = siteConfig.navLinks
  const lastLink = restLinks.pop()!
  const middleLinks = restLinks

  return (
    <div className="hidden bg-background lg:flex lg:justify-center lg:p-3">
      <div className="md:flex md:w-2/3 md:justify-between">
        <div className="flex items-center">
          <NavItem
            key={firstLink.name}
            page={firstLink.href}
            text={firstLink.name}
            className="text-xl font-bold"
            tabIndex={0}
            icon={<BsLightningChargeFill fill="green" size={20} />}
          />
        </div>
        <div className={`flex ${divider ? "divide-x-2 divide-primary" : ""}`}>
          {middleLinks.map((item) => (
            <span key={item.name}>
              <NavItem
                page={item.href}
                text={item.name}
                className="mx-2"
                tabIndex={0}
              />
            </span>
          ))}
        </div>
        <div className={`flex ${divider ? "divide-x-2 divide-primary" : ""}`}>
          <span key={lastLink.name}>
            <NavItem
              page={lastLink.href}
              text={lastLink.name}
              className="mx-2"
              tabIndex={0}
            />
          </span>
        </div>
      </div>
      <div className="absolute right-3 top-3">
        <DarkModeButton />
      </div>
    </div>
  )
}
