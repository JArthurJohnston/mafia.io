import mapTiles from "./maps/default2.json"
import { GameScreen } from "../GraphicsHelper.js"

class GameState {

  constructor(){
    this.map = new TileSet()
    this.player = {
      x: 20,
      y: 22,
      mapX: 0,
      mapY:0,
      direction: 0,
      ammo: 6,
      name: 'Jay Joe'
    }
    this.otherPlayers = [
      {
        name: 'RagnarRoog',
        x: 1040 + GameScreen.center.x,
        y: 1040 + GameScreen.center.y,
      }
    ]
  }

  updatePlayerPosition(xOffset, yOffset){
    this.player.mapX = - xOffset
    this.player.mapY = -yOffset
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
    this.offsets = {x: 0, y: 0}
  }

  get width(){
    return this.tiles[0].length
  }

  get height(){
    return this.tiles.length
  }

  tileAt(x, y){
    return this.tiles[y][x]
  }

  playerTile(xOffset, yOffset){
    const [x, y] = this.playerPosition(xOffset, yOffset)
    return this.tileAt(x, y)
  }

  playerPosition(xOffset, yOffset){
    this.offsets.x = xOffset
    this.offsets.y = yOffset
    return [Math.floor(-xOffset / this.tileSize), Math.floor(-yOffset / this.tileSize)]
  }

  tileFromScreenSpace(x, y){
    let xDiff = Math.floor((GameScreen.center.x - x) / this.tileSize)
    let yDiff = Math.floor((GameScreen.center.y - y) / this.tileSize)

    const yIndex = state.player.y - yDiff
    const xIndex = state.player.x - xDiff
    if(yIndex < 0 || yIndex > this.height || xIndex < 0 ||xIndex > this.width){
      return -1
    }
    return this.tiles[yIndex][xIndex]
  }
}

//refactor this
export const state = new GameState()

export default state

