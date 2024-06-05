import { GameClash } from "@/components/GameClash"
import {
  GamePageBattleWillClash,
  GamePageSomeoneWon,
} from "@/components/GamePages"
import { GameReadyToFight } from "@/components/GameReadyToFight"
import { GameVictoryCard } from "@/components/GameVictoryCard"
import { GamesCards, GamesCardsSkeleton } from "@/components/GamesCards"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="max-w-7xl w-full px-6 mx-auto">
      <GamePageSomeoneWon>
        <GameVictoryCard />
      </GamePageSomeoneWon>
      <GamePageBattleWillClash>
        <GameClash className="container">
          <GameReadyToFight />
        </GameClash>
        <Suspense fallback={<GamesCardsSkeleton />}>
          {/* <GamesCardsSkeleton /> */}
          <GamesCards />
        </Suspense>
      </GamePageBattleWillClash>
    </div>
  )
}
