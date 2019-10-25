import { Point } from "../Point"
import { degreesToRadians } from "../../math/PointMath"

describe('Point', () => {
  let point
  beforeEach(() => {
    point = new Point()
  })
  describe('rotate', () => {
    it('should rotate the x and y offsets around the origin 0 0', () => {
      point.localX = 8
      point.localY = 0
  
      point.rotate(360)
  
      expect(point.localX).toEqual(8)
      expect(point.localY).toEqual(0)

      point.rotate(90)
  
      expect(point.localX).toEqual(0)
      expect(point.localY).toEqual(8)
    })
  })

  describe('rotateAround', () => {

    function testRotation(x, y, angle, expectedCoords){
      let point = new Point()

      point.x = x
      point.y = y

      point.rotate(angle)

      expect(point.coords()).toEqual(expectedCoords)
    }

    it('should rotate a point around a given starting point', () => {
      let rotation = degreesToRadians(90)
     
      testRotation(5, 5, rotation, [-5, -5])
      testRotation(5, 5, -rotation, [5, -5])
     
      testRotation(-5, -5, rotation, [5, -5])
      testRotation(-5, -5, -rotation, [-5, 5])
     
      testRotation(-5, 5, rotation, [-5, -5])
      testRotation(-5, 5, -rotation, [5, 5])

      testRotation(5, -5, rotation, [5, 5])
      testRotation(5, -5, -rotation, [-5, -5])
    })
  })

  describe('subtract', () => {
    it('should subtract x and y values and multiply the result by -1', () => {
      let start = new Point(4, -3)

      expect(start.subtract(new Point(-4, -5))).toEqual([-8, -2])
      expect(start.subtract(new Point(-4, -1))).toEqual([-8, 2])
      expect(start.subtract(new Point(1, -2))).toEqual( [-3, 1])
      expect(start.subtract(new Point(6, 4))).toEqual(  [2, 7])
      expect(start.subtract(new Point(-2, 3))).toEqual( [-6, 6])
      expect(start.subtract(new Point(2, 6))).toEqual(  [-2, 9])
      expect(start.subtract(new Point(-5, 1))).toEqual( [-9, 4])
    })
  })
})
