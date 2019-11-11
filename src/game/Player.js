import { GameObject } from "./engine/GameObject";
import { GameScreen } from "../GraphicsHelper";

const PLAYER_STATES = {
  BYSTANDER: 'BYSTANDER', //0
  MAFIA: 'MAFIA',         //1
  DETECTIVE: 'DETECTIVE', //2
}

export class Player extends GameObject {

  constructor(){
    super()
    this.width = 40
    this.midpoint = this.width/2
    this.state = PLAYER_STATES.BYSTANDER
  }

  get name(){
    return 'Player'
  }

  start(){
    this.state = Object.values(PLAYER_STATES)[Math.floor(Math.random() * 3)]
    this.localX = GameScreen.center.x
    this.localY = GameScreen.center.y
  }

  render(graphics){
    graphics.drawPlayer(Math.floor(this.offsetX - this.midpoint), Math.floor(this.offsetY - this.midpoint))
    if(this.state === PLAYER_STATES.MAFIA)
      graphics.drawSkull(Math.floor(this.offsetX + 10), Math.floor(this.offsetY + 10))
    if(this.state === PLAYER_STATES.DETECTIVE)
      graphics.drawBadge(Math.floor(this.offsetX + 10), Math.floor(this.offsetY + 10))
  }
}
