import React, {Component} from "react"
import { DEFAULT_TILES, drawTilesOn } from "../game/engine/TiledLevelBuilder";

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
        drawTilesOn(this.refs.levelCanvas.getContext("2d"))
    }

    render(){
        let {} = this.props;
        return(
            <div>
                <canvas ref="levelCanvas" />
            </div>
        )
    }
}

export default LevelEdit;