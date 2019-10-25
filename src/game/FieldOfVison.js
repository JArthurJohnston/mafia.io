import { GameObject } from "./engine/GameObject";
import { angleBetween, radiansToDegrees, degreesToRadians } from "./engine/math/PointMath";

const VIEW_OFFSET = degreesToRadians(140)

export class FieldOfVison extends GameObject {

  constructor(){
    super()
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.fovDistance = 1000
  }

  start(graphics){
    this.lookX = 0
    this.lookY = 0
    this.angle = 0
    this.color = "white"
    document.onmousemove = this.handleMouseMove
  }

  update(delta){
    this.angle = angleBetween(this.offsetX(), this.offsetY(), this.lookX, this.lookY)
  }

  render(graphics){
    graphics.save()
    graphics.translate(this.offsetX(), this.offsetY())
    graphics.rotate(this.angle - VIEW_OFFSET)
    graphics.drawLine(0, 0, 0, this.fovDistance, this.color)
    graphics.drawLine(0, 0, this.fovDistance, 0, this.color)
    // graphics.drawText(10, 0, `Angle: ${radiansToDegrees(this.angle)}`, this.color)
    graphics.restore()
  }

  handleMouseMove(event){
    this.lookX = event.pageX
    this.lookY = event.pageY
  }
}