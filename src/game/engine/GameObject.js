import _ from "lodash"

const BASE_PARENT = {
  offsetX: 0,
  offsetY: 0
}

 /**
   * static method for making new objects at runtime
   * instantiate(clazz, parent){
   *  let obj = new clazz() //this may be difficult
   *  parent.addChild(obj)
   *  obj.start() //not here yet
   * }
   */

export class GameObject {

  constructor(){
    this.localX = 0
    this.localY = 0
    this.parent = BASE_PARENT;
    this.children = []
    this.start = this.start.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.updateLoop = this.updateLoop.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    this.addChild = this.addChild.bind(this);
    this.startLoop = this.startLoop.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }

  /**
   * When updating, use localX and localY.
   * When rendering, use offsetX and offsetY
   */
  get offsetX() {
    return this.localX + this.parent.offsetX
  }

  get offsetY() {
    return this.localY + this.parent.offsetY
  }

  startLoop(graphics){
    this.start(graphics)
    this.children.forEach(child => {
      child.startLoop(graphics)
    });
  }

  updateLoop(delta, input){
    this.update(delta, input)
    this.children.forEach(child => {
      child.updateLoop(delta, input)
    });
  }

  renderLoop(graphics, delta){
    this.children.forEach(child => {
      child.renderLoop(graphics, delta)
    });
    this.render(graphics, delta)
  }

  addChild(gameObject){
    gameObject.parent = this
    this.children.push(gameObject);
  }

  removeChild(gameObject){
    _.remove(this.children, go => go === gameObject)
  }

  start(){

  }

  /**
   * Override this method in child objects
   * @param {number} delta 
   */
  update(delta){

  }

  /**
   * Override this method in child objects
   * @param {GraphicsHelper} graphics The context from the canvas
   * @param {number} delta 
   */
  render(graphics, delta) {

  }
}
