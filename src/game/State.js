import mapTiles from "./maps/default2.json"
import { GameScreen } from "../GraphicsHelper.js"

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
    return [Math.floor(-xOffset / this.tileSize), Math.floor(-yOffset / this.tileSize)]
  }

  tileFromScreenSpace(x, y){
    let xDiff = Math.floor((GameScreen.center.x - x) / this.tileSize)
    let yDiff = Math.floor((GameScreen.center.y - y) / this.tileSize)

    // return [state.player.x - xDiff, state.player.y - yDiff]
    return this.tiles[state.player.y - yDiff][state.player.x - xDiff]
  }
}

export const state = new GameState()
