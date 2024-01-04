'use client'
import React, { useState } from "react"
import Link from "next/link"
import { MenuIcon, X } from "lucide-react"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { usePathname } from "next/navigation"

interface MobileNavProps {
  items?: NavItem[]
}

/**
  * Todo maybe modify this in future and merge with user nav button
  */
const MobileNav = ({ items }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
 
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
        >
          {isOpen ? (
            <X className="h-6 w-6" />            
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        showClose={false}
        className="z-30 px-4 mt-16 h-screen w-screen md:w-[400px] transition-transform duration-500 ease-in-out"
        side="top"
      >
        <nav className="flex flex-col items-center h-full py-6 space-y-6 overflow-y-auto transition-all duration-500 ease-in-out">
          {items?.map(
            (item, index) =>
              item.href && (
                <SheetClose key={index} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-6 py-2 text-3xl font-semibold hover:underline hover:underline-offset-4",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
