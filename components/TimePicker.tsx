import { use, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { format24h } from "@/lib/utils"

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
      setStartTime("")
      setEndTime("")
      return
    }
    const [start, end] = value.split(" - ")
    setStartTime(start)
    setEndTime(end)
  }, [value])

  useEffect(() => {
    onChange(`${format24h(startTime)} - ${format24h(endTime)}`)
  }, [startTime, endTime])

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value)
  }

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value)
  }

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
                handleStartTimeChange(event)
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
                handleEndTimeChange(event)
                field.onChange(event.target.value)
              }}
            />
          </div>
        )}
      />
    </>
  )
}
