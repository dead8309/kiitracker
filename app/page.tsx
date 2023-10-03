"use client"

import React, { useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthProvider"
import {
  UserCredential,
  browserLocalPersistence,
  getRedirectResult,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth"
import { Loader2 } from "lucide-react"

import { auth, googleAuthProvider } from "@/lib/firebase"
import { SignInWithGoogle, addUserToFireStore } from "@/lib/firebase/userController"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"


export default function IndexPage() {
  const { authenticated } = useAuthContext()
  const router = useRouter()
  const handleSignIn = async () => {
    await SignInWithGoogle(() => {
      redirect("/dashboard")
    })
  }
  useEffect(() => {
    if (authenticated) {
      redirect("/dashboard")
    }
  }, [])
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome to KIITracker 🔥!</CardTitle>
            <CardDescription>
              KIITracker is a convenient schedule tracking app tailored for KIIT University students.  Get started
            by loggin in below!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignIn}>
              <Icons.google className="mr-2 h-6 w-6" />
              Sign In With Google
            </Button>
          </CardContent>
        </Card>
        <p className="w-[350px] text-xs font-normal p-4">
          By signing in, you agree to our{" "} 
          <a className="underline" href={siteConfig.privacyPolicy}>Privacy Policy</a> and{" "}<br />
          <a className="underline" href={siteConfig.termsAndConditions}>Terms of Service</a>.
        </p>
    </div>
  )
}
