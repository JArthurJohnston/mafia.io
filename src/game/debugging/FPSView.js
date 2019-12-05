import { GameObject } from "../engine/GameObject";

export class FPSView extends GameObject {

  start(){
    this.localY = 25
    this.frameCount = 0
    this.fps = 0
    this.color = "white"
    setInterval(() => {
      this.fps = this.frameCount
      this.frameCount = 0
    }, 1000)
  }

  render(graphics){
    this.frameCount++
    graphics.setLayer('debug')
    graphics.drawRect(0, 0, 110, 30, "black")

    graphics.drawText(this.offsetX ,this.offsetY, `FPS: ${this.fps}`, this.color)
    graphics.restore()
  }
}