import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import {state} from './State'
import { Explosion } from "./Explosion";
import { midpointBetween } from "./engine/shapes/Line";

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(targetX, targetY, startX, startY){
        super()
        //technically I should be translating world coordinates into local coords, but since this objects parent offset will be 0,0 it wont matter
        this.localX = startX 
        this.localY = startY
        this.previousX = startX
        this.previousY = startY
        this.startX = startX
        this.startY = startY
        this.distance = 0
        this.angle = angleBetween(startX, startY, targetX, targetY) - oneEighty
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 20
    }

    update(delta){
        this.distance += this.speed * delta

        this.previousX = this.localX
        this.previousY = this.localY

        let [x, y] =   rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance, this.angle)

        this.localX = x
        this.localY = y

        if((this.distance) > this.maxDistance) {
            this.destroy()
            return
        }

        let [midX, midY] = midpointBetween(this.previousX, this.previousY, this.localX, this.localY)

        if(state.map.tileFromScreenSpace(midX, midY) !== 0 || state.map.tileFromScreenSpace(x, y) !== 0){
            this.parent.spawn(new Explosion(x, y))
            this.destroy()
        }   
    }

    render(graphics){
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.rotate(this.angle + oneEighty)
        graphics.drawBullet(0, 0)
        graphics.restore()
    }
}
