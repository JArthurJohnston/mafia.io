import { GameObject } from "./engine/GameObject";
import { angleBetween, degreesToRadians } from "./engine/math/PointMath";
const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    constructor(targetX, targetY, startX, startY){
        super()
        //technically I should be translating world coordinates into local coords, but since this objects parent offset will be 0,0 it wont matter
        this.localX = startX 
        this.localY = startY
        this.distance = 0
        
        this.angle = angleBetween(startX, startY, targetX, targetY) - oneEighty
    }

    start(){
        this.maxDistance = 1000
        this.color="white"
        this.size = 6
        this.speed = 30
    }

    update(delta){
        this.distance += Math.floor(this.speed * delta)
        if((this.distance - this.localY) > this.maxDistance) {
            this.parent.removeChild(this)
        }
    }

    render(graphics){
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.rotate(this.angle)
        graphics.drawSquare(0, this.distance, this.size, this.color)
        graphics.restore()
    }
}
