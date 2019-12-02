import React, {Component} from 'react'
import { GraphicsHelper, GameScreen } from '../GraphicsHelper'
import { init } from '../game'
import MouseInput from '../game/engine/input/MouseInput'
import GameServer from '../game/engine/networking/IOHandler'
import { load } from '../game/engine/Images'
import spritesheet from "../res/sprite-sheet.png"

const FRAME_INTERVAL = 1000 / 30 //30 fps
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

export class Canvas extends Component {

    constructor(){
        super()
        this.lastFrameTime = 0
        this.loop = this.loop.bind(this);
        GameServer.init('http://localhost:3001')
        this.game = init()
    }

    loop(time){
        const elapsedFrameTime = time - this.lastFrameTime;
        const deltaTime = FRAME_INTERVAL / elapsedFrameTime;
        this.game.updateLoop(deltaTime)
        this.game.renderLoop(this.g, deltaTime)
        this.lastFrameTime = time
        requestAnimationFrame(this.loop); 
    }

    componentDidMount(){
        let canvases = {
            default: this.refs.defaultCanvas, 
            fov: this.refs.fovCanvas,
            players: this.refs.playerCanvas,
            ui: this.refs.uiCanvas
        }
        this.refs.uiCanvas.addEventListener('contextmenu', e => e.preventDefault())
        this.g = new GraphicsHelper(canvases, WIDTH, HEIGHT)
        this.g.drawText(WIDTH/2, HEIGHT/2, "LOADING...", "white")
        MouseInput.init()
        GameServer.addPlayer()
        
        load(spritesheet).then(() => {
            this.game.startLoop(this.g)
            requestAnimationFrame(this.loop);
        })
    }

    render() { 
        return (
            <>
                <canvas ref="defaultCanvas" width={WIDTH} height={HEIGHT}></canvas>
                <canvas ref="fovCanvas" width={WIDTH} height={HEIGHT}></canvas>
                <canvas ref="playerCanvas" width={WIDTH} height={HEIGHT}></canvas>
                <canvas ref="uiCanvas" width={WIDTH} height={HEIGHT} onClick={MouseInput.handleClick}></canvas>
            </>
        )
    }
}
