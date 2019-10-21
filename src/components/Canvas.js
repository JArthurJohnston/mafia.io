import React, {Component} from 'react'
import { GraphicsHelper } from '../GraphicsHelper'
import { init } from '../game'

const FRAME_INTERVAL = 1000 / 60 //60 fps
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

export class Canvas extends Component {

    constructor(){
        super()
        this.handleMouseClick = this.handleMouseClick.bind(this)
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
        this.g = new GraphicsHelper(this.refs.canvas.getContext("2d"), WIDTH, HEIGHT)
        this.game.startLoop()
        requestAnimationFrame(this.loop);
    }
    
    handleMouseClick(event){
        console.log(event.clientX, event.clientY)
    }

    render() { 
        return (
            <canvas ref="canvas" width={WIDTH} height={HEIGHT} onClick={this.handleMouseClick}></canvas>
        )
    }
}
