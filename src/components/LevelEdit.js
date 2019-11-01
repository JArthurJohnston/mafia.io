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
            tiles: DEFAULT_TILES,
            images: [],
            currentBrush: 1
        }
        this.handlePaint = this.handlePaint.bind(this);
        this.updateBrush = this.updateBrush.bind(this);
    }

    componentDidMount(){
        const pallet = this.refs.palletCanvas
        load(spritesheet).then(() => {
            this.renderTiles()

            tileFunctions.forEach(fn => {
                const newCanvas = document.createElement('canvas');
                newCanvas.width=40
                newCanvas.height=40
                newCanvas.className='brush'
                newCanvas.onclick = () => {this.updateBrush(tileFunctions.indexOf(fn))}
                fn(newCanvas.getContext('2d'), 0, 0)
                this.refs.pallet.appendChild(newCanvas)
            })
        })
    }

    updateBrush(index){
        this.setState({...this.state, currentBrush: index})
    }

    renderTiles(){
        const canvas = this.refs.levelCanvas;
        drawTilesOn(canvas.getContext("2d"), this.state.tiles)
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
        tiles[yCoord][xCoord] = this.state.currentBrush
        this.setState({tiles})
    }

    render(){
        let {} = this.props;
        return(
            <div className='level-edit-container'>
            <div ref='pallet' className='pallet'></div>
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

function Pallet ({drawFunctions}) {
    return (
        <div>
            {drawFunctions.map((fn) => {
                return <canvas/>
            })}
        </div>
    )
}

function Brush ({image}) {
    return (
        image && <img src={image} />
    )
}
