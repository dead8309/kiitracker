"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthProvider"
import { signOut } from "firebase/auth"

import { auth } from "@/lib/firebase"
import { SignInWithGoogle } from "@/lib/firebase/userController"
import { useCoursesStore } from "@/hooks/useCourses"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button, buttonVariants } from "./ui/button"

export default function UserButton() {
  const { user } = useAuthContext()
  const router = useRouter()
  const handleLogin = async () => {
    await SignInWithGoogle()
    router.push("/dashboard")
  }
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.photoURL as string}
              alt={user?.email as string}
            />
            <AvatarFallback>{user?.displayName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut(auth)
            useCoursesStore.getState().reset()
          }}
        >
          Log out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      onClick={handleLogin}
      size='lg'
      className="bg-washed-green/washed-green-500 hover:bg-washed-green/washed-green-500/90 rounded-xl"
    >
      Sign In
    </Button>
  )
}
