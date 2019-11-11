import { GameObject } from "./engine/GameObject";
import state from "./State";
import { GameScreen } from "../GraphicsHelper";

export class MiniMap extends GameObject {

    constructor(){
        super()
        this.dotSize = 2
    }

    start(){
        this.image = this.renderMiniMap()
        this.localX = GameScreen.width - 125
        this.localY = GameScreen.height - 125
    }

    update(delta){
        
    }

    render(graphics){
        graphics.setLayer('ui')
        graphics.drawSprite(this.image, this.offsetX,this.offsetY, this.image.width, this.image.height)
        graphics.restore()
    }

    renderMiniMap(){
        const tileMap = state.map
        const mapImage = document.createElement('canvas')
        mapImage.width = tileMap.width * this.dotSize
        mapImage.height = tileMap.height * this.dotSize
        const context = mapImage.getContext('2d')
        for (let y = 0; y < tileMap.height; y++) {
            for (let x = 0; x < tileMap.width; x++) {
                if(tileMap.tileAt(x, y) === 0){
                    drawRect(context, x * this.dotSize, y * this.dotSize, this.dotSize, this.dotSize, "black")
                } else {
                    drawRect(context, x * this.dotSize, y * this.dotSize, this.dotSize, this.dotSize, "green")
                }
            }
        }
        return mapImage
    }
}

function drawRect(context, x, y, w, h, color) {
    context.fillStyle = color;
    context.beginPath();
    context.rect(x, y, w, h)
    context.fill();
}