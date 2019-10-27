
// const spriteCache = document.createElement("canvas")
// spriteCache.width = 20
// spriteCache.height = 20

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
  cache.width = 80
  cache.height = 40
  const context = cache.getContext('2d')
  context.imageSmoothingEnabled = false
  context.drawImage(spriteSheet, 0,0,40,20, 0,0,80,40)
  callback()
}

export function drawPlayerOn(context, x, y) {
  context.drawImage(cache, 0,0,SPRITE_WIDTH,SPRITE_HEIGHT, x, y,SPRITE_WIDTH,SPRITE_HEIGHT)
}

export function drawStoneFloorOn(context, x, y) {
  context.drawImage(cache, 40,0,40,40, x, y,40,40)
}
