import { GameObject } from "./engine/GameObject";
import { GameScreen } from "../GraphicsHelper";

const PanelHeight = Math.floor(GameScreen.height * 0.15);

export class UIPanels extends GameObject {

    start(){
        this.rendered = false
    }

    render(graphics){
        if(!this.rendered){
            graphics.setLayer('ui')
            graphics.drawRect(0,0, GameScreen.width, PanelHeight, "black")
            graphics.drawRect(0,GameScreen.height - PanelHeight, GameScreen.width, PanelHeight, "black")
            graphics.restore()
            this.rendered = true
        }
    }
}