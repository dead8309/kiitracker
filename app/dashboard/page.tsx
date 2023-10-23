"use client"

import React, { useEffect, useState } from "react"
import {
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useAuthContext } from "@/context/AuthProvider"

import {
  getUserRoutineById,
} from "@/lib/firebase/userController"
import { useCoursesStore } from "@/hooks/useCourses"
import ShareRoutine from "@/components/ui/share-routine"
import LoadRoutineDialog from "@/components/LoadRoutineDialog"
import ProjectDetailsDialog from "@/components/ProjectDetailsDialog"
import RoutineForm from "@/components/routine-form"
import SyncDataWithFirebaseButton from "@/components/sync-with-google-"

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { fetch, reset, addAllCourses } = useCoursesStore()
  const params = useSearchParams()
  const [showLoadRoutineDialog, setShowLoadRoutineDialog] = useState(false)
  useEffect(() => {
    if (params.has("routine")) {
      const routine = params.get("routine")
      if (routine) {
        setShowLoadRoutineDialog(true)
      }
    }
  }, [params])

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    fetch(user)
  }, [user])

  const handleOnCopyRoutine = () => {
    setShowLoadRoutineDialog(false)
    const routine = params.get("routine")
    if (routine != null && routine == "") return

    reset()
    router.push("/dashboard")
    getUserRoutineById(routine!).then((data) => {
      if (data) {
        addAllCourses(data)
      }
    })
  }
  return (
    <div className="container flex flex-col justify-between mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 items-center justify-center gap-6">
        <LoadRoutineDialog
          open={showLoadRoutineDialog}
          onCopyRoutine={handleOnCopyRoutine}
          onOpenChange={(value) => setShowLoadRoutineDialog(value)}
        />
        <div className="flex items-center">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
          <ProjectDetailsDialog />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center justify-center gap-6 mt-6">
      <SyncDataWithFirebaseButton />
      <ShareRoutine />
      </div>
      <RoutineForm />
    </div>
  )
}
