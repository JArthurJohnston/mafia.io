import { GameObject } from "./engine/GameObject";
import state from "./State";
import { angleBetween, radiansToDegrees } from "./engine/math/PointMath";
import { stat } from "fs";
import { GameScreen } from "../GraphicsHelper";

export default class OtherPlayers extends GameObject {

    constructor(){
        super()
        this.playerMap = {}
    }

    start(){
        //spawn all the players
        state.otherPlayers.forEach(eachOtherPlayer => {
            this.spawn(new Frenemy(eachOtherPlayer))
        });
    }

    update(delta){
        
    }

    render(graphics){
        // graphics.setLayer('players')
        // state.OtherPlayers.forEach(eachOtherPlayer => {
        //     graphics.drawText(this.offsetX - 50, this.offsetY - 25, eachOtherPlayer.name, "cyan", '15px arial')
        //     graphics.drawRect(this.offsetX, this.offsetY, 40, 40, "cyan")
        // });
        // graphics.restore()
    }
}

class Frenemy extends GameObject {

    constructor(otherPlayer){
        super()
        this.player = otherPlayer
    }

    start(){
        this.localX = this.player.x + state.map.offsets.x
        this.localY = this.player.y + state.map.offsets.y
    }

    update(delta){
        this.localX = this.player.x + state.map.offsets.x
        this.localY = this.player.y + state.map.offsets.y
    }
    
    render(graphics){
        graphics.setLayer('players')
        let angle = angleBetween(GameScreen.center.x, GameScreen.center.y, this.offsetX, this.offsetY)
        graphics.drawLine(GameScreen.center.x, GameScreen.center.y, this.offsetX, this.offsetY)
        graphics.drawText(this.offsetX - 50, this.offsetY - 25, radiansToDegrees(angle - state.player.direction), "red", '15px arial')
        graphics.drawRect(this.offsetX - 20, this.offsetY - 20, 40, 40, "cyan")
        graphics.restore()
    }
}