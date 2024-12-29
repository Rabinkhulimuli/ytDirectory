import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/* Error: Objects are not valid 
as a React child (found: [object Date]). If you meant to render a 
collection of children, use an array instead. */
export function formatDate(date:string){

  return new Date(date).toLocaleDateString('en-US',{
    month:'long',
    day:'numeric',
    year:'numeric'
  })
}