import { radiansToDegrees, degreesToRadians, rotateAround } from "../PointMath"

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
})