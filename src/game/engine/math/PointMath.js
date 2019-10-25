export function degreesToRadians(angleInDegrees){
  return angleInDegrees * Math.PI / 180
}

export function radiansToDegrees(radians){
  return radians * 180 / Math.PI
}

export function rotateAround(centerX, centerY, x, y, angle) {
  return rotate_point(x, y, centerX, centerY, angle)
}

function rotate_point(pointX, pointY, originX, originY, angle) {
  angle = degreesToRadians(angle);
  let cosTheta = Math.cos(angle)
  let sinTheta = Math.sin(angle)
  return {
      x: cosTheta * (pointX-originX) - sinTheta * (pointY-originY) + originX,
      y: sinTheta * (pointX-originX) + cosTheta * (pointY-originY) + originY
  };
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
