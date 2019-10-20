import { GameObject } from "./GameObject";

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
    graphics.drawText(this.offsetX(),this.offsetY(), `FPS: ${this.fps}`, this.color)
  }
}