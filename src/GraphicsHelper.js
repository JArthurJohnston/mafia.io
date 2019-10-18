
export class GraphicsHelper {

    constructor(context){
        this.ctx = context
        this.drawCircle = this.drawCircle.bind(this)
        this.drawRect = this.drawRect.bind(this)
        this.drawLine = this.drawLine.bind(this)
    }

    drawCircle(x, y, radius, color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawLine(xa, ya, xb, yb, color){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(xa, ya);
        this.ctx.lineTo(xb, yb);
        this.ctx.stroke(); 
    }

    drawRect(x, y, w, h, color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h)
        this.ctx.fill();
        this.ctx.stroke();
    }
}