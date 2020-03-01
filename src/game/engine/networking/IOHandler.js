import socket from 'socket.io-client'
import state from '../../State'
import axios from 'axios'
import { PLAYER_STATES } from '../../Player'

class IOHandler {

    init(url){
        this.url = url
        this.updateCallbacks = []
        this.playerReceived = false
        this.dispatchUpdates = this.dispatchUpdates.bind(this);
        this.socket = socket(url)
        this.socket.on('connected', () => this.addPlayer())
        this.socket.on('playerReceived', () => this.playerReceived = true)
        this.socket.on('state_of_the_world', this.dispatchUpdates)
        this.socket.on('playerKilled', this.handleDeath)
    }

    handleDeath(player){
        if(player.name === state.player.name){
            state.player.state = PLAYER_STATES.DEAD
        }
    }

    addPlayer(){
        this.socket.emit('playerAdded', {
            x: state.player.offsetX, 
            y: state.player.offsetY, 
            name: state.player.name,
            state: state.player.state
        })
    }

    playerMoved(x, y, name){
        this.socket.emit('playerMoved', {
            x, y, name
        })
    }

    getAllPlayers(){
        return axios.get(`/players`).then(response => response.data)
    }

    onPlayerAdded(callback){
        this.socket.on('frenemyAdded', (player) => {
            if(player.name !== state.player.name){
                callback(player)
            }
        })
    }

    killPlayer(player){
        this.socket.emit('playerHit', player)
    }

    onBulletFired(callback){
        this.socket.on('bulletReceived', (bullet) => {
            
            callback(bullet)
        } )
    }

    dispatchUpdates(newState){
        for (let i = 0; i < this.updateCallbacks.length; i++) {
            this.updateCallbacks[i](newState)
        }
    }
    
    onUpdate(callback){
        this.updateCallbacks.push(callback)
    }

    spawnBullet(x, y, angle){
        this.socket.emit('bulletFired', {x, y, angle})
    }
}

const GameServer = new IOHandler()
export default GameServer
