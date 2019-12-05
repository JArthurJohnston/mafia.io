import { GameObject } from "../engine/GameObject";
import { GameScreen } from "../../GraphicsHelper";

export class ScreenInfoView extends GameObject {

    constructor(){
        super()
        this.localY = 55
    }

    render(graphics){
            graphics.setLayer('debug')
            graphics.drawRect(this.offsetX, this.offsetY, 110, 30, "black")
        
            graphics.drawText(this.offsetX ,this.offsetY, `SCREEN: (${GameScreen.width}, ${GameScreen.height})`, this.color)
            graphics.restore()
        
    }
}