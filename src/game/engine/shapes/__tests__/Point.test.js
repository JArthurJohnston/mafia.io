import { Point, degreesToRadians, radiansToDegrees } from "../Point"

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
})


/*
0,0        X
   . . . . . . . . .
   . . . . . . . . .
   . . . . . . . . .
   . . . . . . . . .
Y  . . . . . . . . .
   . . . . . . . . .
   . . . . . . . . .
   . . . . . . . . .
   . . . . . . . . .
                    8,8
*/