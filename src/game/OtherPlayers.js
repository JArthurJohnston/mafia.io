import { GameObject } from "./engine/GameObject";
import state from "./State";

export class OtherPlayers extends GameObject {

    start(){
        //spawn all the players
        state.OtherPlayers.forEach(eachOtherPlayer => {
            this.spawn(new Frenemy(eachOtherPlayer))
        });
    }

    update(delta){
        
    }

    render(graphics){
        graphics.setLayer('players')
        state.OtherPlayers.forEach(eachOtherPlayer => {
            graphics.drawText(this.offsetX - 50, this.offsetY - 25, eachOtherPlayer.name, "cyan", '15px arial')
            graphics.drawRect(this.offsetX, this.offsetY, 40, 40, "cyan")
        });
        graphics.restore()
    }

    playerPositionFor(player){
        
    }
}

export class Frenemy extends GameObject {

    constructor(otherPlayer){
        this.player = otherPlayer
    }

    start(){
    }

    update(delta){
        
    }

    render(graphics){
        graphics.setLayer('players')
        graphics.drawText(this.offsetX - 50, this.offsetY - 25, this.player.name, "cyan", '15px arial')
        graphics.drawRect(this.offsetX, this.offsetY, 40, 40, "cyan")
        graphics.restore()
    }
}