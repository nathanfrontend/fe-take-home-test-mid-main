import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export const formatIndex = (index:number) => {

    return index.toString().padStart(3,"0")
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
