const Range = require('../src/Range.js')

describe ('Generate a range', () => {
    test('from 1 to 5', () => {

        const expected = [1,2,3,4,5]
        const result = Range.make(1,5)

        expect(result).toStrictEqual(expected)
    })
    test('from 0 to 5', () => {

        const expected = [0,1,2,3,4,5]
        const result = Range.make(0,5)

        expect(result).toStrictEqual(expected)
    })
})
