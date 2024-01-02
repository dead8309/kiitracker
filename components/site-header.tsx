import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

import UserButton from "./user-button"
import MobileNav from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="bg-background/95 sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-2">
            <UserButton />
            <div className="md:hidden">
              <MobileNav items={siteConfig.mainNav}/>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
