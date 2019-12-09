import { GameObject } from "./engine/GameObject";
import { keyBinding } from "../KeyBinding";
import { GameScreen } from "../GraphicsHelper";
import state from "./State";

const rKey = keyBinding("r")

const RELOAD_INTERVAL = 25

export class Ammo extends GameObject {

    start(){
        this.localY = GameScreen.height - 75
        this.localX = 25
        this.reloadTime = 0
    }
    
    update(delta){
        if(rKey.isDown){
            state.player.isReloading = true
        }
        this.handleReload(delta)
    }

    handleReload(delta){
        if(state.player.isReloading){
            if(state.player.ammo < 6){
                if(this.reloadTime >= RELOAD_INTERVAL){
                    state.player.ammo += 1
                    this.reloadTime = 0
                }
                this.reloadTime += delta
            } else {
                state.player.isReloading = false
            }
        }
    }

    render(graphics){
        graphics.setLayer('ui')
        graphics.setTransparency(0.15)
        graphics.drawRect(this.offsetX, this.offsetY, 6 * 32, 40, "black")
        graphics.setTransparency(1)
        for (let i = 0; i < state.player.ammo; i++) {
            graphics.drawAmmo(this.offsetX + i * 30, this.offsetY)
        }
        graphics.restore()
    }
}
