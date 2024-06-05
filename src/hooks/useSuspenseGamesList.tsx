import { SteamGamesGateway } from "@/gateway/SteamGamesGateway"
import { useSuspenseQuery } from "@tanstack/react-query"

export function useSuspenseGamesList() {
  return useSuspenseQuery({
    queryKey: ["games"],
    queryFn: () => SteamGamesGateway.getRandomGamesIdList(3),
  })
}
