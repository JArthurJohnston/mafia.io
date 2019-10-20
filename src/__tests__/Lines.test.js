import { intersectionBetween, Line, Point } from "../Lines"

describe('Lines', () => {
  describe('intersectionBetween', () => {
    it('should return the intersecting point', () => {
      let point = intersectionBetween(0,5, 10,5, 5,0, 5,10)
      
      expect(point.x).toEqual(5)
      expect(point.y).toEqual(5)
    })

    it('should return null for parallel lines', () => {
      let point = intersectionBetween(0,0, 10,0, 0,10, 10,10)
      
      expect(point).toBeNull()
    })
  })

  describe('Line', () => {
    describe('slope', () => {
      it('should return the slope', () => {
        let line = new Line(new Point(0, 0), new Point(5, 5))

        expect(line.slope()).toEqual(1)

        line = new Line(new Point(0, 0), new Point(5, 10))

        expect(line.slope()).toEqual(2)

        line = new Line(new Point(0, 0), new Point(10, 5))

        expect(line.slope()).toEqual(0.5)
      })
    })

    describe('angle', () => {
      it('should return the lines angle', () => {
        // let line = new Line(new Point(0, 0), new Point(0, 5))
  
        // expect(line.angle()).toEqual(0)

        // line = new Line(new Point(0, 0), new Point(5, 5))
  
        // expect(line.angle()).toEqual(45)
        
      })
    })
  })

  describe('Point', () => {
    describe('rotate90', () => {
      it('should rotate 90 degrees around the origin', () => {
        
      })
    })
  })
})


/*
. . . . 2 . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
0 . . . x . . . . 1
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . 3 . . . . .

*/