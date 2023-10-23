import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

export const SecurelyLogginIn = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-4">
        <p className='text-xl font-bold'>Logging you in securely...</p>
        <Loader2Icon className="animate-spin h-10 w-10 text-foreground" />
        <p className='text-muted-foreground'>If this page appears for more than 5 seconds.
        {' '}
        <Link className='underline-offset-4 underline' href='/dashboard'>click here</Link>
        {' '}
        to go to the dashboard
        </p>
    </div>
  )
}
