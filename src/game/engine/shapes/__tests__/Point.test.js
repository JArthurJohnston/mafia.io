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
    })
  })

  describe('translation helpers', () => {
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