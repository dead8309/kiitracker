"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { Loader2Icon } from "lucide-react"

import { auth } from "@/lib/firebase"
import { GetUserRoutine } from "@/lib/firebase/userController"
import { useCoursesStore } from "@/hooks/useCourses"

type ContextProps = {
  user: User | null
  authenticated: boolean
  setUser: any
  loadingAuthState: boolean
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    if (user) {
      useCoursesStore.getState().fetch( user )
    }
  }, [user])
  
  useEffect(() => {
    useCoursesStore.persist.rehydrate()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user != null,
        setUser,
        loadingAuthState: loading,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center py-10 font-bold text-5xl gap-4">
          <Loader2Icon className="animate-spin h-10 w-10 text-foreground" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
