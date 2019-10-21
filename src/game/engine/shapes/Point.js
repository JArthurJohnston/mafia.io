import { degreesToRadians } from "../math/PointMath";

export class Point {
  constructor(x, y){
    this.x = x
    this.y = y
    this.rotateAround = this.rotateAround.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  rotateAround(originX, originY, angle){
    const theta = degreesToRadians(angle)
    const cosTheta = Math.cos(theta)
    const sinTheta = Math.sin(theta)
    this.x = cosTheta * (this.x-originX) - sinTheta * (this.y-originY) + originX
    this.y = sinTheta * (this.x-originX) + cosTheta * (this.y-originY) + originY
  }

  rotate(angle){
    this.rotateAround(0,0, angle)
  }
}
