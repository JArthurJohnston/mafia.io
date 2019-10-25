
export class GraphicsHelper {

    constructor(context, windowWidth, windowHeight){
        this.context = context
        this.drawCircle = this.drawCircle.bind(this)
        this.drawRect = this.drawRect.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.rotate = this.rotate.bind(this);
        this.restore = this.restore.bind(this);
        this.save = this.save.bind(this);
        this.translate = this.translate.bind(this);
        this.windowHeight = windowHeight
        this.windowWidth = windowWidth
        this.context.imageSmoothingEnabled = false
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
}
