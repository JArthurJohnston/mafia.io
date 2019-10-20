import { GameObject } from "./engine/GameObject";

export class FieldOfVison extends GameObject {

  constructor(){
    super()
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  start(){
    this.lookX = 0
    this.lookY = 0
    this.color = "white"
    document.onmousemove = this.handleMouseMove
  }

  render(graphics){
    graphics.drawLine(this.offsetX(), this.offsetY(), this.lookX, this.lookY, this.color)
  }

  handleMouseMove(event){
    this.lookX = event.pageX
    this.lookY = event.pageY
  }
}