import { GameObject } from "./engine/GameObject";
import { degreesToRadians, rotatePoint } from "./engine/math/PointMath";
import state from './State'
import { Explosion } from "./Explosion";
import { simpleRaycast } from "./engine/physics/RayCast";
import GameServer from "./engine/networking/IOHandler";
import { GameScreen } from "../GraphicsHelper";

const oneEighty = degreesToRadians(180)

export class Bullet extends GameObject {

    static fire(x, y, angle){
        let bulletXPos = -(x - GameScreen.center.x)
        let bulletYPos = -(y - GameScreen.center.y)
        const id = `${state.player.name}:${Date.now}`
        GameServer.spawnBullet(-x, -y, angle, id)
        return new Bullet(bulletXPos, bulletYPos, angle, id)
    }

    constructor(x, y, angle, id){
        super()
        this.prevX = x
        this.prevY = y
        this.localX = x 
        this.localY = y
        this.distance = 0
        this.angle = angle - oneEighty
        this.id = id
    }

    get name(){
        return 'Bullet'
    }

    start(){
        state.bullets[this.id] = this
        this.maxDistance = 1000
        this.size = 6
        this.speed = 20
    }

    update(delta){
        this.distance += this.speed * delta
        if((this.distance) > this.maxDistance) {
            this.explode(this.localX, this.localY)
            return
        }

        let [x, y] =  rotatePoint(this.localX, this.localY, this.localX, this.localY + this.speed * delta, this.angle)

        this.prevX = this.offsetX
        this.prevY = this.offsetY

        this.localX = Math.floor(x)
        this.localY = Math.floor(y)

        let result = simpleRaycast(this.prevX, this.prevY, this.offsetX, this.offsetY)

        if(result){
            result.object.hit()
            this.explode(this.localX, this.localY)
        }
    }

    explode(x, y){
        delete state.bullets[this.id]
        this.parent.spawn(new Explosion(x, y))
        this.destroy()
    }

    render(graphics){
        graphics.setLayer('players')
        graphics.save()
        graphics.translate(this.offsetX, this.offsetY)
        graphics.rotate(this.angle + oneEighty)
        graphics.drawBullet(0, 0)
        graphics.restore()
    }
}
