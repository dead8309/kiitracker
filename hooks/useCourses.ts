import { get } from "http"
import { useAuthContext } from "@/context/AuthProvider"
import { User } from "firebase/auth"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { Course } from "@/lib/course-schema"
import { GetUserRoutine } from "@/lib/firebase/userController"
// import { coursesTimetable } from "@/lib/timetable_data"
import { loadCoursesTimetable } from "@/lib/loadTimetable"

export type CourseWithId = Course & {
  id: number
}

type State = {
  coursesByDay: {
    [key: string]: CourseWithId[]
  }
}

type Actions = {
  // fetch: (user: User | null) => void
  fetch: (user: User | null) => Promise<void>
  addCourse: (course: Course, day: string) => void
  deleteCourse: (id: number, day: string) => void
  editCourse: (id: number, course: Partial<Course>, day: string) => void
  reset: () => void
  addAllCourses: (courses: {[key: string]: CourseWithId[]}) => void
  // loadTimetableForCourse: (courseCode: string) => void 
  loadTimetableForCourse: (courseCode: string) => Promise<void>

}

const initialState: State = {
  coursesByDay: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
}

export const useCoursesStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      fetch: async (user) => {
        if (user) {
          const res = await GetUserRoutine(user)
          set((state) => ({
            coursesByDay: {
              ...state.coursesByDay,
              monday: mergeArrays(state.coursesByDay.monday || [], res?.monday || []),
              tuesday: mergeArrays(state.coursesByDay.tuesday || [], res?.tuesday || []),
              wednesday: mergeArrays(
                state.coursesByDay.wednesday || [],
                res?.wednesday || []
              ),
              thursday: mergeArrays(state.coursesByDay.thursday || [], res?.thursday || []),
              friday: mergeArrays(state.coursesByDay.friday || [], res?.friday || []),
              saturday: mergeArrays(state.coursesByDay.saturday || [], res?.saturday || []),
            },
          }))
        }
      },
      addCourse: (course, day) =>
        set((state) => {
          if (!state.coursesByDay[day]) {
            throw new Error(`Invalid day of the week: ${day}`)
          }
          return {
            coursesByDay: {
              ...state.coursesByDay,
              [day]: [
                ...state.coursesByDay[day],
                { ...course, id: Date.now() },
              ],
            },
          }
        }),
      deleteCourse: (id, day) =>
        set((state) => {
          if (!state.coursesByDay[day]) {
            throw new Error(`Invalid day of the week: ${day}`)
          }
          return {
            coursesByDay: {
              ...state.coursesByDay,
              [day]: state.coursesByDay[day].filter(
                (course) => course.id !== id
              ),
            },
          }
        }),
      editCourse: (id, course, day) =>
        set((state) => {
          if (!state.coursesByDay[day]) {
            throw new Error(`Invalid day of the week: ${day}`)
          }
          return {
            coursesByDay: {
              ...state.coursesByDay,
              [day]: state.coursesByDay[day].map((c) => {
                if (c.id === id) {
                  return {
                    ...c,
                    ...course,
                  }
                }
                return c
              }),
            },
          }
        }),
      reset: () => set({ ...initialState }),
      addAllCourses: (courses) => set({ coursesByDay: courses }),
      // Move the loadTimetableForCourse function here, inside the store
      loadTimetableForCourse: async (courseCode) => {
        const timetable = await loadCoursesTimetable(courseCode)
      
        if (timetable) {
          const coursesWithIds: { [key: string]: CourseWithId[] } = {}
      
          Object.keys(timetable).forEach((day) => {
            coursesWithIds[day] = timetable[day].map((course, index) => ({
              ...course,
              id: Date.now() + index,
            }))
          })
      
          set({ coursesByDay: coursesWithIds })
        } else {
          console.log(`No timetable found for course: ${courseCode}`)
        }
      }
      
    }),
    {
      name: "courses",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)

// Helper function to merge arrays and remove duplicates
const mergeArrays = (arr1: CourseWithId[], arr2: CourseWithId[]) => {
  const merged = [...arr1]
  arr2.forEach((item) => {
    if (!merged.some((i) => i.id === item.id)) {
      merged.push(item)
    }
  })
  return merged
}