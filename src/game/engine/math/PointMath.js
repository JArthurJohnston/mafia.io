import { distanceBetween } from "../shapes/Line";

export function degreesToRadians(angleInDegrees){
  return angleInDegrees * Math.PI / 180
}

export function radiansToDegrees(radians){
  return radians * 180 / Math.PI
}

export function rotatePoint(centerX, centerY, x, y, angle) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);

  // translate point back to origin:
  x -= centerX;
  y -= centerY;

  const xnew =  x * c + -y * s;
  const ynew =  x * s + y * c;

  // translate point back:
  return [xnew + centerX, ynew + centerY]
}

/**
 * Returns the angle, in radians, between the line made by the 4 coordinate parameters and 
 * a vertical line pointing upwards starting at the first coordinates. This angle will be within the range 0 & +-180
 * 
 * @param {number} x1 the x coordinate of the first point
 * @param {number} y1 the y coordinate of the first point
 * @param {number} x2 the x coordinate of the second point
 * @param {number} y2 the y coordinate of the second point
 * @returns {number} the angle in radians
 */
export function angleBetween(x1, y1, x2, y2){
  return Math.atan2(x2 - x1, (y2 - y1) * -1 );
}

/**
 * returns the angle between two lines that meet at the origin point
 * @param {number} originX 
 * @param {number} originY 
 * @param {number} p1x 
 * @param {number} p1y 
 * @param {number} p2x 
 * @param {number} p2y 
 */
export function angleFromPoints(originX,originY, p1x,p1y, p2x,p2y){
  let dist1 = distanceBetween(originX, originY, p1x, p1y)
  let dist2 = distanceBetween(originX, originY, p2x, p2y)
  let dist3 = distanceBetween(p1x, p1y, p2x, p2y)

  return Math.acos(((dist1 * dist1) + (dist2 * dist2) - (dist3 * dist3)) / (2 * dist1 * dist2))
}
