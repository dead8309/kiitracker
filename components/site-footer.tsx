import Link from "next/link"
import { siteConfig } from "@/config/site"

import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"

export function SiteFooter() {
  return (
    <footer className="mt-10 py-4 border-t border-border">
      <div className="container flex flex-col md:items-center md:justify-between gap-4 md:flex-row">
        <div className="flex flex-col">
          <Link href="/">
            <Icons.logo className="w-40" />
          </Link>
          <span className="text-xs text-muted-foreground">
            ©2023 KIITracker All Rights Reserved
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
          {siteConfig.footerLinks.map((link) => (
            <div key={link.title}>
              <h4 className="text-lg font-semibold">{link.title}</h4>
              <div
                key={`${link.title}-container`}
                className="flex flex-col mt-2 -space-y-1"
              >
                {link.links.map((item) => (
                  <a
                    key={`link-${item.name}`}
                    href={item.href}
                    {...(item.external && { target: "_blank" })}
                    rel="noreferrer"
                    className="w-fit text-md text-muted-foreground font-medium hover:underline hover:underline-offset-4"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
