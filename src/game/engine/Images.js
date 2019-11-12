import { degreesToRadians } from "./math/PointMath"

let spriteSheet, cache

export const SPRITE_WIDTH = 40
export const SPRITE_HEIGHT = 40

export function load(imagePath){
  return new Promise((resolve, reject) => {
    spriteSheet = new Image()
    spriteSheet.onload = () => cacheImages(spriteSheet, resolve)
    spriteSheet.onerror = reject
    spriteSheet.src = imagePath
  })
}

/**
 * Caches and scales the spritesheet file
 * 
 * @param {Image} spriteSheet 
 * @param {function} callback 
 */
function cacheImages(spriteSheet, callback) {
  cache = document.createElement('canvas');
  cache.width = 460
  cache.height = 80
  const context = cache.getContext('2d')
  context.imageSmoothingEnabled = false
  // cache the player
  context.drawImage(spriteSheet, 0,0,20,20, 0,0,40,40)

  // cache the floor
  context.save()
  context.translate(40,0)
  context.drawImage(spriteSheet, 20,0,20,20, 0,0,40,40)
  context.restore()

  //cache the bullet
  context.save()
  context.translate(80, 0)
  context.drawImage(spriteSheet, 80,0,20,20, 0,0,20,20)
  context.restore()
  // cache the horizontal wall
  context.save()
  context.translate(100,0)
  context.drawImage(spriteSheet, 40,0,20,20, 0,0,40,40)
  context.restore()

  // cache the vertical wall
  context.save()
  context.translate(180,0) //need to double the width when rotating, real position is 140
  context.rotate(degreesToRadians(90))
  context.drawImage(spriteSheet, 40,0,20,20, 0,0,40,40)
  context.restore()

  // //cache the angeled wall corners

  context.save()
  context.translate(180,0)
  context.drawImage(spriteSheet, 60,0,20,20, 0,0,40,40)
  context.restore()

  context.save()
  context.translate(260,0) //actual 220
  context.rotate(degreesToRadians(90))
  context.drawImage(spriteSheet, 60,0,20,20, 0,0,40,40)
  context.restore()

  context.save()
  context.translate(260,40)
  context.rotate(degreesToRadians(-90))
  context.drawImage(spriteSheet, 60,0,20,20, 0,0,40,40)
  context.restore()
  
  context.save()
  context.translate(340,40)
  context.rotate(degreesToRadians(180))
  context.drawImage(spriteSheet, 60,0,20,20, 0,0,40,40)
  context.restore()

  //cache the skull
  context.save()
  context.translate(80,20)
  context.drawImage(spriteSheet, 0,20,20,20, 0,0,20,20)
  context.restore()

  //cache the badge
  context.save()
  context.translate(340,0)
  context.drawImage(spriteSheet, 20,20,20,20, 0,0,20,20)
  context.restore()

  //cache ammo
  context.save()
  context.translate(360,0)
  context.drawImage(spriteSheet, 40,20,20,20, 0,0,40,40)
  context.restore()

  //cache first explosion frame

  context.save()
  context.translate(400,0)
  context.drawImage(spriteSheet, 60,20,20,20, 0,0,20,20)
  context.restore()

    //cache second explosion frame

    context.save()
    context.translate(400,20)
    context.drawImage(spriteSheet, 80,20,20,20, 0,0,20,20)
    context.restore()

    //cache third explosion frame

    context.save()
    context.translate(420,0)
    context.drawImage(spriteSheet, 0,40,20,20, 0,0,20,20)
    context.restore()

    //cache fourth explosion frame

    context.save()
    context.translate(420,20)
    context.drawImage(spriteSheet, 20,40,20,20, 0,0,20,20)
    context.restore()

    //cache fifth explosion frame

    context.save()
    context.translate(440,0)
    context.drawImage(spriteSheet, 40,40,20,20, 0,0,20,20)
    context.restore()

  callback(cache)
}

export function drawPlayerOn(context, x, y) {
  context.drawImage(cache, 0,0,SPRITE_WIDTH,SPRITE_HEIGHT, x, y,SPRITE_WIDTH,SPRITE_HEIGHT)
}

export function drawStoneFloorOn(context, x, y) {
  context.drawImage(cache, 40,0,40,40, x, y,40,40)
}

export function drawBulletOn(context, x, y) {
  context.drawImage(cache, 80,0,20,20, x, y, 20,20)
}

export function drawSkullOn(context, x, y) {
  context.drawImage(cache, 80,20,20,20, x, y, 20,20)
}

export function drawBadgeOn(context, x, y) {
  context.drawImage(cache, 340,0,20,20, x, y, 20,20)
}

export function drawHorizontalWallOn(context, x, y) {
  context.drawImage(cache, 100,0,40,40, x, y, 40,40)
}

export function drawVerticalWallOn(context, x, y) {
  context.drawImage(cache, 140,0,40,40, x, y, 40,40)
}

export function drawAngeled1WallOn(context, x, y) {
  context.drawImage(cache, 180,0,40,40, x, y, 40,40)
}

export function drawAngeled2WallOn(context, x, y) {
  context.drawImage(cache, 220,0,40,40, x, y, 40,40)
}

export function drawAngeled3WallOn(context, x, y) {
  context.drawImage(cache, 260,0,40,40, x, y, 40,40)
}

export function drawAngeled4WallOn(context, x, y) {
  context.drawImage(cache, 300,0,40,40, x, y, 40,40)
}

export function drawAmmoOn(context, x, y) {
  context.drawImage(cache, 360,0,40,40, x, y, 40,40)
}

const explosionIndeces = [
  {x:400, y:0},
  {x:400, y:20},
  {x:420, y:0},
  {x:420, y:20},
  {x:440, y:0},
]

export function drawExplosionOn(context, x, y, frame){
  context.drawImage(cache, explosionIndeces[frame].x, explosionIndeces[frame].y, 20, 20,  x, y, 20, 20)
}

export function getCache(){
  return cache
}
