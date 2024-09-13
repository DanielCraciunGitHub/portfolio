import Link from "next/link"
import { siteConfig } from "@/config"
import { BsLightningChargeFill } from "react-icons/bs"

import { NavItem } from "@/components/Navbar/NavItem"

// ! A beautiful mobile friendly footer to start out with.
export const Footer = () => {
  const [firstItem, ...navItems] = siteConfig.navLinks

  return (
    <footer className="z-20 border-t border-muted p-4">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
          <div className="mx-auto w-80 max-w-full space-y-1 text-center md:mx-0 md:text-left">
            <NavItem
              key={firstItem.name}
              page={firstItem.href}
              text={firstItem.name}
              className="text-3xl font-bold"
              tabIndex={0}
              icon={<BsLightningChargeFill size={16} fill="green" />}
            />
            <div className="text-center text-sm text-foreground/50">
              © 2024 Daniel Craciun. All Rights Reserved
            </div>
          </div>
          <div className="-mb-10 mt-10 flex grow flex-wrap text-center md:mt-0 md:pl-24 md:text-left lg:pl-48">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="text-bold text-xl text-muted-foreground">
                Links
              </div>
              <div className="flex flex-col items-center space-y-1 text-center md:items-start">
                {/* // ! navlinks added to config/next-inject.tsx will be rendered here */}
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="flex">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full px-4 pt-4 md:w-1/2 md:pt-0 lg:w-1/3">
              <div className="text-bold text-xl text-muted-foreground">
                Legal
              </div>
              <div className="flex flex-col items-center space-y-1 text-center md:items-start">
                <Link key="/privacy" href="/privacy" className="flex">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
