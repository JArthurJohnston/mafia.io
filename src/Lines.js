import { POINT_CONVERSION_COMPRESSED } from "constants"

export class Point {
  constructor(x, y){
    this.x = x
    this.y = y
    this.rotate90 = this.rotate90.bind(this)
  }

  rotate90(originX, originY){
    return rotate90AroundOrigin(originX, originY, this.x, this.y)
  }
}

export class Line {
  constructor(pointA, pointB){
    this.start = pointA
    this.end = pointB
    this.slope = this.slope.bind(this)
    this.angle = this.angle.bind(this)
  }

  slope(){
    return findSlope(this.start.x, this.start.y, this.end.x, this.end.y)
  }

  angle(){
    return slopeToAngle(this.slope())
  }
}

export function intersectionBetween(x1, y1, x2, y2, x3, y3, x4, y4){
  const a1 = y2 - y1;
  const b1 = x1 - x2;
  const c1 = a1 * x1 + b1 * y1;

  const a2 = y4 - y3;
  const b2 = x3 - x4;
  const c2 = a2 * x3 + b2 * y3;

  const determinant = a1 * b2 - a2 * b1;

  if(determinant === 0)
    return null;
  
  let finalX = (b2 * c1 - b1*c2) / determinant
  let finalY = (a1 * c2 - a2 * c1) / determinant;

  return new Point(finalX, finalY)
}

function findSlope(x1, y1, x2, y2){
  return (y2 - y1) / (x2 - x1)
}

function slopeToAngle(slope){
  return Math.atan(slope/100)
}

function angleToSlope(angle){
  return Math.tan(angle)
}

function rotate90AroundOrigin(xOrigin, yOrigin, x, y){
  const x1 = x - xOrigin
  const y1 = y - yOrigin

  const x2 = y1 * -1
  const y2 = x1

  const x3 = x2 + xOrigin
  const y3 = y2 + yOrigin

  return new Point(x3, y3)
}

function rotate(point, origin,  angle) {
  const cosTheta = Math.cos(angle)
  const sinTheta = Math.sin(angle)
  const xPrime = point.x * cosTheta - point.y * sinTheta
  const yPrime = point.y * cosTheta - point.x * sinTheta
  
  return new Point(xPrime, yPrime)
}