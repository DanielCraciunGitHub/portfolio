import { siteConfig } from "@/config";
import { HomeIcon } from "lucide-react";
import { DarkModeButton } from "src/components/Buttons/DarkModeButton";
import { NavItem } from "src/components/Navbar/NavItem";

interface MainNavbarProps {
  type?: "1-n-1" | "1-n";
}

export const MainNavbar = ({ type = "1-n" }: MainNavbarProps) => {
  return type === "1-n" ? <Navbar1N /> : <Navbar1N1 />;
};

const Navbar1N = () => {
  const [firstLink, ...rest] = siteConfig.navLinks;

  return (
    <div className="fixed inset-x-0 top-0 z-50 hidden border-b border-border/50 bg-background/80 backdrop-blur-md lg:block">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <NavItem
              key={firstLink.name}
              page={firstLink.href}
              text={firstLink.name}
              className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 hover:from-primary/80 hover:to-primary"
              tabIndex={0}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {rest.map((item) => (
              <NavItem
                key={item.name}
                page={item.href}
                text={item.name}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 hover:text-primary hover:before:w-full"
                tabIndex={0}
              />
            ))}
            <div className="ml-4 border-l border-border/50 pl-4">
              <DarkModeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar1N1 = () => {
  const [firstLink, ...restLinks] = siteConfig.navLinks;
  const lastLink = restLinks.pop()!;
  const middleLinks = restLinks;

  return (
    <div className="fixed inset-x-0 top-0 z-50 hidden border-b border-border/50 bg-background/80 backdrop-blur-md lg:block">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <HomeIcon className="size-4 text-white" />
            </div>
            <NavItem
              key={firstLink.name}
              page={firstLink.href}
              text={firstLink.name}
              className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 hover:from-primary/80 hover:to-primary"
              tabIndex={0}
            />
          </div>

          {/* Center Navigation */}
          <div className="flex items-center space-x-1">
            {middleLinks.map((item) => (
              <NavItem
                key={item.name}
                page={item.href}
                text={item.name}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 hover:text-primary hover:before:w-full"
                tabIndex={0}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <NavItem
              key={lastLink.name}
              page={lastLink.href}
              text={lastLink.name}
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:shadow-lg"
              tabIndex={0}
            />
            <DarkModeButton />
          </div>
        </div>
      </div>
    </div>
  );
};
