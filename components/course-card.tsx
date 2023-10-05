import React, { useState } from "react"
import { LucideTrash2, PencilIcon } from "lucide-react"

import CourseForm from "./course-form"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { CourseWithId, useCoursesStore } from "../hooks/useCourses"

type CourseCardProps = {
  courseWithId: CourseWithId
  onDelete: (id: number) => void
  onEdit: (id: number, course: CourseWithId) => void
}

function CourseCard({
    courseWithId: {
      id,
      course,
      timeSlot,
      campus,
      classRoom,
      type,
    },
    onDelete,
    onEdit,
  }: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_80px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{course}</CardTitle>
          <CardDescription>{timeSlot}</CardDescription>
        </div>
        <div className="flex items-center rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setIsOpen(true)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={() => onDelete(id)}
          >
            <LucideTrash2 className="stroke-destructive h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">{campus}</div>
          {classRoom ? <div>{classRoom}</div> : null}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Make changes to your course. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <CourseForm
              course={{ course, timeSlot, campus, classRoom, type }}
              onSubmitSuccess={(course) => {
                const updatedCourseWithId = { ...course, id };
                onEdit(id, updatedCourseWithId);
                setIsOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default CourseCard
