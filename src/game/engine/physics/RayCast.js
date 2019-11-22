import { state } from "../../State"
import { distanceBetween } from "../shapes/Line"
import { GameScreen } from "../../../GraphicsHelper"

/**
 * returns all the points on a line between (x0, y0) and (x1, y1)
 * for better performance you can increase the step (defaults to 1)
 * 
 * @param {number} x0 
 * @param {number} y0 
 * @param {number} x1 
 * @param {number} y1 
 */
export function bresenhamLine(x0, y0, x1, y1){
    const isSteep = Math.abs(y1, - y0) > Math.abs(x1, x0)

    if(isSteep){
        let temp = x0
        x0 = y0
        y0 = temp

        temp = x1
        x1 = y1
        y1 = temp
    }
    if(x0 > x1){
        let temp = x0
        x0 = x1
        x1 = temp

        temp = y0
        y0 = y1
        y1 = temp
    }

    const deltaX = x1 - x0,
        deltaY = Math.abs(y1 - y0),
        yStep = (y0 < y1) ? 1 : -1,
        points = []

    let error = 0, y = y0

    for (let x = x0; x <= x1; x++) {
        isSteep ? points.push([Math.floor(y), Math.floor(x)]) : points.push([Math.floor(x), Math.floor(y)])
        error += deltaY
        if(error * 2 >= deltaX){
            y += yStep
            error -= deltaX
        }
    }

    return points
}

const STEP = 1

export function raycast(startX, startY, endX, endY){
    let points = bresenhamLine(startX, startY, endX, endY)
    if(points[0][0] === startX){
        for (let i = 0; i < points.length; i += STEP) {
            const [x, y] = points[i];
            if(state.map.tileFromScreenSpace(x, y) !== 0)
                return [x, y]
        }
    } else {
        for (let i = points.length - 1; i >= 0; i -= STEP) {
            const [x, y] = points[i];
            if(state.map.tileFromScreenSpace(x, y) !== 0)
                return [x, y]
        }
    }
}

/**
 * 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} endX 
 * @param {number} endY 
 * @returns {Array} the result with the x and y coords of the hit
 */
export function simpleRaycast(startX, startY, endX, endY){
    let points = bresenhamLine(startX, startY, endX, endY)
    for (let i = 0; i < points.length; i += STEP) {
        const [x, y] = points[i];
        const wall = hitAWall(x, y)
        if(wall !== null){
            return new RaycasResult(wall, x, y)
        }
        const player = hitAnotherPlayer(x, y)
        if(player !== null){
            return new RaycasResult(player, x, y)
        }
    }
}

function hitAWall(xPosition, yPosition){
    const tile = state.map.tileFromScreenSpace(xPosition, yPosition)
    return tile.index !== 0 ? tile : null
}

class RaycasResult {
    constructor(object, x, y){
        this.object = object
        this.position = {x, y}
    }
}

export function hitAnotherPlayer(xPosition, yPosition){
    for (let i = 0; i < state.otherPlayers.length; i++) {
        const eachPlayer = state.otherPlayers[i];

        let playerX = eachPlayer.x + state.map.offsets.x
        let playerY = eachPlayer.y + state.map.offsets.y
        if(distanceBetween(xPosition, yPosition, playerX, playerY) <= 50){
            return eachPlayer
        }
    }
    return null
}
