import * as React from "react"

import { cn } from "@/app/lib/utils"
interface SelectOption {
    value: string, label: string
}
export interface InputProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[],
    defaultOption?: SelectOption
}

const Select = React.forwardRef<HTMLSelectElement, InputProps>(
    ({ defaultOption, options, className, ...props }, ref) => {
        return (
            <select ref={ref}  {...props}
                className={cn("w-full p-3 text-sm focus-visible:bg-stone-100 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100", className)}>
                {
                    defaultOption ? (
                        <option value={defaultOption.value}>{defaultOption.label}</option>
                    ) : <></>
                }
                {
                    options.map((element) => (
                        <option key={element.value} value={element.value}>{element.label}</option>
                    ))
                }
            </select>
        )
    }
)
Select.displayName = "Select"

export { Select }
