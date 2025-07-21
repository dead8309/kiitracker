import {  useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useRef } from "react"


// const dropdownRef = useRef<HTMLDivElement>(null)

const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}
const Button = ({           //Button
  variant = "default",
  className = "",
  children,
  ...props
}: any) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-primary text-primary-foreground",
    outline:
      "border border-input bg-background",
  }

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        "h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
const Popover = ({ children, open, onOpenChange }: any) => {
  return <div className="relative">{children}</div>
}

const PopoverTrigger = ({ children, asChild, ...props }: any) => {
  return <div {...props}>{children}</div>
}
const PopoverContent = ({ children, className = "", ...props }: any) => {
  return (
    <div
      className={cn(
        "absolute top-full mt-1 z-50 w-72 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
        "bg-gray-800 border-gray-600 text-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
const Command = ({ children, className = "", ...props }: any) => {      //Command
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        "bg-gray-800 text-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CommandInput = ({           //C input
  placeholder,
  className = "",
  value,
  onChange,
  ...props
}: any) => {
  return (
    <div className="flex items-center border-b px-3 border-gray-600">
      <input
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "placeholder:text-gray-400 text-gray-200",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

const CommandList = ({ children, className = "", ...props }: any) => {      // C list
  return (
    <div
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
const CommandEmpty = ({ children, className = "", ...props }: any) => {
  return (
    <div
      className={cn("py-6 text-center text-sm text-gray-400", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CommandGroup = ({ children, className = "", ...props }: any) => {
  return (
    <div
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CommandItem = ({          // C items
  children,
  className = "",
  onSelect,
  value,
  ...props
}: any) => {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "hover:bg-gray-700 text-gray-200 cursor-pointer",
        className
      )}
      onClick={() => onSelect && onSelect(value)}
      {...props}
    >
      {children}
    </div>
  )
}
interface DropdownButtonProps {
  onCourseSelect?: (course: string) => void
}

const DropdownButton = ({ onCourseSelect }: DropdownButtonProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const generateCourses = () => {
    const departments = [
      { prefix: "CSE", count: 48 },
      { prefix: "IT", count: 5 },
      { prefix: "CSCE", count: 3 },
      { prefix: "CSSE", count: 3 },
    ]

    const allCourses = []

    departments.forEach((dept) => {
      for (let i = 1; i <= dept.count; i++) {
        const courseNumber = String(i)
        allCourses.push({
          value: `${dept.prefix}-${courseNumber}`,
          label: `${dept.prefix}-${courseNumber}`,
        })
      }
    })

    return allCourses
  }

  const courses = generateCourses()

  const filteredCourses = courses.filter((course) =>
    course.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    setOpen(false)

    if (newValue && onCourseSelect) {
      onCourseSelect(newValue)
    }

    console.log("Selected course:", newValue)
  }

  return (
    <div className="ml-3" ref={dropdownRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            // variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex items-center h-8 px-3 rounded-full bg-secondary text-sm text-white"
            onClick={() => setOpen(!open)}
          >
            {value
              ? courses.find((course) => course.value === value)?.label
              : "Select Course..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {open && (
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CommandList>
                {/* <CommandEmpty>No course found.</CommandEmpty> */}
                <CommandGroup>
                  {filteredCourses.map((course) => (
                    <CommandItem
                      key={course.value}
                      value={course.value}
                      onSelect={handleSelect}
                    >
                      {course.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === course.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}

export default DropdownButton
