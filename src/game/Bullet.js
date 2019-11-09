import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import {state} from './State'
import { Explosion } from "./Explosion";
import { midpointBetween } from "./engine/shapes/Line";

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(x, y, angle){
        super()
        //technically I should be translating world coordinates into local coords, but since this objects parent offset will be 0,0 it wont matter
        this.localX = x 
        this.localY = y
        this.distance = 0
        this.angle = angle
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 20
    }

    update(delta){
        this.distance += this.speed * delta

        let [x, y] =  rotatePoint(this.localX, this.localY, this.localX, this.localY + this.distance, this.angle)

        this.localX = Math.floor(x)
        this.localY = Math.floor(y)

        if((this.distance) > this.maxDistance) {
            this.destroy()
            return
        }

        // let [midX, midY] = midpointBetween(this.previousX, this.previousY, this.localX, this.localY)

        // if(state.map.tileFromScreenSpace(midX, midY) !== 0 || state.map.tileFromScreenSpace(x, y) !== 0){
        //     this.parent.spawn(new Explosion(x, y))
        //     this.destroy()
        // }   
    }

    render(graphics){
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.rotate(this.angle + oneEighty)
        graphics.drawBullet(0, 0)
        graphics.restore()
    }
}
