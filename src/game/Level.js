import { GameObject } from "./engine/GameObject";
import { cacheTiledSprite } from "../GraphicsHelper";

export class Level extends GameObject {
  
  start(){
    this.cachedBackground = cacheTiledSprite(53, 27)
  }

  render(graphics){
    graphics.drawBackground(this.cachedBackground)
  }
}
