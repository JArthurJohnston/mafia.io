import { Point } from "./Point";

export class Line{

  constructor(x1, y1, x2, y2){
    this.start = new Point(x1, y1)
    this.end = new Point(x2, y2)
    this.rotateAround = this.rotateAround.bind(this);
    this.rotate = this.rotate.bind(this);
    this.getSlope = this.getSlope.bind(this);
  }

  rotateAround(centerX, centerY, angle){
    this.start.rotateAround(centerX, centerY, angle)
    this.end.rotateAround(centerX, centerY, angle)
  }

  rotate(angle){
    this.rotateAround(0,0, angle)
  }

  getSlope(){
    return slope(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}

export function distanceBetween(x1,y1, x2,y2){
  return Math.sqrt(
    Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)
  )
}

export function slope(x1, y1, x2, y2){
  let slopeValues = riseOverRun(x1, y1, x2, y2)
  return slopeValues[0]/slopeValues[1]
}

export function riseOverRun(x1, y1, x2, y2){
  return [y2 - y1, x2 - x1]
}

export function buildLine(x1, y1, slope, distance){
  let point = findPoint(x1, y1, slope, distance)

  return new Line(x1, y1, point.x, point.y)
}

export function unitLengthVector(slope){
  return Math.sqrt(1 + Math.pow(slope, 2))
}

export function findPoint(startX, startY, rise, run, distance){
  if(rise === 0){
    return [startX + distance, startY]
  }
  if(run===0){
    return [startX, startY + distance]
  }
  let slope  = rise/run
  let unit = 1 / unitLengthVector(slope)

  let x = (startX + (distance * unit))
  let y = (startY + slope * distance * unit) * (rise/rise)

  if(run < 0){
    x *= -1
    y *= -1
  }

  return [x, y]
}

export function midpointBetween(x1, y1, x2, y2){
  return [(x1 + x2) / 2, (y1 + y2) / 2]
}

/**
 * returns the angle, in radians, between 2 lines given the start and end coordinates of each line
 * 
 * @param {number} x1a 
 * @param {number} y1a 
 * @param {number} x2a 
 * @param {number} y2a 
 * @param {number} x1b 
 * @param {number} y1b 
 * @param {number} x2b 
 * @param {number} y2b 
 * 
 * @returns {number} the angle in radians
 */
export function angleDifference(x1a, y1a, x2a,y2a, x1b,y1b, x2b, y2b){
  let slopeA = slope(x1a,y1a, x2a,y2a)
  let slopeB = slope(x1b,y1b, x2b,y2b)

  return Math.atan(
      (slopeB - slopeA) / (1 + (slopeB * slopeA))
  )
}

export function angle(x1a, y1a, x2a,y2a, x1b,y1b, x2b, y2b){
  return Math.abs(
    angleDifference(x1a, y1a, x2a,y2a, x1b,y1b, x2b, y2b)
  )
}