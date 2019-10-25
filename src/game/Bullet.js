import { GameObject } from "./engine/GameObject";
import { distanceBetween } from "./engine/shapes/Line";

export class Bullet extends GameObject {

    constructor(rise, run, startX, startY){
        super()
        this.rise = rise
        this.run = run
        this.startX = startX
        this.startY = startY
    }

    start(){
        this.speed = 20
        this.maxDistance = 1000
        this.color="white"
        this.size = 6
    }

    update(delta){
        this.localX += this.run  * delta / 10
        this.localY += this.rise * delta / 10
        if(distanceBetween(this.offsetX(), this.offsetY(), this.startX, this.startY) > this.maxDistance){
            this.parent.removeChild(this)
        }
    }

    render(graphics){
        graphics.drawRect(this.offsetX(), this.offsetY(), this.size, this.size, this.color)
    }
}
