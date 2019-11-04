import mapTiles from "./maps/default2.json"

class GameState {

  constructor(){
    this.map = new TileSet()
    this.player = {
      x: 20,
      y: 22,
      direction: 0
    }
  }

  updatePlayerPosition(xOffset, yOffset){
    let [x, y] = this.map.playerPosition(xOffset, yOffset)
    this.player.x = x
    this.player.y = y
  }
}

/**
 * The tileSize property describes each tile's 
 * width and height (40 x 40)
 */
class TileSet {
  constructor(){
    this.tiles = mapTiles
    this.tileSize = 40
  }

  get width(){
    return this.tiles[0].length
  }

  get height(){
    return this.tiles.length
  }

  playerTile(xOffset, yOffset){
    const [x, y] = this.playerPosition(xOffset, yOffset)
    return this.tiles[y][x]
  }

  playerPosition(xOffset, yOffset){
    return[ Math.floor(-xOffset / this.tileSize), Math.floor(-yOffset / this.tileSize)]
  }
}

export const state = new GameState()
