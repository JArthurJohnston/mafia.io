
export class GraphicsHelper {

    constructor(canvas, windowWidth, windowHeight, width, height){
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.drawCircle = this.drawCircle.bind(this)
        this.drawRect = this.drawRect.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawText = this.drawText.bind(this);
        this.windowHeight = windowHeight
        this.windowWidth = windowWidth
        this.width = width
        this.height = height
        this.xOffset = this.xOffset.bind(this);
        this.yOffset = this.yOffset.bind(this);
    }

    xOffset(){
        return this.canvas.offsetLeft
    }

    yOffset(){
        return this.canvas.offsetTop
    }

    drawText(x, y, text, color, font = "30px Arial"){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, x, y);
    }

    drawCircle(x, y, radius, color){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
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

    drawRect(x, y, w, h, color){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.rect(x, y, w, h)
        this.context.fill();
        this.context.stroke();
    }
}
