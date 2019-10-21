import { GameObject } from "./engine/GameObject";
import { Line, buildLine, slope } from "./engine/shapes/Line";

export class FieldOfVison extends GameObject {

  constructor(){
    super()
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  start(){
    this.lookX = 0
    this.lookY = 0
    this.color = "white"
    this.line1 = buildLine(this.offsetX(), this.offsetY(), 0, 1000)
    this.line2 = buildLine(this.offsetX(), this.offsetY(), 1, 1000)
    document.onmousemove = this.handleMouseMove
  }

  update(delta){
    // let direction = slope(this.offsetX(), this.offsetY(), this.lookX, this.lookY)
  }

  render(graphics){
    graphics.drawLine(this.offsetX(), this.offsetY(), this.lookX, this.lookY, this.color)
  }

  lookDirection(){

  }

  handleMouseMove(event){
    this.lookX = event.pageX
    this.lookY = event.pageY
  }
}