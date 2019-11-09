import React, {Component} from 'react'
import { GraphicsHelper } from '../GraphicsHelper'
import { init } from '../game'
import MouseInput from '../game/engine/input/MouseInput'
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
        let canvases = [this.refs.defaultCanvas]
        this.g = new GraphicsHelper(canvases, WIDTH, HEIGHT)
        this.g.drawText(WIDTH/2, HEIGHT/2, "LOADING...", "white")
        MouseInput.init()
        load(spritesheet).then(() => {
            this.game.startLoop(this.g)
            requestAnimationFrame(this.loop);
        })
    }

    render() { 
        return (
            <>
                <canvas ref="defaultCanvas" width={WIDTH} height={HEIGHT} onClick={MouseInput.handleClick}></canvas>
                {/* <canvas ref="fovCanvas" width={WIDTH} height={HEIGHT} onClick={MouseInput.handleClick}></canvas> */}
            </>
        )
    }
}
