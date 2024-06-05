"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { useGameState } from "@/core/reducer"

export type GameListContainerProps = React.ComponentPropsWithoutRef<"section">

export const GameListContainer = React.forwardRef<
  React.ElementRef<"section">,
  GameListContainerProps
>(function GameListContainerComponent({ children, className, ...props }, ref) {
  const [game] = useGameState()

  return (
    <section
      ref={ref}
      className={cn("p-6 rounded-md border border-gray-200 shadow", className)}
      {...props}
    >
      <h2 className="text-3xl font-bold">Battle Deck (3)</h2>s
      {game.state === "choosing-games" && (
        <div className="flex gap-4">{children}</div>
      )}
    </section>
  )
})
