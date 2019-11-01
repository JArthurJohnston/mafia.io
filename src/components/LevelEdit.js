import React, {Component} from "react"
import { DEFAULT_TILES, drawTilesOn } from "../game/engine/TiledLevelBuilder";
import { load } from "../game/engine/Images";
import spritesheet from "../res/sprite-sheet.png"
import './styles/LevelEdit.scss'

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

const CANVAS_WIDTH = 52*40
const CANVAS_HEIGHT = 52*40

const canvasStyle = {

}

class LevelEdit extends Component {
    constructor(){
        super()
        this.state = {
            width: 50,
            height: 40,
            tileSize: 40,
            tiles: DEFAULT_TILES
        }
    }

    componentDidMount(){        
        const canvas = this.refs.levelCanvas;
        load(spritesheet).then(() => {
            drawTilesOn(canvas.getContext("2d"), this.state.tiles)
        })
    }

    render(){
        let {} = this.props;
        return(
            <div className='level-edit-container'>
                <canvas ref='palletCanvas' className='pallet' width={400} height={80}/>
                <canvas className='level-canvas' style={{position: 'relative'}} ref="levelCanvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
            </div>
        )
    }
}

export default LevelEdit;