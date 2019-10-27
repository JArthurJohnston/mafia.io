import React, {Component} from 'react'
import { GraphicsHelper } from '../GraphicsHelper'
import { init } from '../game'
import MouseInput from '../game/engine/input/MouseHandler'
import { load } from '../game/engine/Images'
import spritesheet from "../res/sprite-sheet.png"

const FRAME_INTERVAL = 1000 / 60 //60 fps
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
        this.g = new GraphicsHelper(this.refs.canvas, WIDTH, HEIGHT)
        this.g.drawText(WIDTH/2, HEIGHT/2, "LOADING...", "white")
        MouseInput.init()
        load(spritesheet).then(() => {
            this.game.startLoop(this.g)
            requestAnimationFrame(this.loop);
        })
    }

    render() { 
        return (
            <canvas ref="canvas" width={WIDTH} height={HEIGHT} onClick={MouseInput.handleClick}></canvas>
        )
    }
}
