import mapTiles from "./maps/default2.json"

class GameState {

  constructor(){
    this.tiles = mapTiles
    this.tileSize = 40
    this.player = {
      x: 20,
      y: 22
    }
  }
}

export const state = new GameState()
