const Path = require('../src/Path.js')
const PathTile = require('../src/PathTile.js')
const StartTile = require('../src/StartTile.js')
const EndTile = require('../src/EndTile.js')
const TileGenerator = require('../src/TileGenerator.js')

const LEFT_DIRECTION = 1
const RIGHT_DIRECTION = 2
const UP_DIRECTION = 3
const DOWN_DIRECTION = 4

const levelMap = `111111111111111x,
                  1000000000000000,
                  1011111111111111,
                  1010000000000001,
                  1010000111111101,
                  1011111100000101,
                  1000000000000101,
                  1111111111111101,
                  0000000000000001,
                  y111111111111111@3,2,-50,450,150`

const mapimages = [null, null, null]
const tileGenerator = new TileGenerator(levelMap, mapimages)
const pathTiles = tileGenerator.pathTiles()
const startTile = tileGenerator.startTile()
const endTile = tileGenerator.endTile()

const path = new Path(startTile, endTile, pathTiles)

const isIncluded = (bigGroupElements, smallGroupElements) => {

    let result = true

    if ((bigGroupElements.length === 0) || (smallGroupElements.length > bigGroupElements.length)){
        result = false
    }

    let i = 0
    for (const smallGroupElement of smallGroupElements){

        if (bigGroupElements[i] !== smallGroupElement){
            result = false
            break
        }
        i++
    }

    return result
}

describe ('finds a pathtile', () => {
    test('if exists return the pathtile', () => {

        const startTile = new StartTile(null, 300, 300, LEFT_DIRECTION)
        const endTile = new EndTile(null, 0, 300)

        const searchTile = new PathTile(150, 300)

        const pathTiles = [
            new PathTile(100, 300),
            new PathTile(150, 300),
            new PathTile(200, 300),
        ]

        const path = new Path(startTile, endTile, pathTiles)

        const result = path.getTileInPosition(150,300)

        expect(result).toMatchObject(searchTile)



    })
})

describe('When start direction is left', () => {
    test('if there are 15 tiles consecutively to the left, the enemy moves first 15 times to left', () => {

        const expectedOrders = [LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION]
        
        const orders = path.makeOrders()

        const result = isIncluded(orders, expectedOrders)

        expect(result).toBeTruthy()
    })

    
    test('after the 15 first left path tiles, there is no other left path tile and then the direction is down 7 times', () => {

        const expectedOrders = [LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION]
        
        const orders = path.makeOrders()

        const result = isIncluded(orders, expectedOrders)
        
        expect(result).toBeTruthy()
    })
    
    test('after the 15 first left path tiles, and the 7 down path tiles, there is no other down path tile, then the direction is right 13 path tiles', () => {

        const expectedOrders = [LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION]
        
        const orders = path.makeOrders()

        const result = isIncluded(orders, expectedOrders)
        
        expect(result).toBeTruthy()
    })

        
    test('after the 15 first left path tiles, and the 7 down path tiles, and the 13 right path tiles, there is no other right path tile, then the direction is up 3 path tiles', () => {

        const expectedOrders = [LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, DOWN_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, RIGHT_DIRECTION, UP_DIRECTION, UP_DIRECTION, UP_DIRECTION]
        
        const orders = path.makeOrders()

        const result = isIncluded(orders, expectedOrders)
        
        expect(result).toBeTruthy()
    })

})