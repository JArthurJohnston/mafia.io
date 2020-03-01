import GameServer from "../engine/networking/IOHandler"
import { PLAYER_STATES } from "../Player"

export default class PlayerModel {
    constructor(name, x, y){
      this.state = PLAYER_STATES.ALIVE
      this.name = name
      this.x = x
      this.y = y
    }
  
    hit(){
      this.state = PLAYER_STATES.DEAD
      GameServer.killPlayer({
        name: this.name,
        x: this.x,
        y: this.y,
        state: PLAYER_STATES.DEAD
      })
    }
}

