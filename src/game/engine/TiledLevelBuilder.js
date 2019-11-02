import { 
  drawHorizontalWallOn, 
  drawVerticalWallOn, 
  drawAngeled1WallOn, 
  drawAngeled2WallOn , 
  drawAngeled3WallOn , 
  drawAngeled4WallOn,  
  drawStoneFloorOn
} from "./Images";

import defaultTiles from "../maps/default.json"

/**
 * 0: floor
 * 1: --
 * 2: |
 * 3: -/
 * 4: \-
 * 5: _\
 * 6: /_
 */
export const tileFunctions = [
  drawStoneFloorOn,
  drawHorizontalWallOn,
  drawVerticalWallOn,
  drawAngeled1WallOn,
  drawAngeled2WallOn,
  drawAngeled3WallOn,
  drawAngeled4WallOn,
]

/**
 * a 52 x 52 map
 * 50 x 50 is playable, with a a wall around the outer edge
 */

const TILE_SIZE = 40

export function cacheLevel() {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d', {alpha: false})
  canvas.width = defaultTiles[0].length * TILE_SIZE
  canvas.height = defaultTiles.length * TILE_SIZE

  drawTilesOn(context, defaultTiles)
  return canvas
}

export function drawTilesOn(context, tiles, size=TILE_SIZE){
  for (let y = 0; y < tiles.length; y++) {
    const row = tiles[y];
    for (let x = 0; x < row.length; x++) {
      const tileIndex = row[x];
      drawStoneFloorOn(context, x * size, y * size)
      if(tileIndex > 0)
        tileFunctions[tileIndex](context, x * size, y * size)
    }
  }
}
