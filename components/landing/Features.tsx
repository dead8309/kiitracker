import React from "react"
import Image from "next/image"
import Link from "next/link"
import { WifiOffIcon } from "lucide-react"

import { buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const FeatureSection = () => {
  return (
    <section id="features" className="flex flex-1">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-[4fr_2fr] gap-5">
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold">
              Seamless Scheduling Anywhere Unleashing the Power of Offline First
              Efficiency
            </h3>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-sm text-muted-foreground">
              Enjoy uninterrupted scheduling with our offline-first design.
              Whether on or off the grid, manage your class routines
              effortlessly anytime, anywhere.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
                className:
                  "w-36 rounded-xl bg-washed-green/washed-green-500 hover:bg-washed-green/washed-green-500/90",
              })}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[3.80fr_2fr_2fr] gap-2">
          <div>
            <Card className="h-[380px] overflow-hidden">
              <CardHeader>
                <WifiOffIcon className="h-6 w-6 stroke-brand/brand-washedGreen" />
                <CardTitle>
                  Keep your class schedule at your fingertips, even offline with
                  the latest technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row items-end justify-between">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      className:
                        "mb-44 sm:mb-56 mr-2 text-xs rounded-xl bg-washed-green/washed-green-500 hover:bg-washed-green/washed-green-500/90",
                    })}
                  >
                    Learn More
                  </Link>
                  <Image
                    className=""
                    src="/assets/feature1.png"
                    width={200}
                    height={600}
                    alt="Feature 1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-[380px] overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle>Cloud Sync</CardTitle>
                <CardDescription>
                  Securely sync your schedule across all your devices through
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src="/assets/feature2.png"
                  className="object-contain"
                  width={720}
                  height={1080}
                  alt="Feature 2"
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-[380px] overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle>User Friendly Interface</CardTitle>
                <CardDescription>
                  Intuitive design for easy scheduling.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  className="object-cover"
                  src="/assets/feature3.png"
                  width={720}
                  height={1080}
                  alt="Feature 3"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeatureSection
