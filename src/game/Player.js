import { GameObject } from "./engine/GameObject";
import { GameScreen } from "../GraphicsHelper";

export class Player extends GameObject {
  get name(){
    return 'Player'
  }

  start(){
    this.localX = GameScreen.center.x
    this.localY = GameScreen.center.y
  }

  render(graphics){
    graphics.drawPlayer(Math.floor(this.offsetX - 20), Math.floor(this.offsetY - 20))
  }
}
