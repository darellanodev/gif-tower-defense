const OrangeTile = require('../src/OrangeTile.js')

describe('When clic over an orange tile', () => {
    test('If mouse is inside should return true', () => {

        const img = null    
        const orangeTile = new OrangeTile(img, 100, 200)

        const result = orangeTile.isInside(120, 220)

        expect(result).toBeTruthy()
    })

    test('If mouse is outside should return false', () => {

        const img = null    
        const orangeTile = new OrangeTile(img, 100, 200)

        const result = orangeTile.isInside(90, 220)

        expect(result).toBeFalsy()
    })

})