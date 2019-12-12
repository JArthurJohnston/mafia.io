import React, {Component} from "react"
import './styles/DebugCommands.scss'
class DebugCommands extends Component {

    constructor(){
        super()
        this.state = {
            showDebugConsole: false
        }
        this.toggleCommandPrompt = this.toggleCommandPrompt.bind(this);
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

    render(){
        let {} = this.props;
        return(
            this.state.showDebugConsole &&
            <div className='debug-console'>
                <input type='text' />
            </div>
        )
    }
}

export default DebugCommands;
