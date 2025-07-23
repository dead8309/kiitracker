import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface DropdownButtonProps {
  onCourseSelect?: (course: string) => void;
}

const cn = (...classes: (string | undefined | null | boolean)[]) =>
  classes.filter(Boolean).join(" ");

const Button = ({
  variant = "default",
  className = "",
  children,
  ...props
}: any) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input bg-background",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], "h-10 px-4 py-2", className)}
      {...props}
    >
      {children}
    </button>
  );
};

const Popover = ({ children }: any) => (
  <div className="relative">{children}</div>
);

const PopoverTrigger = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

const PopoverContent = ({ children, className = "", ...props }: any) => (
  <div
    className={cn(
      "absolute top-full mt-1 z-50 w-72 rounded-md border bg-gray-800 text-gray-200 shadow-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Command = ({ children, className = "", ...props }: any) => (
  <div
    className={cn("flex flex-col overflow-hidden rounded-md bg-gray-800 text-gray-200", className)}
    {...props}
  >
    {children}
  </div>
);

const CommandInput = ({
  placeholder,
  className = "",
  value,
  onChange,
  ...props
}: any) => (
  <div className="flex items-center border-b px-3 border-gray-600">
    <input
      className={cn(
        "w-full bg-transparent py-3 text-sm placeholder:text-gray-400 text-gray-200 outline-none",
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

const CommandList = ({ children, className = "", ...props }: any) => (
  <div className={cn("max-h-[300px] overflow-y-auto", className)} {...props}>
    {children}
  </div>
);

const CommandGroup = ({ children, className = "", ...props }: any) => (
  <div className={cn("p-1 text-foreground", className)} {...props}>
    {children}
  </div>
);

const CommandItem = ({
  children,
  className = "",
  onSelect,
  value,
  ...props
}: any) => (
  <div
    className={cn(
      "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-700 text-gray-200",
      className
    )}
    onClick={() => onSelect?.(value)}
    {...props}
  >
    {children}
  </div>
);

const DropdownButton = ({ onCourseSelect }: DropdownButtonProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateCourses = () => {
    const departments = [
      { prefix: "CSE", count: 48 },
      { prefix: "IT", count: 5 },
      { prefix: "CSCE", count: 3 },
      { prefix: "CSSE", count: 3 },
    ];

    // const allCourses = [];
    const allCourses: { value: string; label: string }[] = []


    departments.forEach((dept) => {
      for (let i = 1; i <= dept.count; i++) {
        const courseNumber = `${dept.prefix}-${i}`;
        allCourses.push({ value: courseNumber, label: courseNumber });
      }
    });

    return allCourses;
  };

  const courses = generateCourses();
  const filteredCourses = courses.filter((course) =>
    course.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selected: string) => {
    const newValue = selected === value ? "" : selected;
    setValue(newValue);
    setOpen(false);

    onCourseSelect?.(newValue);
    console.log("Selected course:", newValue);
  };
  //auto-focus on search in dropdownButton
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);
  

  return (
    <div className="ml-3" ref={dropdownRef}>
      <Popover>
        <PopoverTrigger>
          <Button
            className="flex items-center h-8 px-3 rounded-full bg-secondary text-sm text-white"
            onClick={() => setOpen(!open)}
          >
            {value || "Select Course..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        {open && (
          <PopoverContent className="w-[200px]">
            <Command>
              <CommandInput
                placeholder="Search courses..."
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
              <CommandList>
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
  );
};

export default DropdownButton;
