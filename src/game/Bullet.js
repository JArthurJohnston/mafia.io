import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import {state} from './State'

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(targetX, targetY, startX, startY){
        super()
        //technically I should be translating world coordinates into local coords, but since this objects parent offset will be 0,0 it wont matter
        this.localX = startX 
        this.localY = startY
        this.startX = startX
        this.startY = startY
        this.distance = 0
        this.angle = angleBetween(startX, startY, targetX, targetY) - oneEighty
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 30
    }

    update(delta){
        this.distance += this.speed * delta

        let [x, y] =rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance, this.angle)

        this.localX = x
        this.localY = y

        let tile = state.map.tileFromScreenSpace(this.offsetX, this.offsetY)
        if((this.distance) > this.maxDistance || tile !== 0) {
            this.destroy()
        }
    }

    destroy(){
        this.parent.removeChild(this)
    }

    render(graphics){
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.rotate(this.angle + oneEighty)
        graphics.drawBullet(0, 0)
        graphics.restore()
    }
}
