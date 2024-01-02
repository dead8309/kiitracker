import { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  title?: string
  className?: string
  children: ReactNode
}

export const Section = ({ id, title, className, children }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-1 w-full flex-col items-center justify-center gap-6",
        className
      )}
    >
      {title ? (
        <div className="bg-gradient-to-b from-brand/brand-washedGreen to-Neutrals/neutrals-5 dark:to-white bg-clip-text text-transparent">
          <h3 className="text-3xl sm:text-4xl font-semibold">{title}</h3>
        </div>
      ) : null}
      {children}
    </section>
  )
}
