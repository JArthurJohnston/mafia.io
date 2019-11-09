import { GameObject } from "./engine/GameObject";
import { degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import {state} from './State'
import { Explosion } from "./Explosion";

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(x, y, angle){
        super()
        this.localX = x 
        this.localY = y
        this.distance = 0
        this.angle = angle - oneEighty
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 5
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

        if(state.map.tileFromScreenSpace(this.offsetX, this.offsetY) !== 0){
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
