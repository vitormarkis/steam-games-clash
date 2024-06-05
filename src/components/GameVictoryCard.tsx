"use client"

import React, { startTransition } from "react"
import { cn } from "@/lib/utils"
import { useGameState } from "@/core/reducer"
import { useQuery } from "@tanstack/react-query"
import { GameType } from "@/gateway/SteamGamesGateway"
import { playAgainAction } from "@/actions/play-again"

export type GameVictoryCardProps = React.ComponentPropsWithoutRef<"div">

export const GameVictoryCard = React.forwardRef<
  React.ElementRef<"div">,
  GameVictoryCardProps
>(function GameVictoryCardComponent({ className, ...props }, ref) {
  const [state, dispatch] = useGameState()
  const { data: steamGame } = useQuery<GameType>({
    queryKey: ["game", state.winnerPlayer?.chosenGameId],
  })

  return (
    <div
      ref={ref}
      className={cn("h-screen grid place-items-center", className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">
          Player {state.winnerPlayer?.id} won!!
        </h1>
        <div className="flex gap-6">
          <div className="flex gap-5 items-start p-2 border rounded-md border-black">
            <img
              src={steamGame?.header_image}
              className="h-40 w-40 object-cover aspect-square"
              alt=""
            />
            <span className="flex py-1 px-3 rounded border border-gray-200">
              {steamGame?.genres[0].description}
            </span>
          </div>
          <div className="flex gap-5 flex-col p-2 border rounded-md border-black">
            <h1 className="text-xl font-semibold">Reward!</h1>
            <span className="flex py-1 px-3 rounded border border-gray-200">
              You've earned +500 points!
            </span>
          </div>
        </div>
        <button
          onClick={async () => {
            // async transitions in react 19
            // would be very handy
            startTransition(() => {
              playAgainAction().then(() => {
                dispatch({ type: "reset-game" })
              })
            })
          }}
          className="max-w-sm mx-auto h-9 text-sm bg-white text-black font-semibold px-4 rounded-md border border-black hover:bg-neutral-200"
        >
          Play again!
        </button>
      </div>
    </div>
  )
})
