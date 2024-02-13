import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function nameToPath(name: string): string {
  return `/${name.toLowerCase().replaceAll(" ", "_")}`
}

export function pathToName(path: string): string {
  const cleanedPath = path.replace(/^\//, "")

  const nameWithSpaces = cleanedPath.replace(/_/g, " ")

  const words = nameWithSpaces.split(" ")
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )

  return capitalizedWords.join(" ")
}
