import { GameObject } from "./engine/GameObject";

export class Explosion extends GameObject {

    constructor(x, y){
        super()
        this.localX = x
        this.localY = y
        this.frameIndex = 0
        this.frameCount = 25
    }
    
    get name(){
        return 'Explosion'
    }

    update(delta){
        if(this.frameIndex >= this.frameCount){
            this.parent.removeChild(this)
        }
        this.frameIndex++
    }

    render(graphics){
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.drawRect(0, 0, 40, 40, "red")
        graphics.restore()
    }
}
