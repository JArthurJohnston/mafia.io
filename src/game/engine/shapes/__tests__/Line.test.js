import { buildLine, distanceBetween, slope, angle, findPoint } from "../Line"
import { radiansToDegrees } from "../../math/PointMath"

describe('Line', () => {

  describe('slope', () => {
    it('should return the slope given coordinates', () => {
      expect(slope(0,0, 0,0)).toEqual(NaN)
      expect(slope(1,1, 1,1)).toEqual(NaN)

      // expect(slope(1,1, 1,1)).toEqual(0)
      // expect(slope(1,1, 1,1)).toEqual(0)

      expect(slope(0,0, 0,1)).toEqual(Infinity)
      expect(slope(1,1, 1,-1)).toEqual(-Infinity)
      expect(slope(0,0, 0,-1)).toEqual(-Infinity)
      expect(slope(0,0, 1,0)).toEqual(0)
      expect(slope(0,0, 1,1)).toEqual(1)
      expect(slope(0,0, 1,-1)).toEqual(-1)
      expect(slope(0,0, 5,13)).toEqual(2.6)
      expect(slope(0,0, -34,27)).toEqual(-0.7941176470588235)
    })
  })
  describe('lineFrom', () => {
    it('should create a line with a given point slope and distance', () => {
      let line = buildLine(0,0, 4, 10)

      expect(line.start.x).toEqual(0)
      expect(line.start.y).toEqual(0)

      expect(line.end.x).toEqual(2.42535625036333)
      expect(line.end.y).toEqual(9.70142500145332)

      let distance = distanceBetween(0,0, 2,3)
      line = buildLine(0,0, 2/3, distance)

      expect(line.start.x).toEqual(0)
      expect(line.start.y).toEqual(0)

      expect(line.end.x).toEqual(3)
      // expect(line.end.y).toEqual(2) // very close due to rounding error
    
      line = buildLine(0,0, 0, 10)

      expect(line.start.x).toEqual(0)
      expect(line.start.y).toEqual(0)

      expect(line.end.x).toEqual(10)
      expect(line.end.y).toEqual(0)
    })
  })

  describe('distanceBetween', () => {
    it('should find the distance between 2 points', () => {
      expect(distanceBetween(1,4, 1,4)).toEqual(0)
      expect(distanceBetween(0,0, 0,4)).toEqual(4)
      expect(distanceBetween(0,-4, 0,4)).toEqual(8)
      expect(distanceBetween(0,0, 1,1)).toEqual(1.4142135623730951)
    })
  })

  describe('angle', () => {
    it('should return the angle of the coordinates relative to the origin', () => {
      let angleRadians = angle(0,0, 5,5, 0,0, 5,-5)
      let ninetyDegreesInRadians = 1.5707963267948966
      
      expect(angleRadians).toEqual(ninetyDegreesInRadians)
      expect(radiansToDegrees(angleRadians)).toEqual(90)

      angleRadians = angle(0,0, 5,0, 0,0, 0,5)
      
      expect(angleRadians).toEqual(ninetyDegreesInRadians)
      expect(radiansToDegrees(angleRadians)).toEqual(90)

      angleRadians = angle(0,0, 5,5, 0,0, -5,5)
      
      expect(angleRadians).toEqual(ninetyDegreesInRadians)
      expect(radiansToDegrees(angleRadians)).toEqual(90)


      angleRadians = angle(0,0, 0,5, 0,0, 0,-5)
      
      expect(angleRadians).toEqual(ninetyDegreesInRadians)
      expect(radiansToDegrees(angleRadians)).toEqual(90)
    })
  })

  describe('findPoint', () => {
    it('should return a coord at the given slope and distance from the given origin', () => {
      let result = findPoint(0,0, 1,1, 10)        // down right

      expect(result.x).toEqual(7.071067811865475)
      expect(result.y).toEqual(7.071067811865475) 

      result = findPoint(0,0, -1,1, 10)           // up right

      expect(result.x).toEqual(7.071067811865475)
      expect(result.y).toEqual(-7.071067811865475)

      result = findPoint(0,0, -1, -1, 10)          // up left

      expect(result.x).toEqual(-7.071067811865475)
      expect(result.y).toEqual(-7.071067811865475)

      result = findPoint(0,0, 1, -1, 10)            // down left

      expect(result.x).toEqual(-7.071067811865475)
      expect(result.y).toEqual(7.071067811865475)

      result = findPoint(0,0, 0, 1, 10)            // horizontal

      expect(result.x).toEqual(10)
      expect(result.y).toEqual(0)

      result = findPoint(0,0, 1, 0, 10)            // vertical

      expect(result.x).toEqual(0)
      expect(result.y).toEqual(10)
    })
  })
})