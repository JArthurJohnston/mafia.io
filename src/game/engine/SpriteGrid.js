import { GameObject } from "./GameObject";

export class SpriteGrid extends GameObject {

  constructor(imagePath){
    super()
    let image = new Image()
    image.src = imagePath
    this.image = image
  }

  
}