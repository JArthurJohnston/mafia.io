import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians } from "./engine/math/PointMath";
import input from './engine/input/MouseHandler'
import {state} from "./State"

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
  }

  update(delta){
    this.angle = angleBetween(this.offsetX, this.offsetY, input.x, input.y)
    state.player.direction = this.angle
  }

  /*
  I should try prerendering the rectangles that make up the blinders. then draw every
  other pixel in them to create a transparent effect. then draw that as an image.
  or I could make a transparent blinder sprite and just import and use that.
  */

  render(graphics){    
    graphics.save()
    graphics.translate(this.offsetX, this.offsetY)
    // graphics.globalAlpha = 0.2
    graphics.rotate(this.angle - VIEW_OFFSET)
    graphics.drawRect(-graphics.windowWidth, -(graphics.windowWidth * 1.5)/2, graphics.windowWidth, graphics.windowWidth * 1.5, "black")
    graphics.drawRect(0, -graphics.windowWidth, graphics.windowWidth, graphics.windowWidth, "black")
    graphics.restore()
  }
}