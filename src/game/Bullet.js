import { GameObject } from "./engine/GameObject";
import { degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import {state} from './State'
import { Explosion } from "./Explosion";
import { raycast, simpleRaycast } from "./engine/physics/RayCast";

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(x, y, angle, targetX, targetY){
        super()
        this.prevX = x
        this.prevY = y
        this.localX = x 
        this.localY = y
        this.distance = 0
        this.angle = angle - oneEighty
        this.target = {x: targetX, y: targetY}
    }

    get name(){
        return 'Bullet'
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 20
        // let result = raycast(this.offsetX, this.offsetY, this.target.x, this.target.y)
        // if(result){
        //     alert(result)
        // }
    }

    update(delta){
        this.distance += this.speed * delta
        if((this.distance) > this.maxDistance) {
            this.destroy()
            this.parent.spawn(new Explosion(this.localX, this.localY))
            return
        }

        let [x, y] =  rotatePoint(this.localX, this.localY, this.localX, this.localY + this.speed * delta, this.angle)

        this.prevX = this.offsetX
        this.prevY = this.offsetY

        this.localX = Math.floor(x)
        this.localY = Math.floor(y)

        let result = simpleRaycast(this.prevX, this.prevY, this.offsetX, this.offsetY)

        // if(state.map.tileFromScreenSpace(this.offsetX, this.offsetY) !== 0){
        if(result){
            this.parent.spawn(new Explosion(this.localX, this.localY))
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
