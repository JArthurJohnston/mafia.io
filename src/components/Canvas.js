import React, {Component} from 'react'
import { keyBinding } from '../KeyBinding'
import { GraphicsHelper } from '../GraphicsHelper'

const wKey = keyBinding("w")
const aKey = keyBinding("a")
const sKey = keyBinding("s")
const dKey = keyBinding("d")

const FRAME_INTERVAL = 1000 / 60 //60 fps
const PLAYER_SPEED = 5
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

export class Canvas extends Component {

    constructor(){
        super()
        this.state = {
            player: {
                x: 50,
                y: 50,
                lookPosition: {
                    x: 50,
                    y: 0
                }
            }
        }
        this.update = this.update.bind(this)
        this.handleKeyboardInput = this.handleKeyboardInput.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseClick = this.handleMouseClick.bind(this)
        this.loop = this.loop.bind(this)
        this.render = this.render.bind(this)
        this.elapsedFrameTime = 0
    }

    loop(time){
        const elapsedFrameTime = time - this.lastFrameTime;
        const deltaTime = FRAME_INTERVAL / elapsedFrameTime;
        this.update(deltaTime)
        this.renderFrame()
        this.lastFrameTime = time
        requestAnimationFrame(this.loop); 
    }

    handleKeyboardInput(delta){
        let xMovement = 0, yMovement = 0
        if(wKey.isDown && this.state.player.y > 0){
            yMovement -= PLAYER_SPEED * delta
        }
        if(sKey.isDown && this.state.player.y < HEIGHT){
            yMovement += PLAYER_SPEED * delta
        }
        if(aKey.isDown && this.state.player.x > 0){
            xMovement -= PLAYER_SPEED * delta
        }
        if(dKey.isDown && this.state.player.x < WIDTH){
            xMovement += PLAYER_SPEED * delta
        }
        if(xMovement !== 0 || yMovement !== 0){
            this.setState({
                player: {
                    ...this.state.player,
                    x: this.state.player.x + xMovement,
                    y: this.state.player.y + yMovement,
                }
            })
        }
    }

    handleMouseMove(event){
        this.setState({
            player: {
                ...this.state.player,
                lookPosition: {
                    x: event.pageX,
                    y: event.pageY
                }
            }
        })
    }

    update(delta){
        this.handleKeyboardInput(delta)
    }

    renderFrame(){
        this.g.drawRect(0,0, WIDTH, HEIGHT, "black")
        this.g.drawLine(this.state.player.x, this.state.player.y, this.state.player.lookPosition.x, this.state.player.lookPosition.y, "white")
        this.g.drawCircle(this.state.player.x, this.state.player.y, 20, "blue")
    }

      componentDidMount(){  
          this.g = new GraphicsHelper(this.refs.canvas.getContext("2d"))
          document.onmousemove = this.handleMouseMove
          requestAnimationFrame(this.loop);
      }
    
    handleMouseClick(event){
        console.log(event)
    }
      
    render() { 
        return (
            <canvas ref="canvas" width={WIDTH} height={HEIGHT} onClick={this.handleMouseClick}></canvas>
        )
    }
}
