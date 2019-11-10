import { GameObject } from "./engine/GameObject";
import { cacheLevel } from "./engine/TiledLevelBuilder";
import { keyBinding } from "../KeyBinding";
import { state } from './State'
import MouseInput from "./engine/input/MouseInput"
import { Bullet } from "./Bullet";
import { GameScreen } from "../GraphicsHelper";
import { angleBetween, radiansToDegrees } from "./engine/math/PointMath";

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
    this.localX = -state.player.x * state.map.tileSize
    this.localY = -state.player.y * state.map.tileSize
    MouseInput.addClickHandler(this.handleMouseClick)
  }

  update(delta){
    let [xMove, yMove] = this.handleKeyboardInput(delta)

    if(state.map.playerTile(this.offsetX, this.offsetY + yMove) === 0)
      this.localY += yMove
    if(state.map.playerTile(this.offsetX + xMove, this.offsetY) === 0)
      this.localX += xMove
    state.updatePlayerPosition(this.localX, this.localY)
  }

  handleMouseClick(x, y){
    let bulletXPos = -(this.offsetX - GameScreen.center.x)
    let bulletYPos = -(this.offsetY - GameScreen.center.y)
    let angle = angleBetween(GameScreen.center.x, GameScreen.center.y , x, y)
    this.spawn(new Bullet(bulletXPos, bulletYPos, angle, x, y))
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
