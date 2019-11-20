import { GameObject } from "./engine/GameObject";
import state from "./State";
import { degreesToRadians, angleFromPoints } from "./engine/math/PointMath";
import { GameScreen } from "../GraphicsHelper";
import input from './engine/input/MouseInput'
import { distanceBetween } from "./engine/shapes/Line";

const minViewableAngle = degreesToRadians(-45)
const maxViewableAngle = degreesToRadians(45)

export default class OtherPlayers extends GameObject {

    constructor(){
        super()
        this.playerMap = {}
    }

    name(){
        return 'OtherPlayers'
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

    name(){
        return 'Frenemy'
    }

    updatePosition(){
        /*
        the state.map.offsets will always be negative, 
        */
        this.localX = this.player.x + state.map.offsets.x
        this.localY = this.player.y + state.map.offsets.y
    }

    start(){
        this.updatePosition()
    }

    update(delta){
        this.updatePosition()
    }

    visibleToPlayer(){
        let angle = angleFromPoints(GameScreen.center.x, GameScreen.center.y, this.offsetX, this.offsetY, input.x, input.y)
        const distanceToPlayer = distanceBetween(this.offsetX, this.offsetY, GameScreen.center.x, GameScreen.center.y)
        return angle > minViewableAngle && angle < maxViewableAngle || distanceToPlayer <= 70
    }
    
    render(graphics){
        if(this.visibleToPlayer()){
            graphics.setLayer('players')
            graphics.drawText(this.offsetX - 50, this.offsetY - 125, distanceBetween(this.offsetX, this.offsetY, GameScreen.center.x, GameScreen.center.y), "red", '15px arial')
            graphics.drawText(this.offsetX - 50, this.offsetY - 150, [GameScreen.center.x, GameScreen.center.y], "red", '15px arial')
            graphics.drawText(this.offsetX - 50, this.offsetY - 25, this.player.name, "red", '15px arial')
            graphics.drawRect(this.offsetX - 20, this.offsetY - 20, 40, 40, "cyan")
            graphics.restore()
        }
    }
}
