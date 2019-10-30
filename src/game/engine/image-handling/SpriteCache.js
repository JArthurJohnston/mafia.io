import { degreesToRadians } from "../math/PointMath"

const SPRITE_SIZE = 20

function createCanvas(width, height){
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    return canvas
}

/**
 * all sprites for the game are 20x20
 */
export class SpriteCacheBuilder {
    constructor(image, width = SPRITE_SIZE, height = SPRITE_SIZE, numberOfSprites = 6){
        this.x = 0
        this.iterator = new SpriteIterator(image, width, height)
        this.mappedSprites = {}
        this.scaleFactor = 1
        this.rotation = 0
        this.spriteKey = ""
        this.transparency = 1
        this.canvas = createCanvas(width * numberOfSprites, height)
    }

    get context(){
        return this.canvas.getContext("2d")
    }

    mapSprite(name){
        this.spriteKey = name
        return this
    }

    scale(factor){
        this.scaleFactor = factor
        return this
    }

    /**
     * @param {number} angle in degrees
     */
    rotate(angle){
        this.rotation = degreesToRadians(angle)
        return this
    }

    /**
     * 
     * @param {number} alpha a number between 0 and 1.
     */
    transparency(alpha){
        this.transparency = alpha
    }

    cache(){
        const scaledWidth = Math.floor(this.iterator.width * this.scaleFactor)
        const scaledHeight = Math.floor(this.iterator.height * this.scaleFactor)
        this.mappedSprites[this.spriteKey] = {
            position: this.x,
            width: scaledWidth,
            height: scaledHeight
        }
        this.context.save()
        this.context.translate(this.x, 0)
        this.context.rotate(this.rotation)
        this.context.drawImage(
            this.iterator.next(), this.x, 0, 
            scaledWidth, 
            scaledHeight)
        this.context.restore()
        
        this.x += scaledWidth
        this.scaleFactor = 1
        this.rotation = 0
        this.spriteKey = ""
        return this
    }

    done(){
        return new SpriteCache(this.mappedSprites, this.canvas)
    }
}

class SpriteCache {
    constructor(mappings, image){
        this.mappings = mappings
        this.image = image
    }

    drawSpriteWithNameOnAt(spriteName, context, x, y){
        let {position, width, height} = this.mappings[spriteName]
        context.drawImage(this.image, position, 0, width, height, x, y, width, height)
    }
}

/**
 * The default values in the constructor are for MY spritesheet.
 */
export class SpriteIterator {
    constructor(image, width = SPRITE_SIZE, height = SPRITE_SIZE){
        this.image = image
        this.spriteWidth= width
        this.spriteHeight = height
        this.x = 0
        this.y = 0
        this.canvas = createCanvas(width, height)
    }

    get context(){
        return this.canvas.getContext("2d")
    }

    next(){
        this.context.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight)
        if(this.x + this.spriteWidth >= this.image.width){
            this.y += this.spriteHeight
            this.x = 0
        } else {
            this.x += this.spriteWidth
        }
        return this.canvas
    }

}

//this is just pseudo-code for the interface I want to have

let imageyThing = {}

let spriteMap = imageyThing
    .loadSprite("smiley")
    .scale(2)
    .rotate(90)
    .cache()
    .loadSprite("floor")
    .scale(2)
    .cache()
    .loadSprite("horizontal_wall")
    .cache()
    .done()

let player = spriteMap.get("player")

