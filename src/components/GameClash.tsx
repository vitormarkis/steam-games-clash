"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useGameState } from "@/core/reducer"
import { useQuery } from "@tanstack/react-query"
import { GameType } from "@/gateway/SteamGamesGateway"
import { motion } from "framer-motion"

export type GameClashProps = React.ComponentPropsWithoutRef<"div">

export const GameClash = React.forwardRef<
  React.ElementRef<"div">,
  GameClashProps
>(function GameClashComponent({ children, className, ...props }, ref) {
  const [state] = useGameState()
  const { data: p_one } = useQuery<GameType>({
    queryKey: ["game", state.getPlayer("one").chosenGameId],
  })
  const { data: p_two } = useQuery<GameType>({
    queryKey: ["game", state.getPlayer("two").chosenGameId],
  })

  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      <div className="flex justify-between">
        <ChoosedGameFight
          animateX={"100%"}
          game={p_one}
        />
        <ChoosedGameFight
          animateX={"-100%"}
          game={p_two}
        />
      </div>
      {children}
    </div>
  )
})

export type ChoosedGameFightProps = React.ComponentPropsWithoutRef<
  typeof motion.div
> & {
  game: GameType | undefined
  animateX: string
}

export const ChoosedGameFight = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  ChoosedGameFightProps
>(function ChoosedGameFightComponent(
  { animateX, game, className, ...props },
  ref
) {
  const [gameState, dispatch] = useGameState()
  const isFighting = gameState.state === "fighting"

  return (
    <motion.div
      animate={
        isFighting
          ? {
              x: animateX,
              opacity: 0,
            }
          : undefined
      }
      initial={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      onAnimationComplete={() => dispatch({ type: "fight-just-finished" })}
      ref={ref}
      className={cn("flex flex-col p-8 border", className)}
      {...props}
    >
      <h2 className="text-3xl font-bold">{game ? game.name : "???"}</h2>
      <span className="block py-1 px-3 rounded border border-gray-200 mb-4 w-fit">
        {game ? game.genres?.[0].description ?? "Unknown" : "???"}
      </span>
      <img
        src={
          game
            ? game.header_image
            : "https://www.theyearinpictures.co.uk/images//image-placeholder.png"
        }
        className="h-[20rem] w-[20rem] object-cover aspect-square"
        alt=""
      />
    </motion.div>
  )
})
