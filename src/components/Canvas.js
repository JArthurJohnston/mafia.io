import React, {Component} from 'react'
import { GraphicsHelper } from '../GraphicsHelper'
import { init } from '../game'

const FRAME_INTERVAL = 1000 / 60 //60 fps
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth
const ASPECT_RATIO = 9/16
const RESOLUTION = {
    width: 1152,
    height: 648
}

function baseDimension(){
    return HEIGHT > WIDTH ? WIDTH : HEIGHT
}

export class Canvas extends Component {

    constructor(){
        super()
        this.width = baseDimension()
        this.height = this.width * ASPECT_RATIO
        this.canvasStyle = {
            width: `${this.width}px`,
            height: `${this.height}px`,
        }
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
          this.g = new GraphicsHelper(this.refs.canvas, RESOLUTION.width, RESOLUTION.height, this.width, this.height)

          this.game.startLoop()
          requestAnimationFrame(this.loop);
      }
    
    handleMouseClick(event){
        console.log(event.clientX, event.clientY)
    }

    render() {
        return (
            <canvas id='screen' ref="canvas" style={this.canvasStyle} width={RESOLUTION.width} height={RESOLUTION.height} onClick={this.handleMouseClick}></canvas>
        )
    }
}
