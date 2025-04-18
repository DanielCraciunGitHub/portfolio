import { siteConfig } from "@/config"
import { Menu } from "lucide-react"
import { NavItem } from "src/components/Navbar/NavItem"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNavbar() {
  const [mainItem, ...navItems] = siteConfig.navLinks

  return (
    <div className="flex flex-col items-center py-2 md:hidden">
      <NavItem
        key={mainItem.name}
        page={mainItem.href}
        text={mainItem.name}
        className="text-4xl"
      />
      <Sheet>
        <SheetTitle className="hidden">Menu</SheetTitle>
        <div className="flex w-full justify-end">
          <SheetTrigger className="p-2">
            <Menu />
            <span className="sr-only">Open Mobile Menu</span>
          </SheetTrigger>
        </div>
        <SheetContent className="flex flex-col items-center" side="top">
          <div className="flex w-full flex-col items-center divide-y-2 divide-primary">
            {navItems.map((item) => (
              <div key={item.name} className="w-full">
                <SheetClose asChild>
                  <NavItem
                    page={item.href}
                    text={item.name}
                    className="my-2 flex self-center"
                  />
                </SheetClose>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
