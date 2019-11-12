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

    render(graphics){
        graphics.setLayer('ui')
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.drawSprite(this.image, 0,0, this.image.width, this.image.height)
        graphics.drawRect(
            this.dotSize * state.player.x,
            this.dotSize * state.player.y,
            4, 4,
            "magenta"
        )
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