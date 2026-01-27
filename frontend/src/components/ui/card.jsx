import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, glass = false, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl text-card-foreground shadow-sm",
            glass ? "glass-card p-6" : "bg-white border text-gray-800 p-6",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
