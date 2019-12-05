import { GameObject } from "../engine/GameObject";
import input from '../engine/input/MouseInput'

export default class MousePosition extends GameObject {

    render(graphics){
        graphics.setLayer('debug')            
        graphics.drawText(input.x, input.y, `(${input.x}, ${input.y})`, "red", '15px arial')
        graphics.restore()
    }
}