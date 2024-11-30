import * as React from "react"
import { cn } from "@/app/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.InputHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn("w-full p-3 text-sm min-h-32 text-gray-500 focus-visible:bg-stone-100 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100", className)}
            ref={ref}  {...props} ></textarea>
    )
}
)
Textarea.displayName = "Input"
export { Textarea }
