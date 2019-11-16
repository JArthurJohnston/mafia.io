import { GameObject } from "./engine/GameObject";

export class Explosion extends GameObject {

    constructor(x, y){
        super()
        this.localX = x
        this.localY = y
        this.frameIndex = 0
        this.frameCount = 4
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
        graphics.translate(Math.floor(this.offsetX - 10), Math.floor(this.offsetY -10))
        graphics.drawExplosion(0,0, this.frameIndex)
        graphics.restore()
    }
}
