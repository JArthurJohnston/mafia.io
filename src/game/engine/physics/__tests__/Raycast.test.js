import { bresenhamLine } from "../RayCast"

describe('RayCast', () => {
    describe('bresenhamLine', () => {
        it('should return a list of points', () => {
            let points = bresenhamLine(0, 0, 5, 5)

            expect(points.length).toEqual(6)
            expect(points[0]).toEqual([0,0])
            expect(points[1]).toEqual([1,1])
            expect(points[2]).toEqual([2,2])
            expect(points[3]).toEqual([3,3])
            expect(points[4]).toEqual([4,4])
            expect(points[5]).toEqual([5,5])

            points = bresenhamLine(0, 0, 5, 7)

            expect(points.length).toEqual(8)
            expect(points[0]).toEqual([0,0])
            // expect(points[1]).toEqual([1,1])
            // expect(points[2]).toEqual([2,2])
            // expect(points[3]).toEqual([3,3])
            // expect(points[4]).toEqual([4,4])
            expect(points[7]).toEqual([5,7])


            points = bresenhamLine(5, 5, -1, -1)

            expect(points.length).toEqual(7)
            expect(points[0]).toEqual([5,5])
            
            expect(points[8]).toEqual([-1,-1])
        })

        describe('when the destination coords are negative', () => {
            it('with negative destinations', () => {
                const points = bresenhamLine(0, 0, -5, -5)
    
                // console.log(points)
                expect(points.length).toEqual(6)
                expect(points[0]).toEqual([0,0])
                expect(points[1]).toEqual([-1,-1])
                expect(points[2]).toEqual([-2,-2])
                expect(points[3]).toEqual([-3,-3])
                expect(points[4]).toEqual([-4,-4])
                expect(points[5]).toEqual([-5,-5])
            })

            it('with negative destinations', () => {
                const points = bresenhamLine(10, 0, 5, 5)
    
                // console.log(points)
                expect(points.length).toEqual(6)
                expect(points[0]).toEqual([10,0])
                // expect(points[1]).toEqual([-1,-1])
                // expect(points[2]).toEqual([-2,-2])
                // expect(points[3]).toEqual([-3,-3])
                // expect(points[4]).toEqual([-4,-4])
                expect(points[5]).toEqual([5,5])
            })
        })
    })
})
