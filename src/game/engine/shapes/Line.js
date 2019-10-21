import { Point } from "./Point";

export class Line{

  constructor(x1, y1, x2, y2){
    this.start = new Point(x1, y1)
    this.end = new Point(x2, y2)
  }

  rotateAround(centerX, centerY, angle){
    this.start.rotateAround(centerX, centerY, angle)
    this.end.rotateAround(centerX, centerY, angle)
  }

  rotate(angle){
    this.rotateAround(0,0, angle)
  }
}

export function distanceBetween(x1,y1, x2,y2){
  return Math.sqrt(
    Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)
  )
}

export function slope(x1, y1, x2, y2){
  return (y2 - y1)/(x2 - x1)
}

export function buildLine(x1, y1, slope, distance){
  let point = findPoint(x1, y1, slope, distance)

  return new Line(x1, y1, point.x, point.y)
}

export function findPoint(startX, startY, slope, distance){
  let unit = Math.sqrt(1 + Math.pow(slope, 2))
  let x = startX + (distance/unit)
  let y = startY + ((distance * slope)/unit)

  return new Point(x, y)
}