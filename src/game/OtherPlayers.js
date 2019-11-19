import { GameObject } from "./engine/GameObject";
import state from "./State";
import { degreesToRadians, angleFromPoints } from "./engine/math/PointMath";
import { GameScreen } from "../GraphicsHelper";
import { angleDifference } from "./engine/shapes/Line";
import input from './engine/input/MouseInput'

const minViewableAngle = degreesToRadians(-45)
const maxViewableAngle = degreesToRadians(45)

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

    visibleToPlayer(){
        let angle = angleFromPoints(GameScreen.center.x, GameScreen.center.y, this.offsetX, this.offsetY, input.x, input.y)
        return angle > minViewableAngle && angle < maxViewableAngle
    }
    
    render(graphics){
        if(this.visibleToPlayer()){
            graphics.setLayer('players')
            graphics.drawText(this.offsetX - 50, this.offsetY - 25, this.player.name, "red", '15px arial')
            graphics.drawRect(this.offsetX - 20, this.offsetY - 20, 40, 40, "cyan")
            graphics.restore()

        }
    }
}