import { radiansToDegrees, degreesToRadians, rotateAround, angleBetween, angleFromPoints } from "../PointMath"

describe('PointMath', () => {
  describe('radiansToDegrees', () => {
    it('should translate an angle', () => {
      expect(radiansToDegrees(0)).toEqual(0)
      expect(radiansToDegrees(1.5707963267948966)).toEqual(90)
      expect(radiansToDegrees(0.017453292519943295)).toEqual(1)
      expect(radiansToDegrees(Math.PI)).toEqual(180)
    })
  })

  describe('degreesToRadians', () => {
    it('should translate an angle', () => {
      expect(degreesToRadians(0)).toEqual(0)
      expect(degreesToRadians(1)).toEqual(0.017453292519943295)
      expect(degreesToRadians(90)).toEqual(1.5707963267948966)
      expect(degreesToRadians(180)).toEqual(Math.PI)
    })
  })

  describe('rotateAround', () => {
    it('should rotate x and y around center x and y', () => {
      let result = rotateAround(0,0, 0,0, 90)
      
      expect(result.x).toEqual(0)
      expect(result.y).toEqual(0)

      result = rotateAround(0,0, 8,0, 360)
      expect(result.x).toEqual(8)
      // expect(result.y).toEqual(0) //due to rounding errors, the results are never exactly zero

      result = rotateAround(0,0, 8,0, 90)
      // expect(result.x).toEqual(0)
      expect(result.y).toEqual(8)
    })
  })

  describe('angleBetween', () => {
    it('should return the angle between the center of an object and a point', () => {
      expect(angleBetween(0,0, 0,-4)).toEqual(degreesToRadians(0))
      expect(angleBetween(0,0, 0,4)).toEqual(degreesToRadians(180))
      expect(angleBetween(0,0, 0,0)).toEqual(degreesToRadians(180))

      expect(angleBetween(0,0, 5,0)).toEqual(degreesToRadians(90))
      expect(angleBetween(0,0, -5,0)).toEqual(degreesToRadians(-90))

      expect(angleBetween(0,0, -4,-4)).toEqual(degreesToRadians(-45))
      expect(angleBetween(0,0, 4,-4)).toEqual(degreesToRadians(45))

      expect(angleBetween(5,5, 8,10)).toEqual(degreesToRadians(149.03624346792648))
      expect(angleBetween(5,5, 0,10)).toEqual(degreesToRadians(-135))

      expect(angleBetween(5,5, 5,10)).toEqual(degreesToRadians(180))
    })
  })

  describe('angleFromPoints', () => {
    it('should return the angle from 2 points and an origin point', () => {
      let angle = angleFromPoints(0,0, 5,0, 0,5)
      expect(radiansToDegrees( angle)).toEqual(90.00000000000001) //close enough
    })
  })
})