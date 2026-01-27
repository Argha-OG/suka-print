import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
        default: "bg-primary-blue text-white hover:bg-blue-600 shadow-md",
        gradient: "bg-gradient-to-r from-primary-blue to-primary-magenta text-white hover:opacity-90 shadow-lg",
        outline: "border border-primary-blue text-primary-blue hover:bg-primary-blue/10",
        ghost: "hover:bg-accent/10 text-accent",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    }

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
