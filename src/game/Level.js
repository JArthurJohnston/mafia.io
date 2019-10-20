import { GameObject } from "./engine/GameObject";

export class Level extends GameObject {

  start(){
    this.color = "black"
  }

  render(graphics){
    graphics.drawRect(this.offsetX(), this.offsetY(), graphics.windowWidth, graphics.windowHeight, this.color)
  }
}
