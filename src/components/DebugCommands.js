import React, {Component} from "react"
import './styles/DebugCommands.scss'

const DEBUG_STATE = {
    NONE: 'NONE',
    MANAGE_GAME: 'MANAGE_GAME'
}

const debugCommandMap = {
    'manage game': DEBUG_STATE.MANAGE_GAME
}

class DebugCommands extends Component {

    constructor(){
        super()
        this.state = {
            showDebugConsole: false,
            debugState: DEBUG_STATE.NONE
        }
        this.toggleCommandPrompt = this.toggleCommandPrompt.bind(this);
        this.onEnterPressed = this.onEnterPressed.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keyup", (event) => {
            if (event.key === "~") {
                this.toggleCommandPrompt()
            }
        });
    }

    toggleCommandPrompt(){
        this.setState({showDebugConsole: ~this.state.showDebugConsole})
    }

    onEnterPressed(event){
        if(event.keyCode === 13){

        }
    }

    parseCommand(commandString){
        const commnadState = debugCommandMap[commandString]
        if(commnadState){
            this.setState({debugState: commnadState})
        }
    }

    render(){
        let {} = this.props;
        return(
            this.state.showDebugConsole &&
            <div className='debug-console'>
                <input type='text' onKeyDown={this.onEnterPressed}/>
            </div>
        )
    }
}

export default DebugCommands;
