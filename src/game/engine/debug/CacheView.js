import { GameObject } from "../GameObject";
import { getCache } from "../Images";

export class CacheView extends GameObject{

  render(graphics){
    graphics.getContext().drawImage(getCache(), 0, 20)
  }
}