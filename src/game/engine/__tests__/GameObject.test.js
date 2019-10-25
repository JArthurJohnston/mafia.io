import { GameObject } from "../GameObject"

describe('GameObject', () => {
  let obj, delta
  beforeEach(() => {
    obj = new GameObject()
    obj.update = jest.fn()
    delta = 432223
  })

  describe('addChild', () => {
    it('should set the parent to the child', () => {
      let child = new GameObject()
      obj.addChild(child)

      expect(child.parent).toEqual(obj)
    })
  })

  describe('updateLoop', () => {
    it('should call update on the gameObject', () => {
      obj.updateLoop(delta);

      expect(obj.update).toHaveBeenCalledWith(delta)
    })

    it('should call update on children', () => {
      let child = new GameObject()
      child.update = jest.fn()
      obj.addChild(child);

      obj.updateLoop(delta)

      expect(child.update).toHaveBeenCalledWith(delta)
    })

    it('should call update on grand children', () => {
      obj.update = jest.fn();

      let child = new GameObject()
      child.update = jest.fn()

      let grandChild = new GameObject()
      grandChild.update = jest.fn()

      obj.addChild(child);
      child.addChild(grandChild)

      obj.updateLoop(delta)

      expect(obj.update).toHaveBeenCalledWith(delta)
      expect(child.update).toHaveBeenCalledWith(delta)
      expect(grandChild.update).toHaveBeenCalledWith(delta)
    })
  })

  describe('renderLoop', () => {
    it('should call render on itself, child objects and grandchild objects', () => {
      let context = {}
      let delta = 234234;

      let obj = new GameObject()
      obj.render = jest.fn();

      let child = new GameObject()
      child.render = jest.fn()

      let grandChild = new GameObject()
      grandChild.render = jest.fn()

      obj.addChild(child);
      child.addChild(grandChild)

      obj.renderLoop(context, delta)

      expect(obj.render).toHaveBeenCalledWith(context, delta)
      expect(child.render).toHaveBeenCalledWith(context, delta)
      expect(grandChild.render).toHaveBeenCalledWith(context, delta)
    })
  })

  describe('startLoop', () => {
    it('should call start on itself, child objects and grandchild objects', () => {
      let obj = new GameObject()
      obj.start = jest.fn();

      let child = new GameObject()
      child.start = jest.fn()

      let grandChild = new GameObject()
      grandChild.start = jest.fn()

      obj.addChild(child);
      child.addChild(grandChild)

      obj.startLoop()

      expect(obj.start).toHaveBeenCalled()
      expect(child.start).toHaveBeenCalled()
      expect(grandChild.start).toHaveBeenCalled()
    })
  })

  describe('offsets', () => {
    it('should default to zero', () => {
      expect(obj.offsetX()).toEqual(0)
      expect(obj.offsetY()).toEqual(0)
    })

    it('should add the parents offsets to its offsets', () => {
      let child = new GameObject()

      child.localX = 5
      child.localY = 7

      let grandChild = new GameObject()

      grandChild.localX = 3
      grandChild.localY = 4

      obj.addChild(child)
      child.addChild(grandChild)

      expect(grandChild.offsetX()).toEqual(8)
      expect(grandChild.offsetY()).toEqual(11)
    })
  })

  describe('removeChild', () => {
    it('should remove a child game object from the parent', () => {
      let child1 = new GameObject()
      let child2 = new GameObject()
      
      obj.addChild(child1)
      obj.addChild(child2)

      obj.removeChild(child1)

      expect(obj.children[0]).toEqual(child2)
      expect(obj.children.length).toEqual(1)
    })
  })
})