import { cn } from "@/lib/utils"
import React from "react"

export type FallbackProps = React.ComponentPropsWithoutRef<"div">

export const Fallback = React.forwardRef<
  React.ElementRef<"div">,
  FallbackProps
>(function FallbackComponent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("bg-gray-200 relative overflow-hidden", className)}
      {...props}
    />
  )
})

export type FallbackFlashProps = React.ComponentPropsWithoutRef<"div">

export const FallbackFlash = React.forwardRef<
  React.ElementRef<"div">,
  FallbackFlashProps
>(function FallbackFlashComponent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-0 top-0 w-[120px] bg-white/50 animate-skeleton-to-right",
        className
      )}
      {...props}
    />
  )
})
