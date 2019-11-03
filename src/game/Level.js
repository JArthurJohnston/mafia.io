import { GameObject } from "./engine/GameObject";
import { cacheLevel } from "./engine/TiledLevelBuilder";
import { keyBinding } from "../KeyBinding";
import { state } from './State'

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

export class Level extends GameObject {
  
  start(){
    this.speed = 5
    this.cachedBackground = cacheLevel()
    this.localX = -state.player.x * state.map.tileSize
    this.localY = -state.player.y * state.map.tileSize
  }

  update(delta){
    let [xMove, yMove] = this.handleKeyboardInput(delta)

    if(state.map.playerTile(this.offsetX, this.offsetY + yMove) == 0)
      this.localY += yMove
    if(state.map.playerTile(this.offsetX + xMove, this.offsetY) == 0)
      this.localX += xMove
    state.updatePlayerPosition(this.localX, this.localY)
  }

  render(graphics){
    graphics.drawBackground(this.cachedBackground, this.localX, this.localY)
    // graphics.drawText(0 ,50, `Player: ${[Math.floor(-1* this.offsetX/40), Math.floor(-1* this.offsetY/40)]}`)
    // graphics.drawText(0 ,80, `Tile: ${state.map.playerTile(this.offsetX, this.offsetY)}`)
  }

  handleKeyboardInput(delta){
    let xMovement = 0, yMovement = 0
    if(wKey.isDown){
        yMovement += this.speed * delta
    }
    if(sKey.isDown){
        yMovement -= this.speed * delta
    }
    if(aKey.isDown){
        xMovement += this.speed * delta
    }
    if(dKey.isDown){
        xMovement -= this.speed * delta
    }
    return [xMovement, yMovement]
  }
}
