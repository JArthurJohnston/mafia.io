import socket from 'socket.io-client'
import state from '../../State'

class IOHandler {

    init(url){
        this.socket = socket(url)
    }

    addPlayer(){
        this.socket.emit('playerAdded', {
            x: state.player.offsetX, 
            y: state.player.offsetY, 
            name: state.player.name
        })
    }

    playerMoved(x, y, name){
        this.socket.emit('playerMoved', {
            x, y, name
        })
    }

    onPlayerAdded(callback){
        this.socket.on('frenemyAdded', (player) => {
            if(player.name !== state.player.name){
                callback(player)
            }
        })
    }

    onUpdate(callback){
        this.socket.on('state_of_the_world', callback)
    }
}

const GameServer = new IOHandler()
export default GameServer
