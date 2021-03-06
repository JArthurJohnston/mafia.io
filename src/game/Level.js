import { GameObject } from "./engine/GameObject";
import { cacheLevel } from "./engine/TiledLevelBuilder";
import { keyBinding } from "../KeyBinding";
import { state } from './State'
import MouseInput from "./engine/input/MouseInput"
import { Bullet } from "./Bullet";
import { GameScreen } from "../GraphicsHelper";
import { angleBetween } from "./engine/math/PointMath";

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

export class Level extends GameObject {

  constructor(){
    super()
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  get name(){
    return 'Level'
  }

  start(){
    this.speed = 5
    this.cachedBackground = cacheLevel()
    MouseInput.addClickHandler(this.handleMouseClick)
    this.localX = -state.player.x * state.map.tileSize
    this.localY = -state.player.y * state.map.tileSize
    state.updatePlayerPosition(this.localX, this.localY)
  }

  update(delta){
    let [xMove, yMove] = this.handleKeyboardInput(delta)

    if(xMove !== 0 || yMove !== 0){
      if(this.canMoveVertically(yMove))
        this.localY += Math.floor(yMove)
      if(this.canMoveHorizontally(xMove))
        this.localX += Math.floor(xMove)
      state.updatePlayerPosition(this.localX, this.localY)
    }
  }

  canMoveVertically(yMove){
    return state.map.playerTile(this.offsetX, this.offsetY + yMove) === 0 //&&
  }

  canMoveHorizontally(xMove){
    return state.map.playerTile(this.offsetX + xMove, this.offsetY) === 0 //&&
  }

  handleMouseClick(x, y){
    if(state.player.ammo > 0 && !state.player.isReloading){
      state.player.ammo -= 1
      let angle = angleBetween(GameScreen.center.x, GameScreen.center.y , x, y)
      this.spawn(Bullet.fire(this.offsetX, this.offsetY, angle))
    }
  }

  render(graphics){
    graphics.drawBackground(this.cachedBackground, this.offsetX, this.offsetY)
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
