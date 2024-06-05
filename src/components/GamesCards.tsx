import { GameListContainer } from "@/components/GameListContainer"
import { GameListItem } from "@/components/GameListItem"
import { Fallback, FallbackFlash } from "@/components/skeleton"
import { SteamGamesGateway } from "@/gateway/SteamGamesGateway"
import { cn } from "@/lib/utils"
import React from "react"

export type GamesCardsProps = React.ComponentPropsWithoutRef<"div">

export const GamesCards = React.forwardRef<
  React.ElementRef<"div">,
  GamesCardsProps
>(async function GamesCardsComponent({ className, ...props }, ref) {
  const randomGamesIdList = await SteamGamesGateway.getRandomGamesIdList(3)
  const gamesInfoPromises = randomGamesIdList.map(SteamGamesGateway.getGameById)
  const gamesInfoNullable = await Promise.all(gamesInfoPromises)
  const gamesInfo = gamesInfoNullable.filter(nonNullable)
  const someFailed = gamesInfo.length < 3
  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      <GameListContainer>
        {gamesInfo.map((info, i) => (
          <GameListItem
            key={i}
            info={info}
          />
        ))}
        {someFailed && (
          <span className="text-red-400">
            Failed to fetch all games, <br />
            try refreshing the page.
          </span>
        )}
      </GameListContainer>
    </div>
  )
})

type GamesCardsSkeletonProps = {}

export function GamesCardsSkeleton({}: GamesCardsSkeletonProps) {
  return (
    <Fallback className="w-full h-[294px] rounded-lg">
      <FallbackFlash />
    </Fallback>
  )
}

// TODO AQUI VAI SKELETON

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
