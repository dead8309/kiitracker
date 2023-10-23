import { use, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { format12h, format24h } from "@/lib/utils"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface TimeRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export default function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
  const { control } = useFormContext()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  useEffect(() => {
    if (value == "") {
      console.log("value is empty")
      return
    }
    console.log("value is not empty", value)
    const [start, end] = value.split(" - ")
    setStartTime(format12h(start))
    setEndTime(format12h(end))
  }, [value])

  useEffect(() => {
    console.log("start/stop Time changed")
    if (startTime == "" || endTime == "") {
      console.log("start/stop Time is empty")
      onChange("")
      return
    }
    onChange(`${format24h(startTime)} - ${format24h(endTime)}`)
  }, [startTime, endTime])

  return (
    <>
      <Controller
        control={control}
        name={"startTime"}
        render={({ field }) => (
          <div className="mr-2 space-y-2">
            <Label htmlFor="start-time">Start</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(event) => {
                setStartTime(event.target.value)
                field.onChange(event.target.value)
              }}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name={"endTime"}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="end-time">End</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(event) => {
                setEndTime(event.target.value)
                field.onChange(event.target.value)
              }}
            />
          </div>
        )}
      />
    </>
  )
}
