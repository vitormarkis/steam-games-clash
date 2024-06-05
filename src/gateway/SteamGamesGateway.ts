import { steamSubList } from "@/data/steam-games-id-list"

export class SteamGamesGateway {
  static async getRandomGamesIdList(max: number): Promise<number[]> {
    const finalGamesIdList: number[] = []
    for (let i = 0; i < max; i++) {
      const min = 0
      const idx = randomInteger(min, steamSubList.length - 1)
      const idx2 = randomInteger(min, steamSubList.length - 1)
      const item = steamSubList[idx]?.appid ?? steamSubList[idx2]?.appid
      finalGamesIdList.push(item)
    }
    // todo: retry if final list got items with same id
    return finalGamesIdList
  }

  // static async getGameById(id: number): Promise<GameType> {
  //   return {
  //     name: "Counter Strike",
  //     steam_appid: id,
  //     genres: [{ description: "Action" }],
  //     header_image:
  //       "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2182790/header.jpg?t=1691703740",
  //   }
  // }

  static async getGameById(id: number): Promise<GameType> {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    )
    const data = await response.json()
    const game = data[id].data
    console.log(game)
    return game
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export type GameType = {
  name: string
  steam_appid: number
  genres: { description: string }[]
  header_image: string
}
