"use client"

import { useGameState } from "@/core/reducer"
import { GameType } from "@/gateway/SteamGamesGateway"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export type GameListItemProps = React.ComponentPropsWithoutRef<"button"> & {
  info: GameType
}

export const GameListItem = React.forwardRef<
  React.ElementRef<"button">,
  GameListItemProps
>(function GameListItemComponent({ info, className, ...props }, ref) {
  useQuery({
    initialData: info,
    queryKey: ["game", info.steam_appid],
  })
  const [state, dispatch] = useGameState()
  const currentPlayer = state.getCurrentPlayer()
  const chosenGames = state.getChosenGames()
  const chosen = chosenGames.includes(info.steam_appid)

  return (
    <button
      disabled={chosen}
      ref={ref}
      onClick={() =>
        dispatch({ type: "choose-game", gameId: info.steam_appid })
      }
      className={cn(
        " rounded-md p-6 shadow-md bg-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed",
        className,
        chosen
          ? currentPlayer.id === "one"
            ? "bg-blue-200"
            : "bg-green-200"
          : "",
        !chosen && "hover:-translate-y-6 active:-translate-y-3 "
      )}
      {...props}
    >
      <span className="bg-white block py-1 px-3 rounded border border-gray-200 mb-4 w-fit">
        {info.genres?.[0].description || "Unknown"}
      </span>
      <img
        src={info.header_image}
        className="h-40 w-40 object-cover aspect-square"
        alt=""
      />
    </button>
  )
})
