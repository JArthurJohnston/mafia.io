class MouseInput {

    constructor(){
        this.x = 0
        this.y = 0
        this.clickHandlers = []
        this.init = this.init.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
    }

    init(){
        document.onmousemove = this.handleMouseMove
    }

    handleMouseMove(event){
        this.x = event.pageX
        this.y = event.pageY
    }

    handleClick(event){
        this.clickHandlers.forEach(handler => {
            handler(event.clientX, event.clientY)
        })
    }

    addClickHandler(handler){
        this.clickHandlers.push(handler)
    }
}

const instance = new MouseInput()

export default instance
