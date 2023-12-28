import React from "react"
import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Section } from "./_ui/section"

const faqs = [
  {
    question: "What is KIITracker?",
    answer:
      "KIITracker is a user-friendly app for students, streamlining class scheduling and providing seamless offline access to personalized routines.",
  },
  {
    question: "Is KIITracker free?",
    answer: "Yes, KIITracker is entirely free to use for all students.",
  },
  {
    question: "Does KIITracker work offline?",
    answer: "Absolutely. KIITracker is designed with an offline-first approach, ensuring uninterrupted access to your schedule even without an internet connection.",
  },
  {
    question: "Can I share my schedule with friends?",
    answer: "Certainly. KIITracker supports collaborative scheduling, allowing you to effortlessly share and sync schedules with friends for better coordination.",
  },
  {
    question: "Is my data secure with KIITracker?",
    answer: "Absolutely. KIITracker prioritizes user privacy and employs robust encryption measures to ensure the utmost security of your data.",
  },
]

const FaqSection = () => {
  return (
    <Section id="faq" title="FAQ">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-6">
        <div className="row-start-1 sm:col-start-2">
          <Image src="/assets/faq.png" alt="FAQ" width={450} height={800} />
        </div>
        <div className="sm:col-start-1">
          <Accordion collapsible type="single">
            {faqs.map((faq, index) => (
              <AccordionItem className=" border-Neutrals/neutrals-11" value={`item-${1 + index}`} key={`faq-${index}`}>
                <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  )
}

export default FaqSection
