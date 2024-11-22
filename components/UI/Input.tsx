import * as React from "react"

import { cn } from "@/app/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input type={type}
                className={cn("w-full p-3 text-sm text-gray-500 focus-visible:bg-stone-100 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100", className)}
                ref={ref}  {...props} />
        )
    }
)
Input.displayName = "Input"

export { Input }
