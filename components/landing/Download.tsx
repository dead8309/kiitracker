import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, DownloadIcon, LucideProps } from "lucide-react"

import { Card, CardContent } from "../ui/card"
import { Section } from "./_ui/section"
import { Button, buttonVariants } from "../ui/button"

const CircleRing = (props: LucideProps) => (
  <svg
    fill="none"
    viewBox="0 0 654 622"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M621.953 310.476C621.953 481.948 482.948 620.953 311.476 620.953C140.005 620.953 1 481.948 1 310.476C1 198.21 60.5865 99.8606 149.859 45.3292"
      stroke="#26F5BD"
      stroke-width="1.43739"
    />
    <path
      d="M307.093 73.7838C437.412 73.7838 543.055 179.428 543.055 309.746C543.055 440.064 437.412 545.708 307.093 545.708C200.923 545.708 111.131 475.589 81.4985 379.134"
      stroke="#26F5BD"
      stroke-width="1.09242"
    />
    <ellipse cx="621.953" cy="302.578" rx="8.5062" ry="8.5062" fill="#26F5BD" />
    <ellipse cx="81.2015" cy="379.134" rx="8.5062" ry="8.5062" fill="#26F5BD" />
  </svg>
)

const DownloadSection = () => {
  return (
    <Section id="download">
      <Card className="w-full h-72 sm:h-80 rounded-3xl">
        <CardContent className="h-full pt-4 pb-0">
          <div className="hidden sm:block relative">
            <Image
              className="absolute -top-16 left-14"
              src="/assets/Phone.png"
              width={220}
              height={640}
              alt="download card"
            />
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:overflow-hidden h-full">
            <div className="hidden sm:block">
              <CircleRing className="h-80 w-80 -mt-2" />
            </div>
            <div className="h-full flex flex-col justify-evenly">
              <h3 className="text-3xl font-semibold">
                Download Our Mobile App to Make it Easier
              </h3>
              <p className="text-sm text-muted-foreground">
                Enhance your experience and stay organized. Get the KIITracker
                app now for seamless class scheduling and personalized routines.
              </p>
              <Link
                href="/download"
                className={buttonVariants({
                  size: 'lg',
                  className:
                    "w-max rounded-xl bg-washed-green/washed-green-500 hover:bg-washed-green/washed-green-500/90",
                })}
              >
                <DownloadIcon className="w-5 h-5 mr-2" />  
                Download
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}

export default DownloadSection
