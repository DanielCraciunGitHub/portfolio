import { DarkModeButton } from "@/components/DarkModeButton"

export const Footer = () => (
  <footer className="p-4 z-20">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full flex-col space-y-3">
        <div className="flex justify-end">
          <DarkModeButton />
        </div>

        <span className="text-sm text-foreground/50 text-end">
          © 2024 Daniel Craciun. All Rights Reserved
        </span>
      </div>
    </div>
  </footer>
)
