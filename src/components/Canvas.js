import React, {Component} from 'react'
import { GraphicsHelper, GameScreen } from '../GraphicsHelper'
import { init } from '../game'
import MouseInput from '../game/engine/input/MouseInput'
import GameServer from '../game/engine/networking/IOHandler'
import { load } from '../game/engine/Images'
import spritesheet from "../res/sprite-sheet.png"
import DebugCommands from './DebugCommands'

const FRAME_INTERVAL = 1000 / 30 //30 fps

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
        this.game.renderLoop(this.graphics, deltaTime)
        this.lastFrameTime = time
        requestAnimationFrame(this.loop); 
    }

    componentDidMount(){
        let canvases = {
            default: this.refs.defaultCanvas, 
            fov: this.refs.fovCanvas,
            players: this.refs.playerCanvas,
            ui: this.refs.uiCanvas,
            debug: this.refs.debugCanvas,
        }
        this.refs.debugCanvas.addEventListener('contextmenu', event => event.preventDefault())
        this.graphics = new GraphicsHelper(canvases, GameScreen.width, GameScreen.height)
        this.graphics.drawText(GameScreen.width/2, GameScreen.height/2, "LOADING...", "white")
        MouseInput.init()
        
        load(spritesheet).then(() => {
            this.game.startLoop(this.graphics)
            requestAnimationFrame(this.loop);
        })
    }

    render() { 
        return (
            <>
                <canvas ref="defaultCanvas" width={GameScreen.width} height={GameScreen.height}></canvas>
                <canvas ref="fovCanvas" width={GameScreen.width} height={GameScreen.height}></canvas>
                <canvas ref="playerCanvas" width={GameScreen.width} height={GameScreen.height}></canvas>
                <canvas ref="uiCanvas" width={GameScreen.width} height={GameScreen.height}></canvas>
                <canvas ref="debugCanvas" width={GameScreen.width} height={GameScreen.height} onClick={MouseInput.handleClick}></canvas>
                {/* <div 
                    ref='screenInput' 
                    style={{width: '100vw', height: '100vh'}} 
                    onClick={() => {
                        alert('clicked')
                        // MouseInput.handleClick()
                    }}
                /> */}
                <DebugCommands />
            </>
        )
    }
}
