"use client"

import Link from "next/link"

import DaySection from "./day-section"
import { Button, buttonVariants } from "./ui/button"
import { Separator } from "./ui/separator"
import { useEffect } from "react"
import { useCoursesStore } from "../hooks/useCourses"

const dayOptions = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
]

export default function RoutineForm() {
  return (
    <div className="my-2 flex w-full flex-col space-x-2 sm:space-x-0">
      {dayOptions.map((day) => (
        <div key={day.value} className="mt-4">
          <DaySection title={day.label} day={day.value} />
        </div>
      ))}
    </div>
  )
}
