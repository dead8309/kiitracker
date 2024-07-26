"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Course, courseSchema } from "@/lib/course-schema"

import TimeRangePicker from "./TimePicker"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const timeSlotOptions = [
  { label: "6:30 AM - 7:30 AM" },
  { label: "7:30 AM - 8:30 AM" },
  { label: "8:00 AM - 9:00 AM" },
  { label: "8:20 AM - 9:20 AM" },
  { label: "9:00 AM - 10:00 AM" },
  { label: "9:20 AM - 10:20 AM" },
  { label: "10:00 AM - 11:00 AM" },
  { label: "10:20 AM - 11:20 AM" },
  { label: "11:00 AM - 12:00 PM" },
  { label: "11:20 AM - 12:20 PM" },
  { label: "12:00 PM - 1:00 PM" },
  { label: "12:10 PM - 1:10 PM" },
  { label: "12:15 PM - 1:15 PM" },
  { label: "12:20 PM - 1:20 PM" },
  { label: "1:00 PM - 2:00 PM" },
  { label: "1:20 PM - 2:20 PM" },
  { label: "2:00 PM - 3:00 PM" },
  { label: "3:00 PM - 4:00 PM" },
  { label: "4:00 PM - 5:00 PM" },
  { label: "5:00 PM - 6:00 PM" },
]

const Coursetypes = [
  { value: "theory", label: "Theory" },
  { value: "lab", label: "Lab" },
  { value: "elective", label: "Elective" },
]

type CourseFormProps = {
  course?: Course
  onSubmitSuccess?: (course: Course) => void
}

export default function CourseForm({
  onSubmitSuccess,
  course,
}: CourseFormProps) {
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course,
  })

  const handleSave = (values: Course) => {
    form.reset()
    onSubmitSuccess?.(values)
    console.log("Saved", values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Phy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-40 gap-y-8">
          {form.watch("type") == "lab" ? (
            <TimeRangePicker
            value={form.getValues("timeSlot")}
              onChange={(v) => {
                form.setValue("timeSlot", v)
              }}
            />
          ) : (
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TimeSlot</FormLabel>
                  <Select
                    defaultValue=""
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select TimeSlot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <ScrollArea className="h-72">
                          {timeSlotOptions.map((option) => (
                            <SelectItem key={option.label} value={option.label}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course type</FormLabel>
                <Select
                  value={field.value}
                  defaultValue=""
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      {Coursetypes.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campus</FormLabel>
                <Select
                  value={field.value}
                  defaultValue=""
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Campus" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className="h-72">
                        {Array.from(Array(23).keys())
                          .map((option) => `Campus ${option + 1}`)
                          .map((option) => {
                            return (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            )
                          })}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("type") !== "lab" && (
            <FormField
              control={form.control}
              name="classRoom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classroom</FormLabel>
                  <FormControl>
                    <Input placeholder="C-13 " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={() => {
              form.trigger().then((isValid) => {
                if (isValid) {
                  handleSave(form.getValues())
                }
              })
            }}
          >
            Save
          </Button>
          <Button type="button" variant="link" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
