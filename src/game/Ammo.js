import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";
import { GameScreen } from "../GraphicsHelper";
import state from "./State";

const rKey = keyBinding("r")

export class Ammo extends GameObject {

    start(){
        this.localY = GameScreen.height - 75
        this.localX = 25
    }
    
    update(delta){
        if(rKey.isDown){
            state.player.ammo = 6
        }
    }

    render(graphics){
        graphics.setLayer('ui')
        graphics.setTransparency(0.1)
        graphics.drawRect(this.offsetX, this.offsetY, 6 * 40, 40, "black")
        graphics.setTransparency(1)
        for (let i = 0; i < state.player.ammo; i++) {
            graphics.drawAmmo(this.offsetX + i * 40, this.offsetY)
        }
        graphics.restore()
    }
}
