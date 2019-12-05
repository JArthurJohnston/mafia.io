import { GameObject } from "./engine/GameObject";
import state, { PLAYER_STATES } from "./State";
import { degreesToRadians, angleFromPoints } from "./engine/math/PointMath";
import { GameScreen } from "../GraphicsHelper";
import input from './engine/input/MouseInput'
import { distanceBetween } from "./engine/shapes/Line";
import GameServer from "./engine/networking/IOHandler";

const minViewableAngle = degreesToRadians(-45)
const maxViewableAngle = degreesToRadians(45)

export default class OtherPlayers extends GameObject {

    constructor(){
        super()
        this.playerMap = {}
        this.addPlayer = this.addPlayer.bind(this);
        GameServer.onPlayerAdded(this.addPlayer)
        this.localX = GameScreen.center.x
        this.localY = GameScreen.center.y
    }

    addPlayer(player){
        this.spawn(new Frenemy(player))
    }

    name(){
        return 'OtherPlayers'
    }

    start(){
        //spawn all the players
        // state.otherPlayers.forEach(eachOtherPlayer => {
        //     if(eachOtherPlayer.name !== state.player.name)
        //         this.spawn(new Frenemy(eachOtherPlayer))
        // });
    }
}

class Frenemy extends GameObject {

    constructor(otherPlayer){
        super()
        this.player = otherPlayer
        this.playerUpdated = this.playerUpdated.bind(this);
        GameServer.onUpdate(this.playerUpdated)
    }

    name(){
        return 'Frenemy'
    }

    playerUpdated(stateOfTheWorld){
        // console.log(JSON.stringify(stateOfTheWorld));
        
        const player = stateOfTheWorld.playerMap[this.player.name]
        this.player = player
        this.localX = player.x //+ state.map.offsets.x
        this.localY = player.y //+ state.map.offsets.y
    }

    updatePosition(){
        /*
        the state.map.offsets will always be negative, 
        these will be parented to the player
        */
        this.localX = this.player.x //+ state.map.offsets.x
        this.localY = this.player.y //+ state.map.offsets.y
    }

    start(){
        this.updatePosition()
    }

    get color(){
        return this.player.state === PLAYER_STATES.ALIVE ? "cyan" : "white"
    }

    visibleToPlayer(){
        let angle = angleFromPoints(GameScreen.center.x, GameScreen.center.y, this.offsetX, this.offsetY, input.x, input.y)
        const distanceToPlayer = distanceBetween(this.offsetX, this.offsetY, GameScreen.center.x, GameScreen.center.y)
        return angle > minViewableAngle && angle < maxViewableAngle || distanceToPlayer <= 70
    }
    
    render(graphics){
        if(this.visibleToPlayer()){
            graphics.setLayer('players')
            graphics.drawText(this.offsetX - 50, this.offsetY - 25, this.player.name, "red", '15px arial')
            graphics.drawRect(this.offsetX - 20, this.offsetY - 20, 40, 40, this.color)
            graphics.restore()
        }
    }
}
