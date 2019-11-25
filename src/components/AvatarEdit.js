import React, {Component} from "react"
import { SketchPicker } from 'react-color';
import './styles/AvatarEdit.scss'
import './styles/ColorPallet.scss'

const SIZE = Math.floor(window.innerHeight / 2)

class ColorPallet extends Component {
    render(){
        let {} = this.props;
        return(
            <div className='color-pallet'>
                <SketchPicker />
            </div>
        )
    }
}

class AvatarEdit extends Component {
    constructor(){
        super()
        this.state = {
            backgroundColor: '#B8E986',
            brushColor: '#000',
            bitmap: [
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#000','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
                ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
            ]
        }
    this.defaultBitmap()
    }

    defaultBitmap(){
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                this.state.bitmap[x][y] = this.state.backgroundColor
            }
        }
    }

    componentDidMount(){
        this.refs.avatarCanvas.width = SIZE
        this.refs.avatarCanvas.height = SIZE
        this.drawContext = this.refs.avatarCanvas.getContext('2d')
        this.drawContext.imageSmoothingEnabled = false
        this.drawContext.mozImageSmoothingEnabled = false;

        this.pixelWidth = this.refs.avatarCanvas.offsetWidth/20
        this.pixelHeight = this.refs.avatarCanvas.offsetHeight/20


        this.drawAvatar()
    }

    drawAvatar(){
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                drawRect(
                    this.drawContext, 
                    Math.floor(x * this.pixelWidth), 
                    Math.floor(y * this.pixelHeight), 
                    20, 20, this.state.bitmap[x][y])
            }
        }
    }

    handlePaint(){

    }

    render(){
        let {} = this.props;
        return(
        <div className='avatar-edit-container'>
            <label>Background</label>
            <SketchPicker 
                // onChangeComplete={(color) => this.setState({backgroundColor: color.hex})}
            />
            {/* <label>Brush</label>
            <SketchPicker 
                onChangeComplete={(color) => this.setState({brushColor: color.hex})}
            /> */}
            <canvas 
                onClick={this.handlePaint}
                className='avatar-canvas' 
                ref="avatarCanvas" 
            />
        </div>
        )
    }
}

export default AvatarEdit;

function drawRect(context, x, y, w, h, color){
    context.fillStyle = color;
    context.beginPath();
    context.fillRect(x, y, w, h)
    // context.fill();
}