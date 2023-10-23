import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function format24h(time: string) {
  if (time === "") return ""
  const [hour, minute] = time.split(":").map(Number)
  const isPM = hour >= 12
  const hour12 = hour % 12 || 12
  return `${hour12.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`
}

export function format12h(time: string) {
  if (time === "") return ""
  console.log("formating this to 24h", time)
  const [hour, minute, ampm] = time.split(/[: ]/)
  const hour24 = Number(hour) + (ampm === "PM" ? 12 : 0)
  return `${hour24.toString().padStart(2, "0")}:${minute}`
}