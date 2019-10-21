export function degreesToRadians(angleInDegrees){
  return angleInDegrees * Math.PI / 180
}

export function radiansToDegrees(radians){
  return radians * 180 / Math.PI
}

export function rotateAround(cx, cy, x, y, angle) {
  var radians = degreesToRadians(angle),
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

