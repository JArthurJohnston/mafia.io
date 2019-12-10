export default class PlayerModel {
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

export const PLAYER_STATES = {
    ALIVE: 'ALIVE',
    DEAD:'DEAD'
}
