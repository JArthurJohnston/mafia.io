import React, {Component} from "react"
import { DEFAULT_TILES, drawTilesOn, tileFunctions } from "../game/engine/TiledLevelBuilder";
import { load } from "../game/engine/Images";
import spritesheet from "../res/sprite-sheet.png"
import './styles/LevelEdit.scss'

const WIDTH = window.innerWidth
const CANVAS_WIDTH = 52*40
const CANVAS_HEIGHT = 52*40

export default class LevelEdit extends Component {
    constructor(){
        super()
        this.state = {
            tiles: DEFAULT_TILES
        }
        this.handlePaint = this.handlePaint.bind(this);
    }

    componentDidMount(){
        const pallet = this.refs.palletCanvas
        load(spritesheet).then((cachedSpriteSheet) => {
            this.renderTiles()
            pallet.getContext("2d").drawImage(cachedSpriteSheet, 0, 0)
        })
    }

    renderTiles(){
        const canvas = this.refs.levelCanvas;
        drawTilesOn(canvas.getContext("2d"), this.state.tiles)
        console.log([canvas.offsetLeft, canvas.offsetTop])
    }

    componentDidUpdate(){
        this.renderTiles()
    }

    handlePaint({pageX, pageY}){
        const {offsetLeft, offsetTop, offsetWidth} = this.refs.levelCanvas;
        const tileWidth = offsetWidth / 52
        const xCoord = Math.floor([(pageX - offsetLeft) / tileWidth]);
        const yCoord = Math.floor([(pageY - offsetTop) / tileWidth]);
        let tiles = [...DEFAULT_TILES]
        tiles[yCoord][xCoord] = 1
        this.setState({tiles})
    }

    render(){
        let {} = this.props;
        return(
            <div className='level-edit-container'>
                <canvas className='pallet-canvas' width={WIDTH/2} height={80} ref='palletCanvas'/>
                <canvas 
                    onClick={this.handlePaint}
                    className='level-canvas' 
                    style={{position: 'relative'}} 
                    ref="levelCanvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                />
            </div>
        )
    }
}
