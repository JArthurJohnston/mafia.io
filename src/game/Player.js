import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";
import MouseInput from "./engine/input/MouseHandler"
import { Bullet } from "./Bullet";
import smiley from "../res/simple-smiley.png"

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

export class Player extends GameObject {

  constructor(){
    super()
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.imageIsLoaded = false
    this.loadedImage = this.loadedImage.bind(this);
  }

  loadedImage(){
    this.imageIsLoaded = true;
  }

  loadImage(){
    let image = new Image()
    image.src = ""
    image.addEventListener("load", this.loadedImage)
    image.src = smiley
    return image
  }

  start(){
    this.localX = 50
    this.localY = 50
    this.radius = 40
    this.speed = 5
    this.color = "blue"
    this.image = this.loadImage()
    MouseInput.addClickHandler(this.handleMouseClick)
  }

  render(graphics){
    if(this.imageIsLoaded)
      graphics.drawSprite(this.image, this.offsetX, this.offsetY, this.radius, this.radius) 
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
