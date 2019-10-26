import { GameObject } from "./engine/GameObject";

export class Level extends GameObject {

  start(){
    this.color = "black"
  }

  render(graphics){
    graphics.drawRect(this.offsetX, this.offsetY, graphics.windowWidth, graphics.windowHeight, this.color)
    graphics.drawLine(graphics.windowWidth/2, 0,  graphics.windowWidth/2, graphics.windowHeight, "white")
    graphics.drawLine(0, graphics.windowHeight/2, graphics.windowWidth, graphics.windowHeight/2, "white")
  }
}
