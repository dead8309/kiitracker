import * as z from "zod"

export const courseSchema = z.object({
  course: z.string().nonempty({
    message: "Course is required",
  }),
  timeSlot: z.string().nonempty({
    message: "TimeSlot is required",
  }),
  type: z.enum(["theory", "lab", "elective"]),
  campus: z.string().refine((value) => {
    return value === "elective" || value === "lab" ? value !== undefined : true
  }, "Campus is required"),
  classRoom: z
    .string()
    .optional()
    .refine((value) => {
      return value !== "lab" ? value !== undefined : true
    }, "Classroom is required"),
})

export type Course = z.infer<typeof courseSchema>