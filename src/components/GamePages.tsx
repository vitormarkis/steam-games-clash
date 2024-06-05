"use client"

import { useGameState } from "@/core/reducer"

type GamePageBattleWillClashProps = React.PropsWithChildren

export function GamePageBattleWillClash({
  children,
}: GamePageBattleWillClashProps) {
  const [state] = useGameState()
  if (state.state !== "fight-is-over") return children
  return null
}

type GamePageSomeoneWonProps = React.PropsWithChildren

export function GamePageSomeoneWon({ children }: GamePageSomeoneWonProps) {
  const [state] = useGameState()
  if (state.state === "fight-is-over") return children
  return null
}
