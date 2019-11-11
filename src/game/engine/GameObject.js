import _ from "lodash"

const BASE_PARENT = {
  offsetX: 0,
  offsetY: 0,
  name: 'BASE_PARENT'
}

export class GameObject {

  constructor(){
    this.localX = 0
    this.localY = 0
    this.parent = BASE_PARENT;
    this.children = []
    //I dont think I need these vv
    this.start = this.start.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.updateLoop = this.updateLoop.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    this.addChild = this.addChild.bind(this);
    this.startLoop = this.startLoop.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }

  get name(){
    return 'GameObject'
  }
 
  /**
   * This should return the x value of where the object is on the screen
   * @returns {number} the total x offset of this object and all its parent objects (IE its world position)
   */
  get offsetX() {
    return this.localX + this.parent.offsetX
  }

  /**
   * This should return the y value of where the object is on the screen
   * @returns {number} the total y offset of this object and all its parent objects (IE its world position)
   */
  get offsetY() {
    return this.localY + this.parent.offsetY
  }

  startLoop(graphics){
    this.start(graphics)
    this.children.forEach(child => {
      child.startLoop(graphics)
    });
  }

  updateLoop(delta){
    this.update(delta)
    this.children.forEach(child => {
      child.updateLoop(delta)
    });
  }

  renderLoop(graphics, delta){
    this.render(graphics, delta)
    this.children.forEach(child => {
      child.renderLoop(graphics, delta)
    });
  }

  addChild(gameObject){
    gameObject.parent = this
    this.children.push(gameObject);
  }

  removeChild(gameObject){
    _.remove(this.children, go => go === gameObject)
  }

  spawn(gameObject){
    this.addChild(gameObject)
    gameObject.start()
  }

  /**
   * All this does is remove the game object from the game heirarchy, stopping it from being
   * updated/rendered every frame.
   * This does not guarantee the object is ready for garbage collection.
   * Make sure to clean up any refernces in your object before destroying to 
   * avoid memory leaks.
   */
  destroy(){
    this.parent.removeChild(this)
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
