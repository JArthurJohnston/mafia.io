import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";
import MouseInput from "./engine/input/MouseHandler"
import { Bullet } from "./Bullet";

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

export class Player extends GameObject {

  constructor(){
    super()
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  start(){
    this.localX = 50
    this.localY = 50
    this.radius = 40
    this.speed = 5
    MouseInput.addClickHandler(this.handleMouseClick)
  }

  render(graphics){
    graphics.drawPlayer(Math.floor(this.offsetX - 20), Math.floor(this.offsetY - 20))
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

  handleMouseClick(x, y){
    let bullet = new Bullet(x, y, this.offsetX, this.offsetY) 
    bullet.start()
    this.parent.addChild(bullet)
  }
}
