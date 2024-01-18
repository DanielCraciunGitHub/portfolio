import { siteConfig } from "@/config"

import { NavItem } from "./NavItem"

export const MainNavbar = () => {
  const [firstLink, ...restLinks] = siteConfig.navLinks

  return (
    <div className="hidden md:flex md:justify-center md:p-6">
      <div className="md:flex md:justify-between md:w-2/3">
        <div>
          <NavItem
            key={firstLink.name}
            page={firstLink.href}
            text={firstLink.name}
            className="text-4xl"
          />
        </div>
        <div>
          {restLinks.map((item) => (
            <NavItem key={item.name} page={item.href} text={item.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
