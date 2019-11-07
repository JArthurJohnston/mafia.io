import { GameObject } from "./engine/GameObject";
import MouseInput from "./engine/input/MouseHandler"
import { Bullet } from "./Bullet";
import { GameScreen } from "../GraphicsHelper";

export class Player extends GameObject {

  constructor(){
    super()
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  start(){
    this.localX = GameScreen.center.x
    this.localY = GameScreen.center.y
    this.radius = 40
    MouseInput.addClickHandler(this.handleMouseClick)
  }

  render(graphics){
    graphics.drawPlayer(Math.floor(this.offsetX - 20), Math.floor(this.offsetY - 20))
  }

  handleMouseClick(x, y){
    this.parent.spawn(new Bullet(x, y, this.offsetX, this.offsetY))
  }
}
