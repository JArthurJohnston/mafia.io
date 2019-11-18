import { GameObject } from "./engine/GameObject";

export class ScreenWipe extends GameObject {

    constructor(){
        super()
        this.layer = 'default'
    }

    render(graphics){
        graphics.setLayer(this.layer)
        graphics.clear()
        graphics.restore()
    }
}