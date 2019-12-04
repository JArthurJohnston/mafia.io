import socket from 'socket.io-client'
import state from '../../State'

class IOHandler {

    init(url){
        this.updateCallbacks = []
        this.playerReceived = false
        this.dispatchUpdates = this.dispatchUpdates.bind(this);
        this.socket = socket(url)
        this.socket.on('connected', () => this.addPlayer())
        this.socket.on('playerReceived', () => this.playerReceived = true)
        this.socket.on('state_of_the_world', this.dispatchUpdates)
    }

    addPlayer(){
        this.socket.emit('playerAdded', {
            x: state.player.offsetX, 
            y: state.player.offsetY, 
            name: state.player.name
        })
    }

    playerMoved(x, y, name){
        // if(this.playerReceived){
            this.socket.emit('playerMoved', {
                x, y, name
            })
        // }
    }

    onPlayerAdded(callback){
        this.socket.on('frenemyAdded', (player) => {
            if(player.name !== state.player.name){
                callback(player)
            }
        })
    }

    dispatchUpdates(newState){
        for (let i = 0; i < this.updateCallbacks.length; i++) {
            this.updateCallbacks[i](newState)
        }
    }
    
    onUpdate(callback){
        this.updateCallbacks.push(callback)
    }
}

const GameServer = new IOHandler()
export default GameServer
