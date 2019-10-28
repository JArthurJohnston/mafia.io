
function createCanvas(width, height){
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    return canvas
}


export class SpriteCache {
    constructor(width, height){
        this.canvas = createCanvas(width, height)
        this.cacheMap = {}
        this.x = 0
        this.y = 0
    }

    get context(){
        return this.canvas.getContext("2d")
    }

    get width(){
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    cacheImage(key, image, width, height){
        this.cacheMap[key] = [this.x, this.y]
        this.context.drawImage(spriteSheet, 60,0,20,20, 0,0,40,40)
    }




}