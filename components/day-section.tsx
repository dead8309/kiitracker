import React, { useState } from "react"
import "@/lib/sort-courses"
import CourseCard from "./course-card"
import CourseForm from "./course-form"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useCoursesStore } from "../hooks/useCourses"

function DaySection({ day, title }: { day: string, title: string }) {
  const { coursesByDay, addCourse, editCourse, deleteCourse } =
    useCoursesStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">
        Your courses will appear here.
      </p>
      <div id={day}>
        <div className="flex flex-col space-y-2 mt-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Add Course</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                  Make changes to your course. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <CourseForm
                course={{
                  course: "",
                  timeSlot: "",
                  campus: "",
                  classRoom: "",
                  type: "theory",
                }}
                onSubmitSuccess={(course) => {
                  addCourse(course, day)
                  setIsOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-2">
          {
          coursesByDay[day] && coursesByDay[day]?.sortByTime().map(
            (course) =>
              course && (
                <CourseCard
                  key={course.id}
                  courseWithId={course}
                  onEdit={(id, course) => editCourse(id, course, day)}
                  onDelete={(id) => deleteCourse(id, day)}
                />
              )
          )}
          </div>
      </div>
    </div>
  )
}

export default DaySection
