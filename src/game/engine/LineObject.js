import { GameObject } from "./GameObject";

export class LineObject extends GameObject {

  constructor(){
    super()
    this.x1 = 0
    this.y1 = 0
    this.x2 = 0
    this.y2 = 0
    this.color = "white"
  }

  
  render(graphics){
    // graphics.drawLine
  }


}