'use client'
import React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"
import { SignInWithGoogle } from "@/lib/firebase/userController"
import { useAuthContext } from "@/context/AuthProvider"
import { useRouter } from "next/navigation"

const HeroSection = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  const handleLogin = async () => {
    await SignInWithGoogle()
    router.push("/dashboard")
  }
  return (
    <section className="flex flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-[6fr_5fr] gap-6 items-start mt-24">
        <div className="flex flex-col gap-9">
          <h1 className="text-5xl sm:text-6xl font-bold">
            Not Your Average Schedule Application
          </h1>
          <p className="text-muted-foreground text-sm ">
            Escape the monotony of complex class schedules with our app!
            Experience a simplified and personalized approach to managing your
            routines, ensuring a tailored and hassle-free scheduling experience.
            Embrace efficiency with our offline-first design for ultimate
            convenience.
          </p>

          <div className="flex space-x-2">
            <Link
              href="/dashboard"
              onClick={user ? undefined : handleLogin}
              className={buttonVariants({
                size: "lg",
                className:
                  "rounded-xl",
              })}
            >
              Get Started
            </Link>
            <Link
              href="/download"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "secondary",
                }),
                "rounded-xl"
              )}
            >
              Download Now
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[40%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-washedGreen -z-10" />
          <Image
            src={"/assets/Hero.png"}
            alt="Hero img"
            width="450"
            height="800"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
