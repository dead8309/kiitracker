import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Button } from './button'
import { useCoursesStore } from '@/hooks/useCourses'
import { useAuthContext } from '@/context/AuthProvider'
import { useToast } from './use-toast'
import { Share, Share2, ShareIcon } from 'lucide-react'

export default function ShareRoutine() {
  const { coursesByDay } = useCoursesStore()
  const { user } = useAuthContext()
  const [copyLink,setCopyLink] = useState("")
  const { toast } = useToast()
  useEffect(() => {
    if (user) {
        setCopyLink(`${window.location.origin}/dashboard?routine=${user.uid}`)
    }
}, [user])
    const handleCopyLink = () => {
        navigator.clipboard.writeText(copyLink)
        toast({
        title: "Copied!",
        description: "The link has been copied to your clipboard.",
        })
    }
    const handleShare = () => {
        navigator.share({
            title: "Share Routine",
            text: "Anyone with the link can use your routine to create their own.",
            url: copyLink,
        })
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Routine</CardTitle>
        <CardDescription>
        Share your routine with others by generating a unique link. 
        Anyone with the link can view and create their own copy of your routine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-center items-center space-x-2 gap-2">
          <Input value={copyLink} readOnly />
          <Button variant='default' className="shrink-0" onClick={handleCopyLink}>
            Copy Link
          </Button>
          <Button variant="outline" size="icon" className='shrink-0' onClick={handleShare}>
            <Share2 />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
