import { drawStoneFloorOn, drawPlayerOn, drawBulletOn } from "./game/engine/Images";

const ONE_RADIAN = 2 * Math.PI;
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

export const GameScreen = {
    height: HEIGHT,
    width: WIDTH,
    center: {x: WIDTH/2, y:HEIGHT/2},
}

export class GraphicsHelper {

    constructor(canvases, windowWidth, windowHeight){
        this.layers = canvases
        this.windowHeight = windowHeight
        this.windowWidth = windowWidth
        this.setupCanvases(canvases)
    }

    setupCanvases(canvases){
        for (let i = 0; i < canvases.length; i++) {
            this.getContext(i).imageSmoothingEnabled = false
        }
    }

    getContext(layerIndex = 0, config = {alpha:false}){
        return this.layers[layerIndex].getContext("2d", config)
    }

    drawText(x, y, text, color = "white", font = "30px Arial"){
        this.getContext().fillStyle = color;
        this.getContext().font = font;
        this.getContext().fillText(text, x, y);
    }

    drawCircle(x, y, radius, color){
        this.getContext().fillStyle = color;
        this.getContext().beginPath();
        this.getContext().arc(x, y, radius, 0, ONE_RADIAN);
        this.getContext().fill();
        this.getContext().stroke();
    }

    drawLine(xa, ya, xb, yb, color){
        this.getContext().strokeStyle = color;
        this.getContext().beginPath();
        this.getContext().moveTo(xa, ya);
        this.getContext().lineTo(xb, yb);
        this.getContext().stroke(); 
    }
    
    rotate(angle){
        this.getContext().rotate(angle)
    }
    
    restore(){
        this.getContext().restore()
    }

    save(){
        this.getContext().save()
    }

    translate(x, y){
        this.getContext().translate(x, y)
    }

    drawRect(x, y, w, h, color){
        this.getContext().fillStyle = color;
        this.getContext().beginPath();
        this.getContext().rect(x, y, w, h)
        this.getContext().fill();
        this.getContext().stroke();
    }

    drawSquare(x, y, size, color){
        this.drawRect(x, y, size, size, color)
    }

    drawSprite(image, x, y, width, height){
        this.getContext().drawImage(image, x, y, width, height)
    }

    drawBackground(image, x = 0, y = 0){
        this.getContext().drawImage(image, x, y)
    }

    drawPlayer(x, y){
        drawPlayerOn(this.getContext(), x, y)
    }

    drawBullet(x, y){
        drawBulletOn(this.getContext(), x, y)
    }
}

export function cacheTiledSprite(rows, columns){
    const cachCanvas = document.createElement('canvas');
    cachCanvas.width = 40 * rows
    cachCanvas.height = 40 * columns
    const context = cachCanvas.getContext('2d', {alpha: false})
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                drawStoneFloorOn(context, row * 40, column * 40)
            }
        }
    return cachCanvas
}
