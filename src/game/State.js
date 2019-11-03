import mapTiles from "./maps/default2.json"

class GameState {

  constructor(){
    this.map = new TileSet()
    this.tileSize = 40
    this.player = {
      x: 20,
      y: 22
    }
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
    const xIndex = Math.floor(-yOffset / this.height)
    const yIndex = Math.floor(-xOffset / this.width)
    // console.log([xIndex, yIndex])
    return this.tiles[xIndex][yIndex]
  }
}

export const state = new GameState()
