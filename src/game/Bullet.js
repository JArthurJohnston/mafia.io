import { GameObject } from "./engine/GameObject";
import { distanceBetween } from "./engine/shapes/Line";
import { angleBetween } from "./engine/math/PointMath";

export class Bullet extends GameObject {

    constructor(targetX, targetY, startX, startY){
        super()
        this.targetX = targetX
        this.targetY = targetY
        this.startX = startX
        this.startY = startY
    }

    start(){
        this.maxDistance = 1000
        this.color="white"
        this.size = 6

        let speed = 20
        let angle = angleBetween(this.startX, this.startY, this.targetX, this.targetY)

        this.xDistance = Math.cos(angle) * speed
        this.yDistance = Math.sin(angle) * speed
    }

    update(delta){
        this.localX += this.xDistance * delta
        this.localY += this.yDistance * delta
        if(distanceBetween(this.offsetX, this.offsetY, this.startX, this.startY) > this.maxDistance){
            this.parent.removeChild(this)
        }
    }

    render(graphics){
        graphics.drawRect(this.offsetX, this.offsetY, this.size, this.size, this.color)
    }
}
