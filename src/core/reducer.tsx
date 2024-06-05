"use client"

import { nonNullable } from "@/components/GamesCards"
import React, { Reducer, createContext, useContext } from "react"

type Props = {
  chooseWinnerAlgorithm(p_one: Player, p_two: Player): Player
}

type State = {
  state: "choosing-games" | "ready-to-fight" | "fighting" | "fight-is-over"
  players: Player[]
  getPlayer(id: PlayerId): Player
  getCurrentPlayer(): Player
  getChosenGames(): number[]
  winnerPlayer: Player | null
}

const getInitialState: () => State = () => ({
  state: "choosing-games",
  winnerPlayer: null,
  players: [
    {
      chosenGameId: null,
      id: "one",
    },
    {
      chosenGameId: null,
      id: "two",
    },
  ],
  getPlayer(playerId) {
    return this.players.find(p => p.id === playerId)!
  },
  getCurrentPlayer() {
    return this.players[0]
  },
  getChosenGames() {
    return this.players.map(p => p.chosenGameId).filter(nonNullable)
  },
})

const createReducer = (props: Props) => {
  const reducer: Reducer<State, Actions> = (state, action) => {
    if (action.type === "reset-game") {
      return getInitialState()
    }
    if (action.type === "fight") {
      return { ...state, state: "fighting" }
    }
    if (action.type === "fight-just-finished") {
      const copy = { ...state }
      copy.winnerPlayer = props.chooseWinnerAlgorithm(
        copy.getPlayer("one"),
        copy.getPlayer("two")
      )
      copy.state = "fight-is-over"
      return copy
    }
    if (action.type === "choose-game") {
      const copy = { ...state }

      const [player, rest] = copy.players
      player.chosenGameId = action.gameId
      copy.players = [rest, player]

      if (!!rest.chosenGameId) {
        copy.state = "ready-to-fight"
      }

      return copy
    }

    return { ...state }
  }

  return reducer
}

type PlayerId = "one" | "two"

type Player = {
  id: PlayerId
  chosenGameId: number | null
}

type Actions =
  | {
      type: "reset-game"
    }
  | {
      type: "fight"
    }
  | {
      type: "fight-just-finished"
    }
  | {
      type: "choose-game"
      gameId: number
    }

type GameProviderProps = React.PropsWithChildren

export function GameProvider({ children }: GameProviderProps) {
  // probably useActionState would be better
  // so it can handle async transitions
  const [state, dispatch] = React.useReducer(
    createReducer({
      chooseWinnerAlgorithm(one, two) {
        if (Math.random() > 0.5) return one
        return two
      },
    }),
    getInitialState()
  )

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameState = () => {
  const state = useContext(GameContext)
  if (!state) throw new Error("OOC")
  return state
}

export const GameContext = createContext<
  [State, React.Dispatch<Actions>] | null
>(null)
