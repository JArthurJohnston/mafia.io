import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

export class Player extends GameObject {

  constructor(){
    super()
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  start(){
    this.localX = 50
    this.localY = 50
    this.radius = 20
    this.speed = 5
    this.color = "blue"
  }

  render(graphics){
    graphics.drawCircle(this.offsetX(), this.offsetY(), this.radius, this.color)
  }

  update(delta){
    this.handleKeyboardInput(delta)
  }

  handleKeyboardInput(delta){
    if(wKey.isDown){
        this.localY -= this.speed * delta
    }
    if(sKey.isDown){
        this.localY += this.speed * delta
    }
    if(aKey.isDown){
        this.localX -= this.speed * delta
    }
    if(dKey.isDown){
        this.localX += this.speed * delta
    }
  }
}
