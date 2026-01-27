import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, glass = false, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                glass ? "bg-white/10 border-white/20 text-white placeholder:text-gray-300" : "border border-gray-300 bg-white text-gray-900",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }
