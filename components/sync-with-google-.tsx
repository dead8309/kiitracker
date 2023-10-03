"use client"

import React, { useState } from "react"
import { useAuthContext } from "@/context/AuthProvider"
import { Loader2 } from "lucide-react"

import { SyncUserRoutine } from "@/lib/firebase/userController"
import { useCoursesStore } from "@/hooks/useCourses"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function SyncDataWithFirebaseButton() {
  const { user } = useAuthContext()
  const { coursesByDay } = useCoursesStore()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const handleSyncData = async () => {
    setLoading(true)
    await SyncUserRoutine(user, coursesByDay)
    setLoading(false)
    toast({
      title: "Synced!",
      description: "Your data has been synced with your Google account.",
    })
  }
  return (
    <Card>
    <CardHeader>
      <CardTitle>Sync With Google</CardTitle>
      <CardDescription>
      Sync your routine with Google servers to keep your data up-to-date across all your devices. 
      Click the button below to initiate the sync process.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-row justify-center items-center space-x-2 gap-2">
      <Button className="w-full" onClick={handleSyncData}>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="flex items-center">
          <Icons.google className="w-6 h-6 mr-2" />
          Sync Data With Google
        </div>
      )}
    </Button>
      </div>
    </CardContent>
  </Card>
  )
}
