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
    // document.querySelector('#screen').onmousemove = this.handleMouseMove
    document.onmousemove = this.handleMouseMove //TODO extract stuff like this into an input handler
  }

  render(graphics){
    const x = this.lookX * (graphics.width / window.innerWidth) - graphics.xOffset()
    const y = this.lookY * (graphics.height / window.innerHeight) - graphics.yOffset()
    graphics.drawLine(this.offsetX(), this.offsetY(), x, y, this.color)
  }

  handleMouseMove(event){
    this.lookX = event.pageX
    this.lookY = event.pageY
  }
}

