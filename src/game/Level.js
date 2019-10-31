import { GameObject } from "./engine/GameObject";
import { cacheTiledSprite } from "../GraphicsHelper";
import { cacheLevel } from "./engine/TiledLevelBuilder";

export class Level extends GameObject {
  
  start(){
    this.cachedBackground = cacheLevel()
  }

  render(graphics){
    graphics.drawBackground(this.cachedBackground)
  }
}
