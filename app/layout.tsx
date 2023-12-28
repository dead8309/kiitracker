import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { AuthContextProvider } from "@/context/AuthProvider"

import { siteConfig } from "@/config/site"
import { fontDmSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-brand/brand-dark font-dm antialiased",
            fontDmSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <div className="relative flex min-h-screen flex-col">
              <AuthContextProvider>
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </AuthContextProvider>
            </div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
