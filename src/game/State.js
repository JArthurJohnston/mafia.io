import mapTiles from "./maps/default2.json"
import { GameScreen } from "../GraphicsHelper.js"
import GameServer from "./engine/networking/IOHandler.js"
import getName from 'node-random-name'

class GameState {

  constructor(){
    this.map = new TileSet()
    this.player = {
      x: 20,
      y: 22,
      offsetX: 0,
      offsetY:0,
      direction: 0,
      ammo: 6,
      name: getName(),
    }
    this.otherPlayers = [
      new PlayerModel('RagnarRoog', 1040 + GameScreen.center.x, 1040 + GameScreen.center.y)
    ]
    this.bullets = {}
  }

  updatePlayerPosition(xOffset, yOffset){
    this.player.offsetX = -xOffset
    this.player.offsetY = -yOffset
    let [x, y] = this.map.playerPosition(xOffset, yOffset)
    this.player.x = x
    this.player.y = y

    GameServer.playerMoved(this.player.offsetX, this.player.offsetY, this.player.name)
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
    return new Tile(xIndex, yIndex, this.tileAt(xIndex, yIndex))
  }
}

class Tile {
  constructor(x, y, index){
    this.index = index
    this.position = {x, y}
  }

  hit(){}
}

export const PLAYER_STATES = {
  ALIVE: 'ALIVE',
  DEAD:'DEAD'
}

class PlayerModel {
  constructor(name, x, y){
    this.state = PLAYER_STATES.ALIVE
    this.name = name
    this.x = x
    this.y = y
  }

  hit(){
    this.state = PLAYER_STATES.DEAD
  }
}

//refactor this
export const state = new GameState()

export default state

