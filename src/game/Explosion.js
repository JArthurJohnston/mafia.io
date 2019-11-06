import { GameObject } from "./engine/GameObject";

export class Explosion extends GameObject {

    constructor(x, y){
        super()
        this.localX = x
        this.localY = y
    }
    
    start(){
        this.frameCount = 6
        this.frameIndex = 0
    }

    update(delta){
        if(this.frameIndex >= this.frameCount){
            this.parent.removeChild(this)
        }
    }

    render(graphics){
        if(this.frameIndex % 2 === 0){
            this.frameCount++
            graphics.save()
            graphics.translate(this.offsetX, this.offsetY)
            graphics.drawRect(0, 0, 40, 40)
            graphics.restore()
        }
        this.frameIndex++
    }
}