import { GameObject } from "./engine/GameObject";
import { GameScreen } from "../GraphicsHelper";
import state from "./State";

export const PLAYER_ROLES = {
  BYSTANDER: 'BYSTANDER',
  MAFIA: 'MAFIA',
  DETECTIVE: 'DETECTIVE',
}

export const PLAYER_STATES = {
  ALIVE: 'ALIVE',
  DEAD:'DEAD'
}

export default class Player extends GameObject {

  constructor(){
    super()
    this.width = 40
    this.midpoint = this.width/2
    this.role = PLAYER_ROLES.BYSTANDER
    this.state = PLAYER_STATES.ALIVE
  }

  get name(){
    return 'Player'
  }

  start(){
    this.role = this.randomRole()
    this.localX = GameScreen.center.x
    this.localY = GameScreen.center.y
  }

  randomRole() {
    return Object.values(PLAYER_ROLES)[Math.floor(Math.random() * 3)];
  }

  render(graphics){
    graphics.setLayer('players')
    graphics.drawText(this.offsetX - 50, this.offsetY - 25, state.player.name, "cyan", '15px arial')
    graphics.drawPlayer(Math.floor(this.offsetX - this.midpoint), Math.floor(this.offsetY - this.midpoint))
    
    if(this.role === PLAYER_ROLES.MAFIA)
      graphics.drawSkull(Math.floor(this.offsetX + 10), Math.floor(this.offsetY + 10))
    if(this.role === PLAYER_ROLES.DETECTIVE)
      graphics.drawBadge(Math.floor(this.offsetX + 10), Math.floor(this.offsetY + 10))

    
    graphics.restore()
  }
}
