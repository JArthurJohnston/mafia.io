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
        this.points = [
            [0,0],
            [0,0],
            [0,0],
        ]
    }

    start(){
        this.maxDistance = 1000
        this.size = 6
        this.speed = 20
    }

    update(delta){
        this.distance += this.speed * delta

        // let [x, y] =   rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance, this.angle)
        // let [x2, y2] = rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance + 5, this.angle)
        // let [x3, y3] = rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance + 5, this.angle)

        // this.localX = x
        // this.localY = y

        this.points = [
            rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance, this.angle),
            rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance - 5, this.angle),
            rotatePoint(this.startX, this.startY, this.startX, this.startY + this.distance - 10, this.angle),
        ]

        if((this.distance) > this.maxDistance) {
            this.destroy()
            return
        }
        for (let i = this.points.length - 1; i >= 0; i--) {
            const [x,y] = this.points[i];
            if(state.map.tileFromScreenSpace(x, y) !== 0){
                this.destroy()
            }
            
        }
    }

    destroy(){
        this.parent.removeChild(this)
    }

    render(graphics){
        for (let i = 0; i < this.points.length; i++) {
            const [x, y] = this.points[i];
            //I should probably predraw the sprite with 3 bullets
            
            graphics.save()
            graphics.translate(x, y)
            graphics.rotate(this.angle + oneEighty)
            graphics.drawBullet(0, 0)
            graphics.restore()
        }
    }
}
