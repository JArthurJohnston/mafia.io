import { GameObject } from "../GameObject";
import { getCache } from "../Images";

export class CacheView extends GameObject{

  constructor(){
    super()
    this.rendered = false
  }

  render(graphics){
    if(!this.rendered){
      graphics.setLayer('ui')
      graphics.getContext().drawImage(getCache(), 0, 40)
      graphics.restore()
      this.rendered = true
    }
  }
}