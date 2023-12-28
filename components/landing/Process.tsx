import React from "react"
import Image from "next/image"

import { Slider } from "../ui/slider"
import { Section } from "./_ui/section"

const processSteps = [
  {
    title: "Login",
    description:
      "Sign in seamlessly with your Google account on our website to start setting your personalized class routine.",
  },
  {
    title: "Set Your Routine",
    description: "Enter your class details using our user friendly dashboard",
  },
  {
    title: "Download App",
    description:
      "Download our app and have your entire routine at your fingertips.",
  },
  {
    title: "Sync Across Devices",
    description:
      "Enjoy the convenience of a unified schedule across all your devices, ensuring a seamless and organized academic journey.",
  },
] as const

const OurProcessSection = () => {
  return (
    <Section id="our-process" title="Our Process">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <Image
          src={"/assets/Hero.png"}
          alt="Hero img"
          width="450"
          height="800"
        />
        <ProcessSteps />
      </div>
    </Section>
  )
}

const ProcessSteps = () => {
  return (
    <div>
      <div className="process-container flex flex-col gap-6">
        {processSteps.map((step, index) => (
          <div key={index}>
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurProcessSection
