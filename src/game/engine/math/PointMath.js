export function degreesToRadians(angleInDegrees){
  return angleInDegrees * Math.PI / 180
}

export function radiansToDegrees(radians){
  return radians * 180 / Math.PI
}

export function rotateAround(centerX, centerY, x, y, angle) {
  // var radians = degreesToRadians(angle),
  //     cos = Math.cos(radians),
  //     sin = Math.sin(radians),
  //     nx = (cos * (x - centerX)) + (sin * (y - centerY)) + centerX,
  //     ny = (cos * (y - centerY)) - (sin * (x - centerX)) + centerY;
  // return [nx, ny];
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


