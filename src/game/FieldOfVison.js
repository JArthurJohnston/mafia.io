import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians } from "./engine/math/PointMath";
import input from './engine/input/MouseHandler'

const VIEW_OFFSET = degreesToRadians(140)

export class FieldOfVison extends GameObject {

  constructor(){
    super()
    this.fovDistance = 1000
  }

  start(){
    this.lookX = 0
    this.lookY = 0
    this.angle = 0
    this.color = "white"
  }

  update(delta){
    this.angle = angleBetween(this.offsetX, this.offsetY, input.x, input.y)
  }

  render(graphics){
    graphics.save()
    graphics.translate(this.offsetX, this.offsetY)
    // graphics.theContext().clearRect(0,0, graphics.windowWidth, graphics.windowHeight)
    graphics.globalAlpha = 0.2
    // graphics.theContext().beginPath()
    graphics.rotate(this.angle - VIEW_OFFSET)
    graphics.drawRect(-graphics.windowWidth, -(graphics.windowWidth * 1.5)/2, graphics.windowWidth, graphics.windowWidth * 1.5, "black")
    graphics.drawRect(0, -graphics.windowWidth, graphics.windowWidth, graphics.windowWidth, "black")
    graphics.restore()
  }
}