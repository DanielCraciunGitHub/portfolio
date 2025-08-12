import { siteConfig } from "@/config";
import { HomeIcon, Menu } from "lucide-react";
import { DarkModeButton } from "src/components/Buttons/DarkModeButton";
import { NavItem } from "src/components/Navbar/NavItem";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNavbar() {
  const [mainItem, ...navItems] = siteConfig.navLinks;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <HomeIcon className="h-4 w-4 text-white" />
          </div>
          <NavItem
            key={mainItem.name}
            page={mainItem.href}
            text={mainItem.name}
            className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-bold text-transparent"
          />
        </div>

        {/* Right side with dark mode and menu */}
        <div className="flex items-center space-x-2">
          <DarkModeButton />
          <Sheet>
            <SheetTrigger className="rounded-lg p-2 transition-colors hover:bg-muted">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Mobile Menu</span>
            </SheetTrigger>
            <SheetContent
              className="w-full bg-background/95 backdrop-blur-md"
              side="top"
            >
              <div className="flex flex-col items-center space-y-6 pt-8">
                {navItems.map((item, index) => (
                  <SheetClose key={item.name} asChild>
                    <NavItem
                      page={item.href}
                      text={item.name}
                      className={`rounded-full px-6 py-3 text-lg font-medium transition-all duration-200 ${
                        index === navItems.length - 1
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-muted-foreground hover:bg-muted hover:text-primary"
                      }`}
                    />
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
