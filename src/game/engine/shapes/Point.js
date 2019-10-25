
export class Point {
  constructor(x, y){
    this.x = x
    this.y = y
    this.rotateAround = this.rotateAround.bind(this);
    this.rotate = this.rotate.bind(this);
    this.subtract = this.subtract.bind(this);
    this.coords = this.coords.bind(this);
  }

  rotateAround(originX, originY, angle){
    // const theta = degreesToRadians(angle)
    const cosTheta = Math.cos(angle)
    const sinTheta = Math.sin(angle)

    /**
     * 
    p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
    p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
     */
    this.x = (cosTheta * (this.x - originX) - sinTheta * (this.y - originY)) + originX
    this.y = (sinTheta * (this.x - originX) + cosTheta * (this.x - originX)) + originY

    return this
  }

  rotate(thetaRadians){
    const cosTheta = Math.cos(thetaRadians)
    const sinTheta = Math.sin(thetaRadians)

    this.x = (this.x * cosTheta) - (this.y * sinTheta)
    this.y = (this.x * sinTheta) + (this.y * cosTheta)
    return this
  }

  subtract(otherPoint){
    return [(this.x - otherPoint.x) * -1, (this.y - otherPoint.y) * -1]
  }

  coords(){
    return [this.x, this.y]
  }
}
