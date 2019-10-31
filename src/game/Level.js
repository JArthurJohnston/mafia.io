import { GameObject } from "./engine/GameObject";
import { cacheTiledSprite } from "../GraphicsHelper";
import { cacheLevel } from "./engine/TiledLevelBuilder";
import { keyBinding } from "../KeyBinding";

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")


export class Level extends GameObject {
  
  start(){
    this.speed = 5
    this.cachedBackground = cacheLevel()
  }

  update(delta){
    this.handleKeyboardInput(delta)
  }

  render(graphics){
    graphics.drawBackground(this.cachedBackground, this.localX, this.localY)
  }

  handleKeyboardInput(delta){
    if(wKey.isDown){
        this.localY += this.speed * delta
    }
    if(sKey.isDown){
        this.localY -= this.speed * delta
    }
    if(aKey.isDown){
        this.localX += this.speed * delta
    }
    if(dKey.isDown){
        this.localX -= this.speed * delta
    }
  }
}
