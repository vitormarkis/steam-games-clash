"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useGameState } from "@/core/reducer"

export type GameReadyToFightProps = React.ComponentPropsWithoutRef<"div">

export const GameReadyToFight = React.forwardRef<
  React.ElementRef<"div">,
  GameReadyToFightProps
>(function GameReadyToFightComponent({ className, ...props }, ref) {
  const [game, dispatch] = useGameState()
  return (
    <div
      ref={ref}
      className={cn(
        "invisible p-8 flex justify-between items-center bg-black/40",
        className,
        (game.state === "ready-to-fight" || game.state === "fighting") &&
          "visible"
      )}
      {...props}
    >
      <p className="text-lg font-semibold text-white">
        Get Ready to Battle and <br /> Defeat Your Ennemy
      </p>
      <button
        onClick={() => dispatch({ type: "fight" })}
        className="h-9 text-sm bg-white text-black font-semibold px-4 rounded-md"
      >
        Fight!!
      </button>
    </div>
  )
})
