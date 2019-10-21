import { GameObject } from "../GameObject";
import { rotateAround } from "../math/PointMath";

export function pointFrom(x, y){
  const point = new Point()
  point.localX = x
  point.localY = y
  return point
}

export class Point extends GameObject {
  constructor(){
    super()
    this.rotate = this.rotate.bind(this);
  }

  rotate(angle){
    let [x, y] = rotateAround(0,0, this.localX, this.localY, angle)
    this.localX = x
    this.localy = y
  }
}
