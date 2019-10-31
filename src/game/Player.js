import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";
import MouseInput from "./engine/input/MouseHandler"
import { Bullet } from "./Bullet";

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

export class Player extends GameObject {

  constructor(){
    super()
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  start(){
    this.localX = WIDTH / 2
    this.localY = HEIGHT / 2
    this.radius = 40
    MouseInput.addClickHandler(this.handleMouseClick)
  }

  render(graphics){
    graphics.drawPlayer(Math.floor(this.offsetX - 20), Math.floor(this.offsetY - 20))
  }

  update(delta){
    // this.handleKeyboardInput(delta)
  }

  handleMouseClick(x, y){
    let bullet = new Bullet(x, y, this.offsetX, this.offsetY) 
    bullet.start()
    this.parent.addChild(bullet)
  }
}
