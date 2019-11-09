import { state } from "../../State"

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

const STEP = 5

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

export function simpleRaycast(startX, startY, endX, endY){
    let points = bresenhamLine(startX, startY, endX, endY)
    for (let i = 0; i < points.length; i += STEP) {
        const [x, y] = points[i];
        if(state.map.tileFromScreenSpace(x, y) !== 0)
            return [x, y]
    }
}
