import { 
  drawHorizontalWallOn, 
  drawVerticalWallOn, 
  drawAngeled1WallOn, 
  drawAngeled2WallOn , 
  drawAngeled3WallOn , 
  drawAngeled4WallOn,  
  drawStoneFloorOn
} from "./Images";

import defaultTiles from "../maps/default2.json"

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

const TILE_SIZE = 40

export function cacheLevel() {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d', {alpha: false})
  const mapWidth = defaultTiles[0].length * TILE_SIZE;
  const mapHeight = defaultTiles.length * TILE_SIZE;
  const screenHeight = window.innerHeight
  const screenWidth = window.innerWidth

  canvas.width = mapWidth + screenWidth
  canvas.height = mapHeight + screenHeight

  context.fillStyle = "black";
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height)
  context.fill();
  context.stroke();
  context.save()
  drawTilesOn(context, defaultTiles,  screenWidth, screenHeight)
  return canvas
}

export function drawTilesOn(context, tiles, w, h, size=TILE_SIZE){
  for (let y = 0; y < tiles.length; y++) {
    const row = tiles[y];
    for (let x = 0; x < row.length; x++) {
      const tileIndex = row[x];
      const xPosition = x * size + w / 2;
      const yPosition = y * size + h / 2;
      drawStoneFloorOn(context, xPosition, yPosition)
      if(tileIndex > 0)
        tileFunctions[tileIndex](context, xPosition, yPosition)
    }
  }
}
