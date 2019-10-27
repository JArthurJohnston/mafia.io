import { drawStoneFloorOn, drawPlayerOn } from "./game/engine/Images";

const ONE_RADIAN = 2 * Math.PI;

export class GraphicsHelper {

    constructor(canvas, windowWidth, windowHeight){
        this.context = canvas.getContext("2d", {alpha: false})
        this.windowHeight = windowHeight
        this.windowWidth = windowWidth
        this.context.imageSmoothingEnabled = false
        this.context.imageSmoothingQuality = "low"
    }

    drawText(x, y, text, color, font = "30px Arial"){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, x, y);
    }

    drawCircle(x, y, radius, color){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, ONE_RADIAN);
        this.context.fill();
        this.context.stroke();
    }

    drawLine(xa, ya, xb, yb, color){
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(xa, ya);
        this.context.lineTo(xb, yb);
        this.context.stroke(); 
    }
    
    rotate(angle){
        this.context.rotate(angle)
    }
    
    restore(){
        this.context.restore()
    }

    save(){
        this.context.save()
    }

    translate(x, y){
        this.context.translate(x, y)
    }

    drawRect(x, y, w, h, color){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.rect(x, y, w, h)
        this.context.fill();
        this.context.stroke();
    }

    drawSquare(x, y, size, color){
        this.drawRect(x, y, size, size, color)
    }

    drawSprite(image, x, y, width, height){
        this.context.drawImage(image, x, y, width, height)
    }

    drawBackground(image){
        this.context.drawImage(image, 0, 0)
    }

    drawPlayer(x, y){
        drawPlayerOn(this.context, x, y)
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
