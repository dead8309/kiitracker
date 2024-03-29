import React from "react"
import HeroSection from "@/components/landing/Hero"
import FeatureSection from "@/components/landing/Features"
import OurProcessSection from "@/components/landing/Process"
import FaqSection from "@/components/landing/Faq"
import DownloadSection from "@/components/landing/Download"


export default function IndexPage() {
  return (
    <div className="container relative flex flex-col gap-20">
      <HeroSection />
      <FeatureSection />
      <OurProcessSection />
      <FaqSection />
      <DownloadSection />
    </div>
  )
}